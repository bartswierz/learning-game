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

// ADD STUDENT to database
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

// DELETE STUDENT BY ID from database
app.delete("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("DELETE FROM students WHERE id = $1", [id]);
    res.json({ message: "Student removed successfully" });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to remove student" });
  }
});

// UPDATE STUDENT POINTS BY ID in database - for future use -- will be used to update points after completing activities
app.put("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { points } = req.body;
    const result = await db.query(
      "UPDATE students SET points = $1 WHERE id = $2 RETURNING *",
      [points, id]
    );
    res.json({ student: result.rows[0] });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to update student points" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});