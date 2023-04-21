# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


# Project Summary

Title: Bedtime Story Generator

Description: This is a web application that generates bedtime stories for children based on user input. The application is built using React.js and utilizes the OpenAI GPT-3 and DALL-E APIs to generate the story text and corresponding images.

Key Components:

GenerateStoryPage component: Main page of the application where the user provides input and the generated story and images are displayed. It contains the StoryForm and Story components.

StoryForm component: A form that captures user input (two fields, userInput and userInput2). When the form is submitted, it triggers the story generation process.

Story component: Displays the generated story text and corresponding images, along with navigation buttons to move between paragraphs, and a button to clear the story.

Paragraph component: Renders a single paragraph of the story with its corresponding image.

Image component: Renders the image for a given paragraph of the story.

StoryUtils: Utility functions for story generation, including generateStoryPrompt and splitStoryIntoParagraphs.

openai.js: Contains API request functions for generating a story and images from OpenAI's GPT-3 and DALL-E APIs. The functions are generateStoryFromPrompt and generateImageFromText.

Current state: The application is functional and allows the user to input two fields, which are used to generate a story with paragraphs and images. The user can navigate between paragraphs and clear the story to start again. The API request functions have been modularized and placed in a separate file (openai.js) to make the code more maintainable.
