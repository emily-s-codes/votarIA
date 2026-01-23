import { Router } from "express";
import { abortStream, generateStream } from "../controllers/chat.controller";
import { sseMiddleware } from "../middleware/sse";

const router = Router();

router.post("/generate-stream", sseMiddleware, generateStream);
router.delete("/generate-stream/:sessionId", abortStream);

export default router;
