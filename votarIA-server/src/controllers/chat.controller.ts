import { Request, Response } from "express";
import { stopStream, streamChat, endActiveStream } from "../services/chat.service";

/**
 * Streams AI responses via Server-Sent Events (SSE).
 * * @throws {400} If prompt or sessionId are missing.
 * @remarks Ends with `event: end` on success or `event: aborted` if interrupted.
 */
export async function generateStream(req: Request, res: Response) {
  const { prompt, sessionId } = req.body;

  if (!prompt || !sessionId) {
    return res.status(400).json({ error: "prompt and sessionId are required" });
  }

  try {
    const stream = await streamChat(prompt, sessionId);

    for await (const chunk of stream) {
      const text = chunk.content?.toString();
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write("event: end\ndata: {}\n\n");
  } catch (err: any) {
    const isAborted = err.name === 'AbortError' || err.message?.includes('abort');

    if (isAborted) {
      console.log(`Stream aborted for session ${sessionId}`);
      if (!res.writableEnded) {
        res.write("event: aborted\ndata: Stream stopped\n\n");
      }
    } else {
      console.error('Streaming error:', err);
      if (!res.writableEnded) {
        res.write(`event: error\ndata: ${JSON.stringify({ message: "Internal server error" })}\n\n`);
      }
    }
  } finally {
    endActiveStream(sessionId);
    res.end();
  }
}

/**
 * Terminates an active streaming session.
 * @param req.params.sessionId - The unique identifier for the stream to kill.
 */
export async function abortStream(req: Request, res: Response) {
  const { sessionId } = req.params;

  if (!sessionId || Array.isArray(sessionId)) {
    res.status(400).json({ error: "A single valid sessionId is required" });
    return;
  }

  stopStream(sessionId);
  res.status(200).json({ message: `Streaming session ${sessionId} aborted` });
}