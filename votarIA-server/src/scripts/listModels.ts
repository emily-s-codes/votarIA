import { GoogleGenAI } from "@google/genai";
import '../../config';

/**
 * Initialized Google AI SDK instance using the API key from environment variables.
 */
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

/**
 * Asynchronously retrieves and logs the list of available generative models 
 * from the Google AI API. This is useful for verifying API key permissions 
 * and checking for model updates (e.g., Gemini 1.5 Pro vs Flash).
 * * @async
 * @function listModels
 * @returns {Promise<void>}
 * @throws Logs an error to the console if the API request fails.
 */
async function listModels() {
  try {
    console.log("Available models:");
    const modelsPager = await ai.models.list();

    for await (const model of modelsPager) {
      console.log(`- ${model.name}${model.displayName ? ` (${model.displayName})` : ""}`);
    }
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();