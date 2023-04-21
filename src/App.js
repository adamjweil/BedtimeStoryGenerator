import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { OpenAIApi } from 'openai';
import './App.css';
import GenerateStoryPage from './components/pages/GenerateStoryPage';
import NavigationBar from './components/Navbar';

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
              <NavigationBar />
              <Routes>
                <Route path="/" element={<GenerateStoryPage />} />
                <Route path="/" element={<h1>My Stories Page</h1>} />
              </Routes>
            </div>
          </Router>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
