import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import Typewriter from 'typewriter-effect';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
import './App.css'; // Import custom CSS file for additional styling
import bgImg from './assets/bg_image.png';
import icon from './assets/storytelling.png';

const openai = new OpenAIApi({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const App = () => {
  // State to store user input and generated story
  const [userInput, setUserInput] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState('');

  // Function to handle user input change
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  }

  // Function to generate story
  const generateStory = async (e) => {
    e.preventDefault();
    // Show loading spinner
    setIsLoading(true);
    console.log(userInput)
    console.log("Is loading: " + isLoading)
    try {
        const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: `
            Write a children's bedtime story that is roughly 500 to 1000 words. One of the themes in the book should relate to ${userInput}. The story should have a beginning, middle and end. The beginning of the story should be about getting to know the main character. They should be fun and interesting. In the middle of the story they should deal with some sort of obstacle in their lives. The final section of the book will focus on how they overcame the obstacles in their lives, and that are better because of it. The story is for 7-10 year old children. By the end of the story the character should show some growth in their personalities and willingness to accept change.
          `,
          model: "text-davinci-003",
          max_tokens: 1000,
          temperature: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
       );
       const generatedText = response.data.choices[0].text.trim();
      setGeneratedStory(generatedText);
    } catch (error) {
      console.error(error);
    } finally {
      // Hide loading spinner
        setIsLoading(false);
        console.log("Is loading: " + isLoading);
    }
  };

  // Function to clear generated story
  const clearStory = () => {
    setGeneratedStory('');
    setUserInput('');
  }

  return (
    <Container fluid className="landing-page">
    <head>
    <link href="https://fonts.googleapis.com/css?family=Lobster" rel="stylesheet" />
    </head>
      <Row className="justify-content-center align-items-center h-100" style={{
        backgroundImage: `url(${bgImg})`,
         backgroundRepeat: 'no-repeat',
         backgroundPosition: 'center center',
         backgroundSize: 'cover',
         height: '36vh',
      }}>
        <Col xs={12} sm={8} md={6} lg={4}>
        <div className="title-container">
          <h1 className="title">
             Bedtime Story Generator
          </h1>
          </div>
          <Form style={{textAlign: "center"}}>

            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>              <Form.Group controlId="userInput" style={{textAlign: "center", justifyContent: 'center'}}>
                <Form.Control
                  type="text"
                  placeholder="Enter your story prompt here"
                  value={userInput}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: '#F1F3F4',
                    border: 'none',
                    borderRadius: '24px',
                    boxShadow: 'none',
                    fontSize: '18px',
                    paddingLeft: '16px',
                    paddingRight: '48px',
                    height: '48px',
                    margin: '16px 0',
                    width: '250px',
                  }}
                />
              </Form.Group>
              <div style={{ margin: '20px' }}>
                <Button variant="secondary" onClick={generateStory}>
                  Generate
                </Button>
              </div>
            </div>
          </Form>
          </Col>
          </Row>

          <div class="container">
            <div class="left-column">

            </div>
            <div class="middle-column">
            <Row>
            <Col>
            {isLoading ? (
              <Button style={{}} variant='primary' disabled>
              <Spinner
                animation="border"
                size="lg"
                role="status"
                aria-hidden="true"
              /> Loading...
              </Button>

            ) : (
              generatedStory && (
                <div className="output-field">

                  <div className="notebook">

                    {generatedStory}
                  </div>
                  <Button variant="clear-button" onClick={clearStory}>
                    Clear
                  </Button>
                </div>
              )
            )}
            </Col>
            </Row>
            </div>
            <div class="right-column">
            </div>
          </div>

    </Container>
  );
};

export default App;
