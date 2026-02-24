import { Request, Response, NextFunction } from "express";

/**
 * Configures headers for Server-Sent Events (SSE).
 * Disables caching and NGINX buffering to ensure real-time delivery.
 */
export const sseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); 
  res.flushHeaders();
  next();
};