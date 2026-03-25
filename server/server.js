import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js"; // Import the database connection pool
import usersRouter from "./routes/users.js";

dotenv.config(); // Load environment variables from .env

const app = express(); // Initialize express instance
const PORT = process.env.PORT || 8080;

// ENABLE CORS
const corsOptions = {
  origin: "http://localhost:5173",
};

// MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON request bodies

// ROUTES
app.use("/api/users", usersRouter);

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

// TODO - add a authentication route to create new users and login
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await db.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      [username, password],
    );
    console.log("New user registered:", result.rows[0]);
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// TODO - add a authentication route to login users
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await db.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password],
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to login user" });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
