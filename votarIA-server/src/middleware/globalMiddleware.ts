import express from "express";
import cors from "cors";

/**
 * Global middleware configuration.
 * Note: Credentials are enabled for cross-origin session support.
 */
export const globalMiddleware = [
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  }),
  express.json(),
];