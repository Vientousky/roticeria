import { createApp } from "./app.js";
import { LetterModel } from "./models/db.js";

const app = createApp({ LetterModel });

const PORT = process.env.port ?? 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
