import { Router } from "express";
import LetterController from "../controllers/letter.js";

export const createLetterRouter = ({ LetterModel }) => {
  const letterRouter = Router();

  const letterController = new LetterController({ LetterModel });

  letterRouter.get("/api/letter", letterController.getAll);
  letterRouter.post("/api/letter", letterController.create);

  letterRouter.get("/api/letter:id", letterController.getById);
  letterRouter.put("/api/letter:id", letterController.update);
  letterRouter.delete("/api/letter:id", letterController.delete);

  return letterRouter;
};
