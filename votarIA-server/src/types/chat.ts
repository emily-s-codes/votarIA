export interface GenerateRequest {
  prompt: string;
}

export interface StreamChunk {
  output?: { type: string; text: string }[];
}
