import { Request, Response, NextFunction } from "express";

/**
 * Middleware to configure HTTP headers for Server-Sent Events (SSE).
 * Sets the necessary headers to maintain a persistent connection, disable caching,
 * and bypass proxy buffering to ensure real-time data delivery.
 * * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 */
export const sseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // Specifically for NGINX to disable buffering
  res.flushHeaders();
  next();
};