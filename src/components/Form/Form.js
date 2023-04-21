import React from 'react';
import { Form, Button } from 'react-bootstrap';

const StoryForm = ({ userInput, userInput2, handleInputChange, generateStory }) => {
  return (
    <Form style={{ textAlign: 'center' }} onSubmit={generateStory}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Form.Group controlId="userInput">
          <Form.Label style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Please enter a topic for your story:
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Ninjas, Snowboarding, Mermaids, etc.."
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
          <Form.Label style={{ fontWeight: 'bold', fontSize: '20px' }}>
            What's your name?
          </Form.Label>
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
            placeholder="Peter"
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
            type="submit"
          >
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default StoryForm;
