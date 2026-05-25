import express, { json } from "express";
import { createLetterRouter } from "./routes/letter.js";
import { corsMiddleware } from "./middlewares/cors.js";

export const createApp = ({ LetterModel }) => {
  const app = express();

  app.use(json());
  app.use(corsMiddleware());
  app.disable("x-powered-by");

  app.use("/letter", createLetterRouter({ LetterModel }));
  const PORT = process.env.PORT ?? 8080;

  app.listen(PORT, () => {
    console.log(
      "BIENVENIDOOOOOOOOO AL BACKEND DE LA ROTICERIA ANDATE DE AQUI NO PERTENECES",
    );
  });
};
