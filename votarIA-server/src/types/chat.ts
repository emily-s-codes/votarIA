/**
 * Initial payload for generating an AI response.
 */
export interface GenerateRequest {
  /** The text prompt or question to be processed by the AI model. */
  prompt: string;
}

/**
 * Individual data packet emitted during an AI stream.
 */
export interface StreamChunk {
  /** Fragmented output containing the content type and text. */
  output?: { 
    type: string; 
    text: string; 
  }[];
}