import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { OpenAIApi } from 'openai';
import './App.css';
import GenerateStoryPage from './components/GenerateStoryPage';

const openai = new OpenAIApi({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const App = () => {

  return (
    <Container fluid className="landing-page">
      <head>
        <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" />
      </head>
      <Row>
        <Col>
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/generate-story">Generate Story</Link>
                  </li>
                </ul>
              </nav>
              <Routes>
                <Route path="/" element={<GenerateStoryPage />} />
                <Route path="/generate-story" element={<h1>Welcome to the home page</h1>} />
              </Routes>
            </div>
          </Router>
          <Row style={{ marginLeft: '10%', marginRight: '10%', marginTop: '30px' }}></Row>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
