import { Request, Response } from "express";
import { stopStream, streamChat } from "../services/chat.service";

export async function generateStream(req: Request, res: Response) {
  const { prompt, sessionId } = req.body;

  if (!prompt || !sessionId) {
    res.status(400).json({ error: "prompt and sessionId are required" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const stream = await streamChat(prompt, sessionId);

  try {
    for await (const chunk of stream) {
      const text = chunk.content?.toString();
      if (text) {
        res.write(`data: ${text}\n\n`);
      }
    }

    res.write("event: end\ndata:\n\n");
    res.end();
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      console.log(`Stream aborted for session ${sessionId}`);
      if (res.headersSent) {
        res.write("event: aborted\ndata: Stream aborted by user\n\n");
        res.end();
      } else {
        res.end();
      }
    } else {
      console.error('Streaming error:', err);
      if (!res.headersSent) {
        res.write("event: error\ndata: Streaming error\n\n");
        res.end();
      } else {
        res.end();
      }
    }
  }
}

export async function abortStream(req: Request, res: Response) {
  const { sessionId } = req.params;

  if (!sessionId || Array.isArray(sessionId)) {
    res.status(400).json({ error: "A single valid sessionId is required" });
    return;
  }

  stopStream(sessionId);

  res.status(200).json({ message: `Streaming session ${sessionId} aborted` });
}