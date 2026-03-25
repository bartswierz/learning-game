import express from "express";
import db from "../db.js"; // DB Connection Pool
const router = express.Router();

// CREATE NEW USER - Route: "/api/auth/register"
router.post("/register", async (req, res) => {
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

// LOGIN USER - Route: "/api/auth/login"
router.post("/login", async (req, res) => {
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

export default router;
