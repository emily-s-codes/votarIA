import { Router } from "express";
import { abortStream, generateStream } from "../controllers/chat.controller";

const router = Router();

router.post("/generate-stream", generateStream);

router.delete("/generate-stream/:sessionId", abortStream);

export default router;
