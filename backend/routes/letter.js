import { Router } from "express";
import LetterController from "../controllers/letter.js";

export const createLetterRouter = ({ LetterModel }) => {
  const letterRouter = Router();

  const letterController = new LetterController({ LetterModel });

  letterRouter.get("/", letterController.getAll);
  letterRouter.post("/", letterController.create);

  letterRouter.get("/:id", letterController.getById);
  letterRouter.put("/:id", letterController.update);
  letterRouter.delete("/:id", letterController.delete);

  return letterRouter;
};
