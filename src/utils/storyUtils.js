
export const generateStoryPrompt = (userInput, userInput2) => {
  return `
  Write a sentence about ${userInput}.
  Make the sentence about a person named ${userInput2}.
  `;
};

export const splitStoryIntoParagraphs = (text) => {
  return text.split('\n\n');
};
