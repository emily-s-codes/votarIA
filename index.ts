import "./config.js";
import express from "express";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

// See that server is running
app.get("/", (_, res) => {
  res.status(200).send("VotarIA Server is running");
});

app.listen(PORT, () => console.log("Server runs on Port:", PORT));
