import { Router } from "express";
import { generateStream } from "../controllers/chat.controller";

const router = Router();

router.post("/generate-stream", generateStream);

export default router;
