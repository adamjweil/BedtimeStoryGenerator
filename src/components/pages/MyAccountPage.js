import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

const MyAccountPage = ({ user, setUser }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState(user ? user.description || "" : "");
  const [name, setName] = useState(user ? user.name || "" : "");
  const [email, setEmail] = useState(user ? user.email || "" : "");
  const [selectedSentences, setSelectedSentences] = useState([]);


  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const [location, setLocation] = useState(user ? user.location || "" : "");
  const [isEditingLocation, setIsEditingLocation] = useState(false);

  const [openAIResponse, setOpenAIResponse] = useState("");
  const [isLoadingStory, setIsLoadingStory] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
  };

  const toggleEditDescription = () => {
    setIsEditingDescription(!isEditingDescription);
  };

  const toggleEditLocation = () => {
    setIsEditingLocation(!isEditingLocation);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const generateCharacterBrief = async (e) => {
    e.preventDefault();

    let prompt = `
        Please take the following details and generate a creative character brief (or character summary). 
        They should be a hero named ${name}. 
        They should be from ${location}. 
        Here is how they would describe the cooler aspects of themselves: ${description}
        The brief should bring in some creative element that relate to the characters and personalities (not limited to, but mentioned above).
        The length of the brief should be around 3 to 5 paragraphs, depending on the creative concepts that can be refenrenced from the users description of themselves.
      `;
    if (selectedSentences) {
      prompt += `\n\nSelected sentences: ${selectedSentences.join(" ")}`;
    }
    const token = process.env.REACT_APP_OPENAI_API_KEY;

    try {
      setIsLoadingStory(true)
      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          prompt: prompt,
          model: "text-davinci-003",
          max_tokens: 1000,
          temperature: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenAIResponse(response.data.choices[0].text);
      console.log(response.data.choices[0].text);
    } catch (error) {
      alert("Error sending data to OpenAI");
      console.log(error);
    } finally {
      setIsLoadingStory(false);
    }
  };

  // Toggle selection of a sentence
  const toggleSelectedSentence = (sentence) => {
    if (selectedSentences.includes(sentence)) {
      setSelectedSentences(
        selectedSentences.filter((selected) => selected !== sentence)
      );
    } else {
      setSelectedSentences([...selectedSentences, sentence]);
    }
  };

 

  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "/api/user/updateLocation",
        { location },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the user object with the new location
      const updatedUser = { ...user, location: response.data.location };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditingLocation(false);
      alert("Location updated successfully");
    } catch (error) {
      alert("Error updating location");
    }
  };

  const handleProfilePictureSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", file);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/api/user/updateProfilePicture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the user object with the new profilePicture
      const updatedUser = {
        ...user,
        profilePicture: response.data.profilePicture,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      alert("Profile picture updated successfully");
    } catch (error) {
      alert("Error updating profile picture");
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "/api/user/updateName",
        { name },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the user object with the new name
      const updatedUser = { ...user, name: response.data.name };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditingName(false);
      alert("Name updated successfully");
    } catch (error) {
      alert("Error updating name");
    }
  };

  const handleDescriptionSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        "/api/user/updateDescription",
        { description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the user object with the new description
      const updatedUser = { ...user, description: response.data.description };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setIsEditingDescription(false);
      alert("Description updated successfully");
    } catch (error) {
      alert("Error updating description");
    }
  };

  async function saveSelectedSentence(sentence, checked, selectedSentences) {
    const token = localStorage.getItem('token');
  
    try {
      const response = await fetch('/api/selectedSentences', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          selectedSentences: checked
            ? [...(selectedSentences || []), sentence] // Use a default value if selectedSentences is undefined
            : (selectedSentences || []).filter(s => s !== sentence)
        })
      });
      console.log(response)
  
      if (!response.ok) {
        throw new Error('Failed to update selected sentences');
      }
  
      // Update the local state of selected sentences
      setSelectedSentences(selectedSentences => (
        checked
          ? [...(selectedSentences || []), sentence] // Use a default value if selectedSentences is undefined
          : (selectedSentences || []).filter(s => s !== sentence)
      ));
    } catch (error) {
      console.error(error);
    }
  }
  
  
  
  

   // Split response into sentences and create a Button for each sentence
   const sentenceButtons = openAIResponse
   .split(/(?<=[.?!])\s+(?=[A-Z])/)
   .map((sentence, index) => (
    <li key={index} className="sentence-item">
    <input
      type="checkbox"
      id={`sentence-${index}`}
      className="checkmark"
      checked={selectedSentences.includes(sentence)}
      onChange={(e) => saveSelectedSentence(sentence, e.target.checked)}
      />
    <label htmlFor={`sentence-${index}`}>{sentence.trim()}</label>
  </li>
   
   ));


  useEffect(() => {
    if (user) {
      setDescription(user.description || "");
      setName(user.name || "");
      setLocation(user.location || "");
    }
  }, [user]);

  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Row
            className="mt-5"
            style={{ paddingTop: "50px", paddingBottom: "20px" }}
          >
            <Col style={{ minWidth: "300px" }}>
              <Card>
                <Card.Body>
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
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col style={{ minWidth: "300px" }}>
              <Card>
                <Card.Body>
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
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col style={{ minWidth: "300px" }}>
              <Card>
                <Card.Body>
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
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col
          sm={12}
          className="d-flex flex-column align-items-center"
          style={{ marginLeft: "50px" }}
        >
          {" "}
          {/* Right two columns for OpenAI API */}
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
            {" "}
            {/* OpenAI Response */}
            <Col>
              <Card>
                <Card.Body>
                  {selectedSentences}
                  <h4>Character Brief</h4>
                  <ul>
                    {sentenceButtons}
                    </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-3">
            <Button onClick={() => generateCharacterBrief(selectedSentences)}>
              Generate Updated Response
            </Button>
          </Row> 
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccountPage;
