import { useEffect, useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const StoryGenerator = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const fetchStory = async () => {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });

      const openai = new OpenAIApi(configuration);

      const prompt = this.props.user; // You can replace this with your own prompt

      if (!prompt) {
        return console.error('Prompt missing');
      }

      if (prompt.length > 100) {
        return console.error('Prompt too long');
      }

      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `Write a children's bedtime story about the topic listed below. The story should have a clear beginning, middle, and end. In the beginning, the main character should face some sort of hardship. The second part of the story should focus on how the main character needed to look within themselves to overcome whatever obstacles they were facing. The final part of the story should be about success and triumph, as it relates to the obstacles encountered in the beginning of the story. The length of the story should be 800-1000 words.\nTopic: ${prompt}\nChildren's Bedtime Story:`,
        max_tokens: 1000,
        temperature: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
      });

      const story = completion.data.choices[0].text;
      console.log(completion);

      setQuote(story);
    };

    fetchStory();
  }, []);

  return (
    <div>
      <h1>Generated Story</h1>
      <p>{quote}</p>
    </div>
  );
};

export default StoryGenerator;
