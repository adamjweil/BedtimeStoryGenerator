import React from "react";
import { Button, Form, Row } from "react-bootstrap";

const DescriptionEditor = ({ user, isEditingDescription, description, handleDescriptionSubmit, handleDescriptionChange, toggleEditDescription }) => {
  return (
    <Form onSubmit={handleDescriptionSubmit}>
      {!isEditingDescription && user && user.description ? (
        <div>
          <p>
            {user.description}{" "}
            <Button
              style={{ height: "25px", fontSize: "10px" }}
              onClick={toggleEditDescription}
              variant="outline-primary"
              size="sm"
            >
              Edit
            </Button>
          </p>
        </div>
      ) : (
        <Row>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter a brief description about yourself..."
              required
            />
          </Form.Group>
          <Button type="submit">Save</Button>
          <Button
            variant="outline-secondary"
            onClick={toggleEditDescription}
            style={{ marginLeft: "5px" }}
          >
            Cancel
          </Button>
        </Row>
      )}
    </Form>
  );
};

export default DescriptionEditor;
