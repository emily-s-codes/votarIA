import express from "express";
import "../config";
import chatRoute from "./routes/chat.routes";
import appRoute from "./routes/app.routes";
import { globalMiddleware } from "./middleware/globalMiddleware";

const app = express();
app.use(globalMiddleware);

// Routes
app.use("/", appRoute)
app.use("/api/chat", chatRoute);

export default app;
