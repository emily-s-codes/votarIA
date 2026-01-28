import { Router } from "express";

const router = Router();

/**
 * Basic health check endpoint for the server.
 * Returns a 200 OK status to confirm the VotarIA Server is operational.
 * @param {Request} _ - Express request object (unused).
 * @param {Response} res - Express response object.
 */
router.get("", (_, res) => {
  res.status(200).send("VotarIA Server is running");
});

export default router;