import express from "express";
import cors from "cors";

/**
 * @constant globalMiddleware
 * @description An array of Express middleware functions applied globally to the application.
 * Includes Cross-Origin Resource Sharing (CORS) configuration with credential support
 * and the standard JSON body parser for incoming requests.
 */
export const globalMiddleware = [
  cors({
    origin: true,
    credentials: true,
  }),
  express.json(),
];