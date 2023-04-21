import React, { useState } from 'react';
import { generateStoryPrompt, splitStoryIntoParagraphs } from '../../utils/storyUtils';
import { generateStoryFromPrompt, generateImageFromText } from '../services/openai';
import StoryForm from '../Form/Form';
import Story from '../Story/Story'

const GenerateStoryPage = () => {
  const [userInput, setUserInput] = useState('');
  const [userInput2, setUserInput2] = useState('');
  const [generatedStory, setGeneratedStory] = useState([]);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const [generatedImages, setGeneratedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    name === 'userInput' ? setUserInput(value) : setUserInput2(value);
  };

  const generateStory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const prompt = generateStoryPrompt(userInput, userInput2);
      const generatedText = await generateStoryFromPrompt(prompt);
      const generatedStoryArray = generatedText.split('\n\n');
      setGeneratedStory(generatedStoryArray);

      // Generate images after the story has been set
      const images = [];
      for (let i = 0; i < generatedStoryArray.length; i++) {
        try {
          const imageUrl = await generateImageFromText(generatedStoryArray[i]);
          images.push(imageUrl);
        } catch (error) {
          console.error(error);
        }
      }
      setGeneratedImages(images);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearStory = () => {
    setGeneratedStory([]);
    setGeneratedImages([]);
    setUserInput('');
    setUserInput2('');
  };

  const handleNextClick = () => setCurrentParagraph(currentParagraph + 1);

  const handlePrevClick = () => setCurrentParagraph(currentParagraph - 1);

  return (
    <div>
      <StoryForm
          userInput={userInput}
          userInput2={userInput2}
          handleInputChange={handleInputChange}
          generateStory={generateStory}
        />
      <hr style={{border: '1px solid black'}} />

        <Story
          isLoading={isLoading}
          generatedStory={generatedStory}
          currentParagraph={currentParagraph}
          generatedImages={generatedImages}
          handlePrevClick={handlePrevClick}
          handleNextClick={handleNextClick}
          clearStory={clearStory}
        />

    </div>
  );
};

export default GenerateStoryPage;
