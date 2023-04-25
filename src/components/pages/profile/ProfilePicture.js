import React from "react";
import { Button, Form, Image, Row } from "react-bootstrap";

const ProfilePicture = ({ user, handleProfilePictureSubmit, handleFileChange }) => {
  return (
    <Row className="justify-content-center mb-3">
      {user && user.profilePicture ? (
        <Image
          src={`/${user.profilePicture}`}
          alt="ProfilePicture"
          roundedCircle
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
          }}
        />
      ) : (
        <Form onSubmit={handleProfilePictureSubmit}>
          <Form.Group>
            <Form.Control
              style={{ fontSize: "12px", padding: "2px 6px" }}
              type="file"
              onChange={handleFileChange}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            style={{ fontSize: "12px", padding: "5px 10px" }}
          >
            Update Photo
          </Button>
        </Form>
      )}
    </Row>
  );
};

export default ProfilePicture;
