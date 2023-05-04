import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import GoogleLogin from "@leecheuk/react-google-login";

const RegisterPage = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleIdToken, setGoogleIdToken] = useState(null); // <-- define the googleIdToken state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Exchange the Google ID token for a backend token
      const googleResponse = await axios.post("/api/auth/google", {
        code: googleIdToken,
      });
      console.log(googleResponse);

      // Store the backend token received in the response
      localStorage.setItem("token", googleResponse.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${googleResponse.data.token}`;

      // Fetch user information using the backend token
      const userResponse = await axios.get("/api/user");
      console.log(userResponse);

      // Store user information in local storage
      setUser(userResponse.data);
      localStorage.setItem("user", JSON.stringify(userResponse.data));

  
     
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


  const handleGoogleResponse = async (response) => {
    console.log(response);
    if (!response || !response.tokenId) {
      // Handle case where response is null, undefined, or missing tokenId
      alert("Google login failed. Please try again.");
      return;
    }
  
    const googleIdToken = response.tokenId;
    setGoogleIdToken(googleIdToken); // <-- set the googleIdToken state
  
    try {
      // Exchange the Google ID token for a backend token
      const googleResponse = await axios.post("/api/auth/google", {
        code: googleIdToken,
      });
      console.log(googleResponse);
  
      // Store the backend token received in the response
      localStorage.setItem("token", googleResponse.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${googleResponse.data.token}`;
  
      // Fetch user information using the backend token
      const userResponse = await axios.get("/api/user");
      console.log(userResponse);
  
      // Store user information in local storage
      setUser(userResponse.data);
      localStorage.setItem("user", JSON.stringify(userResponse.data));
  
      // Navigate to the desired page after successful registration and login
      navigate("/my-account");
    } catch (error) {
      console.log(error.response);
      alert(
        "Error logging in with Google. Please try again. " +
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
        <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={handleGoogleResponse}
            onFailure={(error) => console.log(error)}
            cookiePolicy={"single_host_origin"}
            className="btn btn-outline-primary"
            timeout={10000}
        />
     </Form>
   
    </div>
  );
};

export default RegisterPage;
