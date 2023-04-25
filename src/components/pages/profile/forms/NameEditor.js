import React from "react";
import { Button, Form, Row } from "react-bootstrap";

const NameEditor = ({ user, isEditingName, name, handleNameSubmit, setName, toggleEditName }) => {
  return (
    <Row className="d-flex justify-content-between mb-3">
      <div>
        <Form onSubmit={handleNameSubmit}>
          {user && !isEditingName && user.name ? (
            <div>
              <h3>
                Hey, I'm {user.name}!!{" "}
                <Button
                  style={{ borderWidth: 3 }}
                  onClick={toggleEditName}
                  variant="outline-primary"
                  size="sm"
                >
                  Edit
                </Button>
              </h3>
            </div>
          ) : (
            <Row>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </Form.Group>
              <Button type="submit">Save</Button>
              <Button
                variant="outline-secondary"
                onClick={toggleEditName}
                style={{ marginLeft: "5px" }}
              >
                Cancel
              </Button>
            </Row>
          )}
        </Form>
      </div>
    </Row>
  );
};

export default NameEditor;
