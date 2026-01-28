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
 * A LangChain Runnable sequence that automatically manages chat history.
 * * @constant chain
 * @description This wrapper ensures that every model invocation automatically 
 * retrieves previous messages from the history provider and persists the 
 * new exchange back to the storage.
 * * @property {ChatGoogleGenerativeAI} runnable - The underlying AI model to execute.
 * @property {Function} getMessageHistory - The factory function used to retrieve 
 * session-specific message history based on a provided sessionId.
 */
export const chain = new RunnableWithMessageHistory({
  runnable: model,
  getMessageHistory,
});