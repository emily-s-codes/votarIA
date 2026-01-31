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

app.use(globalMiddleware);

// --- Routes ---

app.use("/", appRoute);

/** Chat API namespace: streaming and session management. */
app.use("/api/chat", chatRoute);

export default app;