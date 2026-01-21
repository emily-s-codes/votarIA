import { Router } from "express";
import { generateStream } from "../controllers/chat.controller";

const router = Router();

router.post("/generate-stream", generateStream);

router.get("/", (_, res) => {
  res.status(200).send("VotarIA Server is running");
});

export default router;
