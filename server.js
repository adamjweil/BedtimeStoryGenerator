const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const dotenv = require('dotenv');

const jwtSecret = 'your_jwt_secret';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Mongoose User schema
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  profilePicture: String,
  description: String,
  name: String,
  location: String,
});

const User = mongoose.model('User', UserSchema);

const SelectedSentencesSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sentences: [String],
});

const SelectedSentences = mongoose.model('SelectedSentences', SelectedSentencesSchema);


// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage })

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send('Invalid token');
  }
};


// Add this line after your middleware
app.use('/uploads', express.static('uploads'));


// Routes
// Add the authMiddleware to this endpoint to protect it
app.post('/api/user/updateProfilePicture', authMiddleware, upload.single('profilePicture'), async (req, res) => {
  try {
    const userId = req.user._id;
    const profilePicture = req.file.path;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture },
      { new: true }
    );
     res.status(200).json({ message: 'Profile picture updated', profilePicture: updatedUser.profilePicture });
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).send('Error updating profile picture');
  }
});

app.put('/api/user/updateDescription', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { description, name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { description, name },
      { new: true }
    );

    res.status(200).json({ message: 'Description updated', description: updatedUser.description, name: updatedUser.name });
   } catch (error) {
    console.error('Error updating description:', error);
    res.status(500).send('Error updating description');
  }
});

app.put('/api/user/updateName', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );

    res.status(200).json({ message: 'Name updated', name: updatedUser.name });
  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).send('Error updating name');
  }
});

// Add a new route for updating the user's location
app.put('/api/user/updateLocation', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { location } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { location },
      { new: true }
    );

    res.status(200).json({ message: 'Location updated', location: updatedUser.location });
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).send('Error updating location');
  }
});

app.put('/api/selectedSentences', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { sentences } = req.body;

    let selectedSentences = await SelectedSentences.findOne({ userId });

    if (!selectedSentences) {
      // If no document exists for the user, create one
      selectedSentences = new SelectedSentences({ userId, sentences });
    } else if (selectedSentences.sentences) {
      // Update the existing document with the new array of sentences
      selectedSentences.sentences = sentences;
    } else {
      // If the returned document has a null 'sentences' property, create a new one
      selectedSentences = new SelectedSentences({ userId, sentences });
    }

    await selectedSentences.save();

    res.status(200).json({ message: 'Selected sentences updated', sentences });
  } catch (error) {
    console.error('Error updating selected sentences:', error.stack);
    res.status(500).json({ message: 'Error updating selected sentences' });
  }
});







app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  console.log("hitting the register API")
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({message: 'User already exists'});
  }

  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  console.log(user);

  // Generate a JWT token for the newly registered user
  const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret);

  res.status(201).send({
    message: 'User created successfully',
    user: {
      _id: user._id,
      email: user.email,
      profilePicture: user.profilePicture,
      name: user.name,
      description: user.description,
      location: user.location,
    },
    token,
  });
});

app.post('/api/auth/login', async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Compare the provided password with the stored password
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret, {
      expiresIn: '1d',
    });

    // Return the user data and token
    res.status(200).json({
      _id: user._id,
      email: user.email,
      profilePicture: user.profilePicture,
      name: user.name,
      description: user.description,
      token,
    });
  } catch (error) {
    console.error('Error in /api/auth/login:', error);
    res.status(500).json({ message: 'Error logging in.' });
  }
});







  const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
