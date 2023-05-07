import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const CharacterBrief = ({ isLoadingStory, selectedSentences, sentenceButtons, generateCharacterBrief, clearCharacterBrief }) => {
  return (
    <>
    {isLoadingStory ? (
        <Button variant="primary" disabled>
          Loading...
        </Button>
      ) : (
        <div className="mt-5">
          <Button onClick={generateCharacterBrief}>Send to OpenAI</Button>
        </div>
      )}
      <Row className="mt-3 w-100">
        <Col>
          <Card>
            <Card.Body>
              <h4>Story Ideas</h4>
              <ul>{sentenceButtons}</ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Button onClick={() => generateCharacterBrief(selectedSentences)}>
          Generate Updated Response
        </Button>
        <Button onClick={clearCharacterBrief} className="ml-3">Clear Character Brief</Button>

      </Row>
    </>
  );
};

export default CharacterBrief;
