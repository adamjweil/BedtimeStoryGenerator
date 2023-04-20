import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Image,
  Navbar,
  Nav,
} from 'react-bootstrap';
import { BookHalf } from 'react-bootstrap-icons';

const GenerateStoryPage = () => {
  const [userInput, setUserInput] = useState('');
  const [userInput2, setUserInput2] = useState('');
  const [generatedStory, setGeneratedStory] = useState([]);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    name === 'userInput' ? setUserInput(value) : setUserInput2(value);
  };

  const generateStory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          prompt: `
            Write a sentence about ${userInput}.
            Make the sentence about a person named ${userInput2}.
          `,
          model: 'text-davinci-003',
          max_tokens: 1000,
          temperature: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          },
        }
      );
      const generatedText = response.data.choices[0].text;
      const generatedStoryArray = generatedText.split('\n\n');
      setGeneratedStory(generatedStoryArray);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearStory = () => {
    setGeneratedStory([]);
    setGeneratedImages([]);
    setUserInput('');
  };

  const handleNextClick = () => setCurrentParagraph(currentParagraph + 1);

  const handlePrevClick = () => setCurrentParagraph(currentParagraph - 1);

  useEffect(() => {
    const generateImages = async () => {
      const images = [];
      for (let i = 0; i < generatedStory.length; i++) {
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/images/generations',
            {
              model: 'image-alpha-001',
              prompt: `Please take the following text and turn it into an image for a children's story:\n\n${generatedStory[i]}`,
            },
            {
              headers: {
                'Content-Type': 'application/json',
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
  }, [generatedStory, userInput2]);

  return (
    <div>
      <div className="title-container">
        <h1 className="title" style={{ textAlign: 'center' }}>
          Bedtime Story
        </h1>
      </div>
      <Form style={{ textAlign: 'center' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Form.Group
            controlId="userInput"
            style={{ textAlign: 'center', justifyContent: 'center' }}
          >
            <Form.Control
              type="text"
              placeholder="What should story be about?"
              name="userInput"
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
          <Form.Group controlId="userInput2">
            <Form.Control
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
                width: '210px',
              }}
              type="text"
              placeholder="Name?"
              name="userInput2"
              value={userInput2}
              onChange={handleInputChange}
            />
          </Form.Group>
          <div style={{ margin: '20px' }}>
            <Button
              size="sm"
              variant="primary"
              style={{
                borderRadius: '10px',
                padding: '8px',
                border: '1px white solid',
              }}
              onClick={generateStory}
            >
              <BookHalf style={{ marginRight: '5px' }} /> GENERATE
            </Button>
          </div>
        </div>
      </Form>
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
            generatedStory && generatedStory.length > 0 && (
              <div className="output-field">
                <div className="notebook">
                  <h2 style={{ marginBottom: '20px' }}>Story</h2>
                  <div>
                    <img style={{ width: '300px', height: 'auto' }} src={generatedImages[currentParagraph]} alt={`Image for paragraph ${currentParagraph}`} />
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
    </div>
  );
};

export default GenerateStoryPage;
