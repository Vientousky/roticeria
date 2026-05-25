import { validateLetter, validatePartialLetter } from "../schemas/letter.js";

export default class LetterController {
  constructor({ LetterModel }) {
    this.letterModel = LetterModel;
  }

  getAll = async (req, res) => {
    const { genre } = req.query;

    const letters = await this.letterModel.getAll({ genre });

    res.json(letters);
  };

  getById = async (req, res) => {
    const { id } = req.params;

    const letter = await this.letterModel.getById(id);

    if (!letter) {
      return res.status(404).json({
        message: "Lamentablemente esta carta no se ha encontrado",
      });
    }

    res.json(letter);
  };

  create = async (req, res) => {
    const result = validateLetter(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message),
      });
    }

    const newLetter = await this.letterModel.create(result.data);

    res.status(201).json(newLetter);
  };

  update = async (req, res) => {
    const result = validatePartialLetter(req.body);

    if (!result.success) {
      return res.status(400).json({
        error: JSON.parse(result.error.message),
      });
    }

    const { id } = req.params;

    const updatedLetter = await this.letterModel.update(id, result.data);

    if (!updatedLetter) {
      return res.status(404).json({
        message: "Carta no encontrada",
      });
    }

    res.json(updatedLetter);
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const deleted = await this.letterModel.delete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Esta carta no existe",
      });
    }

    res.json({
      message: "Fue eliminado exitosamente",
    });
  };
}
