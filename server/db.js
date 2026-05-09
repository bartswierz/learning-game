import { Pool } from "pg"; // Import pg module for PostgreSQL connection
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

// TODO - move to utils folder after we add JWT authentication and need to verify tokens in multiple places
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
