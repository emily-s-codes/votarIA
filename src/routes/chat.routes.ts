import { Router } from "express";
import { abortStream, generateStream, updateMessageStream } from "../controllers/chat.controller";

const router = Router();

router.post("/generate-stream", generateStream);
router.put("/generate-stream", updateMessageStream);
router.delete("/generate-stream/:sessionId", abortStream);

export default router;
