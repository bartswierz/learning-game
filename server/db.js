import { Pool } from "pg"; // Import pg module for PostgreSQL connection
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// DATABASE CONNECTION
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for NeonDB
  },
});

db.on("error", (err) => {
  console.error("❌ Database error:", err);
});

export default db; // Export the database connection pool for use in other modules
