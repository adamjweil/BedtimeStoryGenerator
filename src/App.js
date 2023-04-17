import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import Typewriter from 'typewriter-effect';
import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';
import './App.css'; // Import custom CSS file for additional styling

const openai = new OpenAIApi({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const App = () => {
  // State to store user input and generated story
  const [userInput, setUserInput] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    // console.log(process.env.REACT_APP_OPENAI_API_KEY)

    try {
        const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: `Write a children's bedtime story that is roughly 500 to 1000 words. One of the themes in the book should relate to ${userInput}. The story should have a beginning, middle and end. The beginning of the story should be about getting to know the main character. They should be fun and interesting. In the middle of the story they should deal with some sort of obstacle in their lives. The final section of the book will focus on how they overcame the obstacles in their lives, and that are better because of it. The story is for 7-10 year old children. By the end of the story the character should show some growth in their personalities and willingness to accept change.`,

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
     
    }
  };
  

  // Function to clear generated story
  const clearStory = () => {
    setGeneratedStory('');
    setUserInput('');
  }

  return (
    <Container fluid className="landing-page">
      <Row className="justify-content-center align-items-center h-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h1 className="title">
            <FontAwesomeIcon icon={faBook} /> Bedtime Story Generator
          </h1>
          <Form style={{textAlign: "center"}}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Form.Group controlId="userInput" style={{textAlign: "center", justifyContent: 'center'}}>
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
              <Button variant="primary" onClick={generateStory} className="generate-button">
                <FontAwesomeIcon icon={faBookOpen} style={{ fontSize: '1em' }} />
                Generate
              </Button>
            </div>
          </Form>

     
         
          {isLoading ? (
            <div className="text-center mt-3">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            generatedStory && (
              <div className="output-field">
                <h2>Generated Story:</h2>
                <div className="notebook">
                  <Typewriter
                    options={{
                      strings: [generatedStory],
                      autoStart: true,
                      delay: 50,
                    }}
                  />
                </div>
                <Button variant="clear-button" onClick={clearStory}>
                  Clear
                </Button>
              </div>
            )
          )}
        </Col>
      </Row>
    </Container>
 

  );
};

export default App;
