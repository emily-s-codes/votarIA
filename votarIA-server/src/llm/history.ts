import fs from "fs";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { SystemMessage } from "@langchain/core/messages";

/** * Pre-loaded system instructions from the local filesystem used as the 
 * default behavior guide for the AI model. 
 */
const SYSTEM_MESSAGE_TEXT = fs.readFileSync("src/llm/systemInstructions.txt", "utf-8");

/**
 * Extends the in-memory chat history to include a persistent system message.
 * This ensures that the AI model always receives its instructions at the 
 * beginning of every conversation context.
 */
export class SessionChatHistory extends InMemoryChatMessageHistory {
  private systemMessage: SystemMessage;

  /**
   * Creates an instance of SessionChatHistory.
   * @param {string} [systemMessageText] - Optional custom system instructions. 
   * Defaults to the text loaded from the local systemInstructions.txt file.
   */
  constructor(systemMessageText?: string) {
    super();
    this.systemMessage = new SystemMessage(systemMessageText ?? SYSTEM_MESSAGE_TEXT);
  }

  /**
   * Retrieves the full conversation history.
   * Prepends the system message to the stored user and AI message history.
   * @returns {Promise<BaseMessage[]>} An array of messages starting with the system instruction.
   */
  async getMessages() {
    const messages = await super.getMessages();
    return [this.systemMessage, ...messages];
  }
}

/** * Internal storage mapping session IDs to their respective history instances.
 * @type {Map<string, SessionChatHistory>} 
 */
const store = new Map<string, SessionChatHistory>();

/**
 * Retrieves or initializes the chat history for a specific session.
 * This function acts as a provider for LangChain's RunnableWithMessageHistory.
 * @param {string} sessionId - Unique identifier for the chat session.
 * @param {string} [systemMessageText] - Optional instructions to override the default system prompt.
 * @returns {SessionChatHistory} The history instance associated with the session ID.
 */
export function getMessageHistory(sessionId: string, systemMessageText?: string) {
  if (!store.has(sessionId)) {
    store.set(sessionId, new SessionChatHistory(systemMessageText));
  }
  return store.get(sessionId)!;
}