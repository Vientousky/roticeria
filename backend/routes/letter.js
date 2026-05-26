import { Router } from "express";
import LetterController from "../controllers/letter.js";

const wrap = (fn, ctx) => (req, res, next) =>
  Promise.resolve(fn.call(ctx, req, res, next)).catch(next);

export const createLetterRouter = ({ LetterModel }) => {
  const router = Router();
  const controller = new LetterController({ LetterModel });

  router.get("/", wrap(controller.getAll, controller));
  router.post("/", wrap(controller.create, controller));
  router.get("/:id", wrap(controller.getById, controller));
  router.put("/:id", wrap(controller.update, controller));
  router.delete("/:id", wrap(controller.delete, controller));

  return router;
};
