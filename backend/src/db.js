import { createConnection } from "mysql12/promise";

export const pool = createConnection({
  user: "root",
  password: 1236,
  host: "localhost",
  port: 3306,
});
