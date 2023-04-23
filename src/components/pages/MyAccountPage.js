import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const MyAccountPage = ({ user, setUser }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
     const formData = new FormData();
     formData.append('profilePicture', file);

     const token = localStorage.getItem('token');
     try {
       const response = await axios.post('/api/user/updateProfilePicture', formData, {
         headers: {
           'Content-Type': 'multipart/form-data',
           'Authorization': `Bearer ${token}`, // Add the 'Authorization' header
         },
       });

       // Update the user object with the new profilePicture
        const updatedUser = { ...user, profilePicture: response.data.profilePicture };
        setUser(updatedUser); // Make sure you have access to the setUser function
        localStorage.setItem('user', JSON.stringify(updatedUser));
       alert('Profile picture updated successfully');
     } catch (error) {
       alert('Error updating profile picture');
     }
   };

   return (
      <div className="container">
        {user ? (
          <>
            <h3>Email: {user.email}</h3>
            {user.profilePicture ? (
              <img src={`/${user.profilePicture}`} alt="ProfilePicture" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            ) : (
              <p>No profile picture</p>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} required />
              </Form.Group>
              <Button type="submit">Update Profile Picture</Button>
            </Form>
          </>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    );
 };

 export default MyAccountPage;
