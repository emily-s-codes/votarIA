import { chain } from "../llm/gemini";

/** Registry of active streams used for manual cancellation. */
const activeStreams = new Map<string, AbortController>();

/**
 * Initiates an AI stream. Automatically cancels any existing stream for the session.
 */
export async function streamChat(prompt: string, sessionId: string) {
  stopStream(sessionId);

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

/**
 * Cancels the underlying HTTP request for a specific session.
 */
export function stopStream(sessionId: string): void {
  const controller = activeStreams.get(sessionId);
  if (controller) {
    controller.abort();
    activeStreams.delete(sessionId);
  }
}

/**
 * Cleans up memory once a stream completes naturally.
 */
export function endActiveStream(sessionId: string): void {
  activeStreams.delete(sessionId);
}