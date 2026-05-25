import express, { json } from "express";
import { createLetterRouter } from "./routes/letter.js";
import { corsMiddleware } from "./middlewares/cors.js";
import "dotenv/config";

export const createApp = ({ LetterModel }) => {
  const app = express();

  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");

  app.use("/letter", createLetterRouter({ LetterModel }));

  return app;
};
