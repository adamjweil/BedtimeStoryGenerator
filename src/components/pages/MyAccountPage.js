import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Image, Form, Button, Card } from 'react-bootstrap';

const MyAccountPage = ({ user, setUser }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(user ? user.description || '' : '');
  const [name, setName] = useState(user ? user.name || '' : '');
  const [email, setEmail] = useState(user ? user.email || '' : '');

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [location, setLocation] = useState(user ? user.location || '' : '');
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };

  const toggleEditDescription = () => {
    setIsEditingDescription(!isEditingDescription);
  };

  const toggleEditLocation = () => {
    setIsEditingLocation(!isEditingLocation);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        '/api/user/updateLocation',
        { location },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Update the user object with the new location
      const updatedUser = { ...user, location: response.data.location };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditingLocation(false);
      alert('Location updated successfully');
    } catch (error) {
      alert('Error updating location');
    }
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
          'Authorization': `Bearer ${token}`,
        },
      });

      // Update the user object with the new profilePicture
      const updatedUser = { ...user, profilePicture: response.data.profilePicture };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Profile picture updated successfully');
    } catch (error) {
      alert('Error updating profile picture');
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(
        '/api/user/updateName',
        { name },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Update the user object with the new name
      const updatedUser = { ...user, name: response.data.name };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditingName(false);
      alert('Name updated successfully');
    } catch (error) {
      alert('Error updating name');
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
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      // Update the user object with the new description
      const updatedUser = { ...user, description: response.data.description };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setIsEditingDescription(false);
      alert('Description updated successfully');
    } catch (error) {
      alert('Error updating description');
    }
  };

  useEffect(() => {
    if (user) {
      setDescription(user.description || '');
      setName(user.name || '');
      setLocation(user.location || '');
      
    }
  }, [user]);

  return (
    <Container>
       <Row>
      <Col>
        <Row style={{paddingTop: '50px', paddingBottom: '20px'}}>
          {user && user.profilePicture ? (
              <div>
                <img
                  src={`/${user.profilePicture}`}
                  alt="ProfilePicture"
                  className="img-thumbnail"
                  style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '100px' }}
                />
                <p>{user.email}</p>
              </div>
              
            ) : (
            
            <div>
            <Form onSubmit={handleProfilePictureSubmit}>
              <Form.Group>
      
                <Form.Control   style={{ fontSize: '12px', padding: '2px 6px' }} type="file" onChange={handleFileChange} required />
              </Form.Group>
              <Button type="submit" style={{ fontSize: '12px', padding: '5px 10px' }}>Update Photo</Button>
            </Form>
            </div>
          )}
        </Row>
          
     
        <Row>
          <Form onSubmit={handleNameSubmit}>
          {user && !isEditingName && user.name ? (
            <div>
              <h3>
                Hey, I'm {user.name}!!{' '}
                <Button style={{ borderWidth: 3,}} onClick={toggleEditName} variant="outline-primary" size="sm">
                  Edit
                </Button>
              </h3>
            </div>
          ) : (
              <Row>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>
                <Button type="submit">Save</Button>
                <Button variant="outline-secondary" onClick={toggleEditName} style={{ marginLeft: '5px' }}>
                  Cancel
                </Button>
              </Row>
          )}
        </Form>
        </Row>
        <Row>
        <Form onSubmit={handleLocationSubmit}>
        {!isEditingLocation && user && user.location ? (
          <div>
            <p>
              I live in {user.location}{' '}
              <Button
                onClick={toggleEditLocation}
                variant="outline-primary"
                size="sm"
                style={{ fontSize: '0.5rem', padding: '2px 5px' }}
              >
                Edit
              </Button>
            </p>
          </div>
        ) : (
          
            <Row>
              <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="Enter your location"
                  required
                />
              </Form.Group>
              <Button type="submit">Save</Button>
              <Button variant="outline-secondary" onClick={toggleEditLocation} style={{ marginLeft: '5px' }}>
                Cancel
              </Button>
            </Row>
          
        )}
      </Form>
        </Row>

      
      <Row style={{paddingTop: '10px'}}>
      <Form onSubmit={handleDescriptionSubmit}>
        {!isEditingDescription && user && user.description ? (
          <div>
            <p>
              {user.description}{' '}
              <Button style={{height: '25px', fontSize: '10px'}} onClick={toggleEditDescription} variant="outline-primary" size="sm">
                Edit
              </Button>
            </p>
          </div>
        ) : (
         
            <Row>
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
              <Button type="submit">Save</Button>
              <Button variant="outline-secondary" onClick={toggleEditDescription} style={{ marginLeft: '5px' }}>
                Cancel
              </Button>
            </Row>
          
        )}
      </Form>
      </Row>
      </Col>
    </Row>
  </Container>
  );
  
};

export default MyAccountPage;