import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.PORT || 5432,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false },
};

export class LetterModel {
  //GET OBTENEMOS TODOS LOS DATOS
  static async getAll({ category }) {
    try {
      if (category) {
        const lowerCaseCategory = category.toLowerCase();

        const categoryResult = await pool.query(
          "SELECT id, name FROM category WHERE LOWER(name) = $1",
          [lowerCaseCategory],
        );

        if (categoryResult.length === 0) return [];

        const categoryId = category.result.rows[0].id;

        const letterResult = await pool.query(
          "SELECT id, title, description, prices, category, poster FROM letters WHERE category = $1",
          [categoryId],
        );
        return letterResult.rows;
      }

      const result = await pool.query(
        "SELECT id, title, description, prices, category, poster FROM letters",
      );

      return result.rows;
    } catch (error) {
      console.error(`Error en getAll:`, error);
      throw error;
    }
  }

  //GET OBTENEMOS LOS DATOS DEL ID
  static async getById(id) {
    try {
      const result = await pool.query(
        "SELECT id, title, description, prices, category, poster FROM letters WHERE id = $1",
        [id],
      );

      if (result.rows.length === 0) return null;

      return result.rows[0];
    } catch (error) {
      console.error("ERROR OCURRIO EN GETBYID:", error);
      throw error;
    }
  }

  //POST CREANDO NUEVA CARTA
  static async create({ title, description, prices, category, poster }) {
    try {
      const result = await pool.query(
        `INSERT INTO letters 
        (title, description, prices, category, poster) 
        VALUES ($1, $2, $3, $4, $5) 
        RETURNING id, title, description, prices, category, poster`,
        [title, description, prices, category, poster],
      );

      return result.rows[0];
    } catch (error) {
      console.error("Error en create:", error);
      throw error;
    }
  }

  //PUT EDITANDO ITEM DE LA CARTA
  static async update(id, { title, description, prices, category, poster }) {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(data)) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }

      if (fields.length === 0) return null;

      values.push(id);

      const query = `UPDATE letters SET ${fields.join(", ")} WHERE id = $${paramCount} RETURNING id, title, description, prices, category, poster`;

      const result = await pool.query(query, values);

      if (result.rows.length === 0) return null;

      return result.rows[0];
    } catch (error) {
      console.error("Error en update:", error);
      throw error;
    }
  }

  //DELETE ELIMIANDO ITEM DE LA CARTA
  static async delete(id) {
    try {
      const result = await pool.query(
        "DELETE FROM letters WHERE id = $1 RETURNING id, title",
        [id],
      );

      if (result.rows.length === 0) return null;

      return result.rows[0];
    } catch (error) {
      console.log("ERROR EN DELETE:", error);
      throw error;
    }
  }
}
