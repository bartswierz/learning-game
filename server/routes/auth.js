import express from "express";
import db from "../db.js"; // DB Connection Pool
import bcrypt from "bcrypt"; // For password hashing
import { generateAccessToken } from "../utils/token.js"; // For JWT token generation
const router = express.Router();

// TODO - add Logout route that invalidates the JWT on the client side (e.g., by removing it from localStorage) and optionally on the server side (e.g., by maintaining a blacklist of tokens or using a short expiration time for tokens)
// TODO - add password reset functionality (e.g., by sending a password reset email with a unique token that allows the user to set a new password)
// Note: may be able to skip on refresh token as this is a learning game that likely will only have users on for short periods of time, and if used in school, it would be wise to have it expire so
// CREATE NEW USER - Route: "/api/auth/register"
router.post("/register", async (req, res) => {
  try {
    console.log("inside register route, req.body:", req.body);
    // const { username, password } = req.body;
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("req.body:", req.body);
    console.log("hashed password: ", hashedPassword);

    const result = await db.query(
      "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword],
    );

    console.log("New user registered:", result.rows[0]);

    // Don't send the password hash back to the client
    const { password_hash: _, ...userWithoutPassword } = result.rows[0];
    // res.json({ user: userWithoutPassword });
    const token = await generateAccessToken(userWithoutPassword.id);
    console.log("token created during registration: ", token);
    res.json({
      message: "User registered successfully!",
      user: userWithoutPassword,
      token, // Include JWT token
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// LOGIN USER - Route: "/api/auth/login"
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await db.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare provided password with stored hash

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Don't send the password hash back to the client
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to login user" });
  }
});

export default router;
