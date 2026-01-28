import { chain } from "../llm/gemini";

/**
 * Internal registry to track active AbortControllers for each session.
 * Used to manage and terminate ongoing AI streams.
 */
const activeStreams = new Map<string, AbortController>();

/**
 * Initiates a streaming response from the AI model for a given prompt and session.
 * Automatically stops any existing stream for the same sessionId before starting a new one.
 * * @async
 * @param {string} prompt - The user input to send to the AI.
 * @param {string} sessionId - The unique identifier for the conversation session.
 * @returns {Promise<IterableReadableStream>} A stream of message chunks from the AI.
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
 * Triggers the AbortSignal for a specific session's active stream.
 * This effectively cancels the underlying HTTP request to the AI provider.
 * * @param {string} sessionId - The ID of the session to be aborted.
 * @returns {void}
 */
export function stopStream(sessionId: string) {
  const controller = activeStreams.get(sessionId);
  if (controller) {
    controller.abort();
    activeStreams.delete(sessionId);
  }
}

/**
 * Removes a session from the active streams map.
 * Should be called when a stream completes naturally to clean up memory.
 * * @param {string} sessionId - The ID of the session to clear.
 * @returns {void}
 */
export function endActiveStream(sessionId: string) {
  activeStreams.delete(sessionId);
}