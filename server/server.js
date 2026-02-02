const express = require("express");
const app = express(); // Initialize express instance
const cors = require("cors");
const { PORT } = require("./constants");
const db = require("./db");

// Enable CORS
const corsOptions = {
  origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON request bodies

// Fetch all students from database
app.get("/api/students", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM students ORDER BY id DESC");
    res.json({ students: result.rows });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});

// Add a new student
app.post("/api/students", async (req, res) => {
  try {
    const { name, points } = req.body;
    const result = await db.query(
      "INSERT INTO students (name, points) VALUES ($1, $2) RETURNING *",
      [name, points]
    );
    console.log('New student added:', result.rows[0]);
    res.json({ student: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to add student" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});