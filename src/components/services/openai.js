import axios from 'axios';

export const generateStoryFromPrompt = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        prompt: prompt,
        model: 'text-davinci-003',
        max_tokens: 1000,
        temperature: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const generateImageFromText = async (text) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        model: 'image-alpha-001',
        prompt: `Please take the following text and turn it into an image for a children's story:\n\n${text}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
        },
      }
    );
    return response.data.data[0].url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
