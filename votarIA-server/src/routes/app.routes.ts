import { Router } from "express";

const router = Router();

/**
 * Server health check endpoint.
 */
router.get("", (_, res) => {
  res.status(200).send("VotarIA Server is running");
});

export default router;