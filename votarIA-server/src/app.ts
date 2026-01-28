import express from "express";
import "../config";
import chatRoute from "./routes/chat.routes";
import appRoute from "./routes/app.routes";
import { globalMiddleware } from "./middleware/globalMiddleware";

/**
 * The core Express application instance.
 * Configures the middleware pipeline and mounts the primary API and application routes.
 */
const app = express();

/**
 * Initializes and applies the global middleware stack (CORS, JSON parsing, etc.) 
 * to all incoming requests.
 */
app.use(globalMiddleware);

// Routes

/**
 * Mounts the base application routes (e.g., health checks) at the root path.
 */
app.use("/", appRoute);

/**
 * Mounts the chat-specific API routes (streaming and abortion) under the /api/chat namespace.
 */
app.use("/api/chat", chatRoute);

export default app;