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
import { BookHalf } from 'react-bootstrap-icons';


const openai = new OpenAIApi({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});
const App = () => {
  // State to store user input and generated story
  const [userInput, setUserInput] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [generatedImages, setGeneratedImages] = useState([]);

  useEffect(() => {
    const generateImages = async () => {
      const images = [];
      for (let i = 0; i < generatedStory.length; i++) {
        try {
          const response = await axios.post(
            "https://api.openai.com/v1/images/generations",
            {
              model: "image-alpha-001",
              prompt: `Please take the following text and turn it into an image for a children's story:\n\n${generatedStory[i]}`,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
              },
            }
          );
          images.push(response.data.data[0].url);
        } catch (error) {
          console.error(error);
        }
      }
      setGeneratedImages(images);
    };
    generateImages();
  }, [generatedStory]);

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
    try {
        const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: `
          Write a children's bedtime story that is roughly 500 to 1000 words.
          One of the themes in the story should relate to ${userInput}.
          The story should have a beginning, middle and end.
          The beginning of the story should be about getting to know the main character. They should have a fun personality and interesting perspective.
          The middle of the story should be about the main character enduring some sort of obstacle in their lives.
          The final section of the story should focus on their triumph of said obstacle. They should be anecdotes of how they are better because of it.
          By the end of the story the character should show some growth in their personalities and willingness to accept change. This can be represented in the story via abstract references, or more directly.
          There should be elements of humor in the story.
          Choose words that draw a stark imagery.
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
       console.log(response.data.choices)
          const generatedText = response.data.choices[0].text;
          const generatedStoryArray = generatedText.split('\n\n');
          setGeneratedStory(generatedStoryArray);
          setCurrentParagraph(0);
    } catch (error) {
      console.error(error);
    } finally {
      // Hide loading spinner
        setIsLoading(false);
    }
  };

  // Function to clear generated story
  const clearStory = () => {
    setGeneratedStory([]);
    setGeneratedImages([]);
    setUserInput('');
  }

  // Function to handle next paragraph button click
  const handleNextClick = () => {
    setCurrentParagraph(currentParagraph + 1);
  }

  // Function to handle previous paragraph button click
  const handlePrevClick = () => {
    setCurrentParagraph(currentParagraph - 1);
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
          <h1 className="title" style={{whiteSpace: 'nowrap'}}>
             Bedtime Story
          </h1>
          <h1 className="title">
              Generator
          </h1>
          </div>
          <Form style={{textAlign: "center"}}>

            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>              <Form.Group controlId="userInput" style={{textAlign: "center", justifyContent: 'center'}}>
                <Form.Control
                  type="text"
                  placeholder="Enter your story prompt here..."
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
                    width: '350px',
                  }}
                />
              </Form.Group>
              <div style={{ margin: '20px' }}>
                <Button size='sm' variant="primary" style={{borderRadius: '10px', padding: '8px', border: '1px white solid'}} onClick={generateStory}>
                   <BookHalf style={{marginRight: '5px'}}/> GENERATE
                </Button>
              </div>
            </div>
          </Form>
          </Col>

          </Row>



            <Row style ={{marginLeft: '10%', marginRight: '10%', marginTop: '30px'}}>
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
              generatedStory && generatedStory.length > 0 && (
                <div className="output-field">
                  <div className="notebook">
                  <h2 style={{ marginBottom: '20px' }}>Story</h2>
                  <div>
                    <img style={{width: '300px', height: '300'}} src={generatedImages[currentParagraph]} alt={`Image for paragraph ${currentParagraph}`} />
                  </div>
                  <p>{generatedStory[currentParagraph]}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button
                      variant='primary'
                      size='sm'
                      onClick={handlePrevClick}
                      disabled={currentParagraph === 0}
                      style={{ marginRight: '10px' }}
                    >
                      Prev
                    </Button>
                    <Button
                      variant='primary'
                      size='sm'
                      onClick={handleNextClick}
                      disabled={currentParagraph === generatedStory.length - 1}
                    >
                      Next
                    </Button>
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
