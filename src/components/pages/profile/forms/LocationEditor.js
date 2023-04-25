import React from "react";
import { Button, Form, Row } from "react-bootstrap";

const LocationEditor = ({ user, isEditingLocation, location, handleLocationSubmit, handleLocationChange, toggleEditLocation }) => {
  return (
    <Form onSubmit={handleLocationSubmit}>
      {!isEditingLocation && user && user.location ? (
        <div>
          <p>
            I live in {user.location}{" "}
            <Button
              onClick={toggleEditLocation}
              variant="outline-primary"
              size="sm"
              style={{
                fontSize: "0.5rem",
                padding: "2px 5px",
              }}
            >
              Edit
            </Button>
          </p>
        </div>
      ) : (
        <Row>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Enter your location"
              required
            />
          </Form.Group>
          <Button type="submit">Save</Button>
          <Button
            variant="outline-secondary"
            onClick={toggleEditLocation}
            style={{ marginLeft: "5px" }}
          >
            Cancel
          </Button>
        </Row>
      )}
    </Form>
  );
};

export default LocationEditor;
