// SavedSentences.js
import React from "react";
import { Card } from "react-bootstrap";

const SavedSentences = ({ selectedSentences }) => {
  return (
    <Card>
      <Card.Body>
        <h4>Saved Sentences</h4>
        <ul>
          {selectedSentences.map((sentence, index) => (
            <li key={index}>{sentence}</li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default SavedSentences;
