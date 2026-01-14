import express from "express"
import dotenv from "dotenv"
import cors from "cors";

import router from "./routes/notesRoutes.js";
import {connectDB} from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT ?? 3000;

// middleware
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
});

