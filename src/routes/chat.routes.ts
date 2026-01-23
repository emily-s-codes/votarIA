import { Router } from "express";
import { abortStream, generateStream, updateMessageStream } from "../controllers/chat.controller";
import { sseMiddleware } from "../middleware/sse";

const router = Router();

router.post("/generate-stream", sseMiddleware, generateStream);
router.put("/generate-stream", sseMiddleware, updateMessageStream);
router.delete("/generate-stream/:sessionId", abortStream);

export default router;
