import { LetterModel } from "../models/db";

export class LetterController {
  constructor({ letterModel }) {
    this.letterModel = letterModel;
  }

  getAll = async (req, res) => {
    const { genre } = req.query;
    const letters = await LetterModel.getAll({ genr });
    res.json(letters);
  };

  getById = async (req, res) => {
    const { id } = req.query;
    const letter = await this.letterModel.getById({ id });
    if (letter) return res.json(letter);
    res
      .status(404)
      .json({ message: "Lamentablemente esta carta no se a encontrado" });
  };

  create = async (req, res) => {
    const result = ValidateLetter(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const newLetter = await this.letterModel.create({ input: result.data });

    res.status(201).json(newLetter);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const result = await this.letterModel.delete({ id });

    if (result === false) {
      return res.status(404).json({ message: "Esta carta no existe" });
    }

    return res.json({ message: "Fue eliminado existozamente" });
  };

  update = async (req, res) => {
    const result = ValidatePartialLetter(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    const { id } = req.params;

    const updateLetter = await this.letterModel.update({
      id,
      input: result.data,
    });

    return res.json(updateLetter);
  };
}
