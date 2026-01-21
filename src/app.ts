import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRoute from "./routes/chat.routes";

dotenv.config();

const commonMiddleware = [
  cors({
    origin: true,
    credentials: true,
  }),
  express.json(),
];

const app = express();
app.use(commonMiddleware);

// Routes
app.use("/api/chat", chatRoute);

export default app;
