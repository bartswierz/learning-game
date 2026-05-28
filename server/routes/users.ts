import express, { Request, Response, Router } from "express";
import db from "../db.js"; // DB Connection Pool
const router: Router = express.Router();

interface User {
  id: number;
  email: string;
  password_hash: string;
  created_at?: Date;
}

interface UserIdParams {
  id: string;
}

// GET ALL USERS - Endpoint: "GET /api/users"
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await db.query<User>("SELECT * FROM users ORDER BY id DESC");
    res.json({ users: result.rows });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// GET USER BY ID - Endpoint: "GET /api/users/:id"
router.get("/:id", async (req: Request<UserIdParams>, res: Response) => {
  try {
    const { id } = req.params;
    const result = await db.query<User>("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// DELETE USER BY ID - Endpoint: "DELETE /api/users/:id"
router.delete("/:id", async (req: Request<UserIdParams>, res: Response) => {
  try {
    const { id } = req.params; // Get user ID from URL parameters
    const result = await db.query<User>(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully", user: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

export default router;
