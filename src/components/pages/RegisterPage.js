import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const RegisterPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", {
        email,
        password,
      });
      console.log(response);
      // Store the JWT token received in the response
      localStorage.setItem("token", response.data.token);

      // Log the user in after successful registration
      const loginResponse = await axios.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", loginResponse.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${loginResponse.data.token}`;
      setUser(loginResponse.data.user);
      localStorage.setItem("user", JSON.stringify(loginResponse.data.user));

      // Navigate to the desired page after successful registration and login
      navigate("/my-account");
    } catch (error) {
      console.log(error.response);
      alert(
        "Error registering. Please try again. " +
          (error.response && error.response.data.message
            ? error.response.data.message
            : "")
      );
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default RegisterPage;
