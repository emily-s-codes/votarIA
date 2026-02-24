import fs from "fs";
import path from "path";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { SystemMessage, BaseMessage } from "@langchain/core/messages";

const instructionsPath = process.env.NODE_ENV === 'production' 
  ? path.join(__dirname, "systemInstructions.txt")
  : path.join(process.cwd(), "src", "llm", "systemInstructions.txt");
  
const SYSTEM_MESSAGE_TEXT = fs.readFileSync(instructionsPath, "utf-8");

/**
 * In-memory history that prepends a persistent system prompt to all conversation contexts.
 */
export class SessionChatHistory extends InMemoryChatMessageHistory {
  private systemMessage: SystemMessage;

  /**
   *
   */
  constructor(systemMessageText?: string) {
    super();
    this.systemMessage = new SystemMessage(systemMessageText ?? SYSTEM_MESSAGE_TEXT);
  }

  /**
   * Returns messages with the {@link systemMessage} injected at index 0.
   */
  override async getMessages(): Promise<BaseMessage[]> {
    const messages = await super.getMessages();
    return [this.systemMessage, ...messages];
  }
}

/** * Internal storage mapping session IDs to their respective history instances.
 * @type {Map<string, SessionChatHistory>} 
 */
const store = new Map<string, SessionChatHistory>();

/**
 * Factory function to retrieve or initialize a session's history.
 * @param sessionId - Unique identifier for the chat session.
 * @param systemMessageText - Optional override for the default system prompt.
 */
export function getMessageHistory(sessionId: string, systemMessageText?: string): SessionChatHistory {
  if (!store.has(sessionId)) {
    store.set(sessionId, new SessionChatHistory(systemMessageText));
  }
  return store.get(sessionId)!;
}