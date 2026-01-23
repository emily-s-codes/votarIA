import express from "express";
import cors from "cors";

export const globalMiddleware = [
  cors({
    origin: true,
    credentials: true,
  }),
  express.json(),
];