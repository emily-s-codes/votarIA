import express from "express";
import cors from "cors";
import "../config";
import chatRoute from "./routes/chat.routes";
import appRoute from "./routes/app.routes";

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
app.use("/", appRoute)
app.use("/api/chat", chatRoute);

export default app;
