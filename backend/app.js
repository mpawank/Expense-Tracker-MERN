import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// load .env from config folder before anything else
dotenv.config({ path: path.join(__dirname, "config", ".env") });

import express from "express";
import cors from "cors";
import userRouter from "./Routers/userRouter.js";
import transactionRouter from "./Routers/Transactions.js";

// quick debug output (mask sensitive parts)
console.log("PORT:", process.env.PORT || "[not set]");
console.log("MONGO_URL set?", !!process.env.MONGO_URL);
console.log("GEMINI_API_KEY set?", !!process.env.GEMINI_API_KEY);

// ensure middlewares and routes are registered BEFORE handlers that use env/db

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/v1", transactionRouter);
app.get('/health', (req, res) => res.json({ ok: true }));

// start DB after dotenv loaded
import { connectDB } from "./DB/Database.js";

(async () => {
  if (!process.env.MONGO_URL) {
    console.error("ERROR: MONGO_URL missing. Check config/.env and dotenv path.");
    process.exit(1);
  }
  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
})();
