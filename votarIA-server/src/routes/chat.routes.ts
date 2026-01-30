import { Router } from "express";
import { abortStream, generateStream } from "../controllers/chat.controller";
import { sseMiddleware } from "../middleware/sse";

const router = Router();

/**
 * Initiates an AI chat response via Server-Sent Events.
 */
router.post("/generate-stream", sseMiddleware, generateStream);

/**
 * Aborts an active streaming session.
 */
router.delete("/generate-stream/:sessionId", abortStream);

export default router;