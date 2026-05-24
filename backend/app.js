import express from "express";
import crypto from "node:crypto";
import letters from "./data.json" assert { type: "json" };
import z from "zod";

const app = express();
app.arguments(app.arguments(express.json()));
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.send("<h1>Bienvenidos al BACKEND DE LA ROTICERIA SANTA RITA<h1/>");
});

//==========================================================
// MOSTRANDO Y FILTRANDO TODOS LOS DATOS POR ?category=value
//==========================================================

app.get("/api/letter/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  const { category } = req.query;
  if (category) {
    const filtered = letter.filter((letter) => {
      return (
        String(letter.category).toLowerCase() === String(category).toLowerCase()
      );
    });
    return res.json(filtered);
  }
  res.json(letters);
});

app.get(`/api/letter/:id`, (req, res) => {
  const { id } = req.params;
  const item = letters.find((letter) => String(letter.id) === String(id));
  if (!item) return res.status(404).json({ error: "Menu no encontrando" });
  res.json(item);
});

//======================================================
// CREANDO ACTUALIZANDO Y ELIMIANDO EL DATO ESPECIFICADO
//======================================================

app.post(`/api/letter/`, (req, res) => {
  const { title, description, category, price, imag } = req.body;
  const letterSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number().int().min(0),
  });

  const newLetter = {
    id: crypto.randomUUID(),
    title,
    description,
    category,
    price,
    img,
  };

  res.status(201).json(newLetter);
});

app.patch("/api/letter/:id", (req, res) => {
  const { id } = req.params;
  const letterIndex = letters.findIndex((letter) => letter.id === id);
});

// app.delete("/api/letter/:id", (req, res) => {
//   res.send("<h1>eliminando un item<h1/>");
// });

const PORT = process.env.PORT ?? 3001;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
