import express, { Request, Response, Router } from "express";
import db from "../db.js"; // DB Connection Pool
import bcrypt from "bcrypt"; // For password hashing
import { generateAccessToken } from "../utils/token.js"; // For JWT token generation
import { authMiddleware } from "../middleware/auth.js"; // Auth middleware

interface RegisterBody {
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at?: Date;
}

const router: Router = express.Router();

// TODO - add password reset functionality (e.g., by sending a password reset email with a unique token that allows the user to set a new password)
// Note: may be able to skip on refresh token as this is a learning game that likely will only have users on for short periods of time, and if used in school, it would be wise to have it expire so
// CREATE NEW USER - Endpoint: "POST /api/auth/register"
router.post(
  "/register",
  async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    try {
      const { email, password } = req.body;
      const hashedPassword: string = await bcrypt.hash(password, 10);

      // CHECK BOTH FIELDS ARE FILLED OUT
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      // CHECK IF PASSWORD MEETS MIN. REQUIREMENTS
      if (password.length < 8) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters long" });
      }

      // CHECK DB IF EMAIL IS ALREADY EXISTS
      const existingUser = await db.query<User>(
        "SELECT * FROM users WHERE email = $1",
        [email],
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // ADD NEW USER TO DB
      const result = await db.query<User>(
        "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING *",
        [email, hashedPassword],
      );

      // Don't send the password hash back to the client
      const { password_hash: _, ...userWithoutPassword } = result.rows[0];
      const token: string = await generateAccessToken(userWithoutPassword.id);

      // Set HTTP-only cookie instead of returning token in response body
      res.cookie("token", token, {
        httpOnly: true, // Prevents JavaScript access (XSS protection)
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "lax", // CSRF protection
        maxAge: 3600000, // 1 hour (matches JWT expiration)
      });

      res.status(201).json({
        message: "User registered successfully!",
        user: userWithoutPassword,
      });
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Failed to register user" });
    }
  },
);

// LOGIN USER - Endpoint: "POST /api/auth/login"
router.post(
  "/login",
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    try {
      const { email, password } = req.body;

      const result = await db.query<User>(
        "SELECT * FROM users WHERE email = $1",
        [email],
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      const user: User = result.rows[0];
      const isPasswordValid: boolean = await bcrypt.compare(
        password,
        user.password_hash,
      ); // Compare provided password with stored hash

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      // Don't send the password hash back to the client
      const { password_hash: _, ...userWithoutPassword } = user;

      const token: string = await generateAccessToken(userWithoutPassword.id);

      // Set HTTP-only cookie instead of returning token in response body
      res.cookie("token", token, {
        httpOnly: true, // Prevents JavaScript access (XSS protection)
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
        sameSite: "lax", // CSRF protection
        maxAge: 3600000, // 1 hour (matches JWT expiration)
      });

      res.json({ user: userWithoutPassword });
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Failed to login user" });
    }
  },
);

// LOGOUT USER - Endpoint: "POST /api/auth/logout"
router.post("/logout", (req: Request, res: Response) => {
  // Clear the HTTP-only cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
});

// GET CURRENT USER - Endpoint: "GET /api/auth/me"
// Requires authentication via authMiddleware
router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  try {
    // req.user is set by authMiddleware after token verification
    const result = await db.query<User>(
      "SELECT id, email, created_at FROM users WHERE id = $1",
      [req.user!.id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;
