import { Router } from "express";
import LetterController from "../controllers/letter";

export const createLetterRouter = ({ LetterController }) => {
  const letterRouter = Router();

  const letterController = new LetterController({ letterModel });

  letterRouter.get("/", letterController.getAll);
  letterRouter.post("/", letterController.create);

  letterRouter.get("/:id", letterController.getById);
  letterRouter.put("/:id", letterController.update);
  letterRouter.deleete("/:id", letterController.deleete);

  return letterRouter;
};
