import z from "zod";

const letterSchema = z.object({
  title: z.string({
    required_error: "LA CARTA TIENE QUE TENER UN TITULO",
    invalid_type_error: "EL TITULO DEBE SER UN STRING",
  }),

  description: z.string(),

  prices: z.number().int(),

  category: z.string(),

  poster: z.string(),
});

export function validateLetter(input) {
  return letterSchema.safeParse(input);
}

export function validatePartialLetter(input) {
  return letterSchema.partial().safeParse(input);
}
