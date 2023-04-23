import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { OpenAIApi } from 'openai';
import './App.css';
import GenerateStoryPage from './components/pages/GenerateStoryPage';
import MyAccountPage from './components/pages/MyAccountPage';

import RegisterPage from './components/pages/RegisterPage';
import LoginPage from './components/pages/LoginPage';

import NavigationBar from './components/Navbar';

import jwt_decode from 'jwt-decode';
import axios from 'axios';

const openai = new OpenAIApi({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwt_decode(token);
        setUser(decodedUser);

        // Set the default authorization header for axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error decoding the token:', error);
      }
    }
  }, []);

  return (
    <Container fluid className="landing-page">
      <head>
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" />
      </head>
      <Row>
        <Col>
          <Router>
            <div>
              <NavigationBar user={user} setUser={setUser} />
              <Routes>
                <Route path="/" element={<GenerateStoryPage />} />
                <Route path="/my-account" element={<MyAccountPage user={user} setUser={setUser} />} />
                <Route path="/register" element={<RegisterPage setUser={setUser} />} />
                <Route path="/login" element={<LoginPage setUser={setUser} />} />

              </Routes>
            </div>
          </Router>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
