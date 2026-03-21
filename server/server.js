import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg"; // Import pg module for PostgreSQL connection
const app = express(); // Initialize express instance

// Enable CORS
const corsOptions = {
  origin: "http://localhost:5173",
};

// ✅ CREATE DATABASE CONNECTION POOL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for NeonDB
  },
});

// Test connection
pool.on("connect", () => {
  console.log("✅ Connected to NeonDB");
});

pool.on("error", (err) => {
  console.error("❌ Database error:", err);
});

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON request bodies
dotenv.config();
const PORT = process.env.PORT || 8080;

// function logger(req, res, next) {
//   console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
//   next()
// }

// app.use(logger);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

app.get("/api/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users ORDER BY id DESC");
    res.json({ users: result.rows });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Old local postgres connection
// Fetch all students from database
// app.get("/api/students", async (req, res) => {
//   try {
//     const result = await db.query("SELECT * FROM students ORDER BY id DESC");
//     res.json({ students: result.rows });
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: "Failed to fetch students" });
//   }
// });

// // ADD STUDENT to database
// app.post("/api/students", async (req, res) => {
//   try {
//     const { name, points } = req.body;
//     const result = await db.query(
//       "INSERT INTO students (name, points) VALUES ($1, $2) RETURNING *",
//       [name, points],
//     );
//     console.log("New student added:", result.rows[0]);
//     res.json({ student: result.rows[0] });
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: "Failed to add student" });
//   }
// });

// // DELETE STUDENT BY ID from database
// app.delete("/api/students/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     await db.query("DELETE FROM students WHERE id = $1", [id]);
//     res.json({ message: "Student removed successfully" });
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: "Failed to remove student" });
//   }
// });

// // UPDATE STUDENT POINTS BY ID in database - for future use -- will be used to update points after completing activities
// app.put("/api/students/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { points } = req.body;
//     const result = await db.query(
//       "UPDATE students SET points = $1 WHERE id = $2 RETURNING *",
//       [points, id],
//     );
//     res.json({ student: result.rows[0] });
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: "Failed to update student points" });
//   }
// });
