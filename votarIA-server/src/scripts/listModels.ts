import { GoogleGenAI } from "@google/genai";
import '../../config';

/** * SDK entry point. Requires `GOOGLE_API_KEY` in environment. 
 */
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

/**
 * Lists available models to verify API key permissions and model availability.
 */
async function listModels(): Promise<void> {
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