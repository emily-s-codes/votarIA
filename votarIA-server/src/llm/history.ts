import fs from "fs";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";
import { SystemMessage } from "@langchain/core/messages";

// Load system instruction once at startup
const SYSTEM_MESSAGE_TEXT = fs.readFileSync("src/llm/systemInstructions.txt", "utf-8");

export class SessionChatHistory extends InMemoryChatMessageHistory {
  private systemMessage: SystemMessage;

  constructor(systemMessageText?: string) {
    super();
    this.systemMessage = new SystemMessage(systemMessageText ?? SYSTEM_MESSAGE_TEXT);
  }

  async getMessages() {
    const messages = await super.getMessages();
    return [this.systemMessage, ...messages];
  }
}

const store = new Map<string, SessionChatHistory>();

export function getMessageHistory(sessionId: string, systemMessageText?: string) {
  if (!store.has(sessionId)) {
    store.set(sessionId, new SessionChatHistory(systemMessageText));
  }
  return store.get(sessionId)!;
}
