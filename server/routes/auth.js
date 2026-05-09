import express from "express";
import db from "../db.js"; // DB Connection Pool
import bcrypt from "bcrypt"; // For password hashing
const router = express.Router();

/* TODO - implement account creation on our register page on the frontend and connect it to this route. 
 This is a simple implementation without password hashing or validation, which should be added for production use. 
 For bcrypt hashing: import bcrypt from "bcrypt"; const password = 'testpassword'; const hashedPassword = await bcrypt.hash(password, 10); and for validation, you can use a library like Joi or express-validator.
 */
// CREATE NEW USER - Route: "/api/auth/register"
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);
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
