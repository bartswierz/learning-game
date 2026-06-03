import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";

dotenv.config(); // Load environment variables from .env

interface ErrorWithStatus extends Error {
  status?: number;
}

const app = express(); // Initialize express instance
const PORT: number = parseInt(process.env.PORT || "8080", 10);

// ENABLE CORS
const corsOptions = {
  origin: "http://localhost:5173",
};

// MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON request bodies

// ROUTES
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);

// ERROR HANDLING MIDDLEWARE
app.use((err: ErrorWithStatus, req: any, res: any, next: any) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
