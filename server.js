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
});

const User = mongoose.model('User', UserSchema);

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

  res.status(201).send({ message: 'User created successfully', token });
});

app.post('/api/auth/login', async (req, res) => {
const { email, password } = req.body;

const user = await User.findOne({ email });
if (!user) {
  return res.status(400).send('Invalid email or password');
}

const validPassword = await bcrypt.compare(password, user.password);
if (!validPassword) {
  return res.status(400).send('Invalid email or password');
}

const token = jwt.sign({ _id: user._id, email: user.email }, jwtSecret);
  res.send({ email: user.email, token });
});

app.put('/api/user/updateDescription', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const { description } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { description },
      { new: true }
    );

    res.status(200).json({ message: 'Description updated', description: updatedUser.description });
  } catch (error) {
    console.error('Error updating description:', error);
    res.status(500).send('Error updating description');
  }
});



  const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
