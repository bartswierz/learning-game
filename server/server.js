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

app.get("/", async (_, res) => {
  const client = await pool.connect();
  const result = await client.query("SELECT version()");
  client.release();
  const { version } = result.rows[0];
  res.json({ version });
});
// app.listen(PORT, () => {
//   console.log(`V2: Listening to http://localhost:${PORT}`);
// });

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});

// TODO - fetch all users from databse - remove after
app.get("/api/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users ORDER BY id DESC");
    res.json({ users: result.rows });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
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

// TODO - add a route to fetch user data by id
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to fetch user" });
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
