import { chain } from "../llm/gemini";

export async function streamChat(prompt: string, sessionId: string) {
  return chain.stream(
    prompt,
    {
      configurable: { sessionId },
    }
  );
}
