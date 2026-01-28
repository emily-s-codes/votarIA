/**
 * Data structure for the initial generation request.
 * @interface GenerateRequest
 */
export interface GenerateRequest {
  /** The text prompt or question to be processed by the AI model. */
  prompt: string;
}

/**
 * Represents an individual data chunk received during an AI streaming response.
 * @interface StreamChunk
 */
export interface StreamChunk {
  /** * An optional array of output objects containing the content type and the generated text fragment.
   * @type {Array<{type: string, text: string}>}
   */
  output?: { type: string; text: string }[];
}