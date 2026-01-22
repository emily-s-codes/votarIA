import { Request, Response } from "express";
import { streamChat } from "../services/chat.service";

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
    console.error(err);
    res.write("event: error\ndata: Streaming error\n\n");
    res.end();
  }
}
