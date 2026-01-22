import { chain } from "../llm/gemini";

const activeStreams = new Map<string, AbortController>();

export async function streamChat(prompt: string, sessionId: string) {
  const controller = new AbortController();
  activeStreams.set(sessionId, controller);

  return chain.stream(
    prompt,
    {
      configurable: { sessionId },
      signal: controller.signal,
    }
  );
}

export function stopStream(sessionId: string) {
  const controller = activeStreams.get(sessionId);
  if (controller) {
    controller.abort();
    activeStreams.delete(sessionId);
  }
}