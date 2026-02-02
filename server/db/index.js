const { Pool } = require('pg');
require('dotenv').config();

// Prefer a DATABASE_URL env var, otherwise use individual PG_* vars
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST,
  user: process.env.PGUSER, 
  password: process.env.PGPASSWORD, 
  database: process.env.PGDATABASE,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
  // Do not enable ssl by default; enable in production if required
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
