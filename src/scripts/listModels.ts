import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY!,
});

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
