import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import path from "node:path";

import router from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 3000;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
      cors({
          origin: "http://localhost:5173",
      })
  );
}
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", router);   // api

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));  // Static html

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
});

