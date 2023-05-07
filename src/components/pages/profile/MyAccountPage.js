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
import CharacterBrief from "./CharacterBrief"; // Import the CharacterBrief component
import ProfilePicture from "./ProfilePicture";
import NameEditor from "./forms/NameEditor";
import LocationEditor from "./forms/LocationEditor";
import DescriptionEditor from "./forms/DescriptionEditor";
import SavedSentences from "./SavedSentences";
import InitialForm from "./forms/InitialForm";



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
  const [firstTime, setFirstTime] = useState(true);


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
      Please come up with 10 interesting story titles and descriptions. 
      The main character of these stories should be named ${name}.
      They should be from ${location}. 
      Here is a brief description of them: ${description}. 
      The output should have the layout of StoryTitle1: StoryDescription1. StoryTitle2: StoryDescription2. etc. 
      Don't number the stories.
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
  
  const clearCharacterBrief = () => {
    setSelectedSentences([]);
  };
  
  
  

   // Split response into sentences and create a Button for each sentence
     //  .split(/(?<=[.?!])\s+(?=[A-Z])/)

   const sentenceButtons = openAIResponse
   .split(/(?<=\.)\s+(?=[A-Z])/)
   .filter((_, index) => index % 2 === 0)

    .map((sentence, index) => (

    <li key={index} className="sentence-item">
      <input
        type="checkbox"
        id={`sentence-${index}`}
        className="checkmark"
        checked={selectedSentences.includes(sentence)}
        onChange={(e) => saveSelectedSentence(sentence, e.target.checked, selectedSentences)}
      />
      <label htmlFor={`sentence-${index}`}>{sentence.trim()}</label>
    </li>
   
   ));


   useEffect(() => {
    if (!firstTime && user) {
      const updatedUser = {
        ...user,
        name: name,
        location: location,
        description: description,
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, [firstTime, user, name, location, description, setUser]);
  

  return (
    <Container>
      <Row>
      {firstTime && (
  <InitialForm
    user={user}
    setName={setName}
    setLocation={setLocation}
    setDescription={setDescription}
    onSubmit={() => setFirstTime(false)}
  />
)}


      </Row>
   
  </Container>
  );
};

export default MyAccountPage;
