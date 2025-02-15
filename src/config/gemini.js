import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Updated to new model
});

const generationConfig = {
  temperature: 1,      // Updated temperature
  topP: 0.95,         // Updated topP
  topK: 40,           // Updated topK
  maxOutputTokens: 8192, // Updated token limit
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = await result.response.text();
  console.log(response);
  return response;
}

export default run;