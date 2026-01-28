import { Router } from "express";
import { abortStream, generateStream } from "../controllers/chat.controller";
import { sseMiddleware } from "../middleware/sse";

const router = Router();

/**
 * Route to initiate a Server-Sent Events (SSE) stream for AI chat responses.
 * Applies sseMiddleware to set appropriate headers before invoking the generator.
 * @name post/generate-stream
 * @function
 * @memberof module:routers/chat
 * @inner
 */
router.post("/generate-stream", sseMiddleware, generateStream);

/**
 * Route to abort an active AI stream for a specific session.
 * @name delete/generate-stream/:sessionId
 * @function
 * @memberof module:routers/chat
 * @inner
 * @param {string} sessionId - The unique identifier of the session to terminate.
 */
router.delete("/generate-stream/:sessionId", abortStream);

export default router;