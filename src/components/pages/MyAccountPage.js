import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Form, Button, Card } from 'react-bootstrap';


const MyAccountPage = ({ user, setUser }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(user ? user.description || '' : '');
  const [isEditing, setIsEditing] = useState(false);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };



  const handleProfilePictureSubmit = async (e) => {
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

   const handleDescriptionSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        '/api/user/updateDescription',
        { description },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Add the 'Authorization' header
          },
        }
      );

      // Update the user object with the new description
      const updatedUser = { ...user, description: response.data.description };
      setUser(updatedUser); // Make sure you have access to the setUser function
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Description updated successfully');
    } catch (error) {
      alert('Error updating description');
    }
  };

  useEffect(() => {
    if (user) {
      setDescription(user.description || '');
    }
  }, [user]);

  return (
    <Container>
    <Row>
      <Col>
        {user.profilePicture ? (
          <div>
            <img
              src={`/${user.profilePicture}`}
              alt="ProfilePicture"
              className="img-thumbnail"
              style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '100px' }}
            />
            <h2>{user.description}</h2>
          </div>
          
        ) : (
          <p>No profile picture</p>
        )}
        <Form onSubmit={handleProfilePictureSubmit}>
          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control   style={{ fontSize: '12px', padding: '2px 6px' }} type="file" onChange={handleFileChange} required />
          </Form.Group>
          <Button type="submit" style={{ fontSize: '12px', padding: '5px 10px' }}>Update Photo</Button>
        </Form>
        <Form onSubmit={handleDescriptionSubmit}>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter a brief description about yourself..."
              required
            />
          </Form.Group>
          <Button type="submit">Update Description</Button>
        </Form>
      </Col>
      
    </Row>
  </Container>
  
  );
};

export default MyAccountPage;