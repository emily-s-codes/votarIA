import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { getMessageHistory } from "./history";

/**
 * The core ChatGoogleGenerativeAI model instance.
 * Configured to use the Gemini 1.5 Flash model with streaming enabled 
 * for real-time response generation.
 */
const model = new ChatGoogleGenerativeAI({
  model: "models/gemini-1.5-flash",
  streaming: true,
  apiKey: process.env.GOOGLE_API_KEY!,
});

/**
 * Orchestrates AI generation with automatic session-based history persistence.
 * @see {@link getMessageHistory} for the underlying storage implementation.
 */
export const chain = new RunnableWithMessageHistory({
  runnable: model,
  getMessageHistory,
});