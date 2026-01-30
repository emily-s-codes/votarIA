import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { getMessageHistory } from "./history";

const model = new ChatGoogleGenerativeAI({
  model: "models/gemini-2.5-flash",
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