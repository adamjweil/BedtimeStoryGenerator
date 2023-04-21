import React from 'react';
import { Row, Col, Button, Image } from 'react-bootstrap';
import Paragraph from './Paragraph';

const Story = ({
  isLoading,
  generatedStory,
  currentParagraph,
  generatedImages,
  handlePrevClick,
  handleNextClick,
  clearStory,
}) => {
  if (isLoading) {
    return (
      <Button variant="primary" disabled>
        Loading...
      </Button>
    );
  }

  if (generatedStory.length === 0) {
    return null;
  }

  return (
    <Row>
      <Col>
        <div className="output-field">
        <Paragraph
           text={generatedStory[currentParagraph]}
           imageSrc={generatedImages[currentParagraph]}
         />
          
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrevClick}
              disabled={currentParagraph === 0}
              style={{ marginRight: '10px' }}
            >
              Prev
            </Button>
            <Button
              variant="primary"
              size="sm"
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
      </Col>
    </Row>
  );
};

export default Story;
