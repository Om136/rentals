import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false },
  keepAlive: true,
});

pool.on("error", (err) => {
  // Prevent hard crashes on dropped idle connections.
  console.error("🔴 Unexpected error on idle PostgreSQL client:", err);
});

// Lightweight connectivity check without leaking a checked-out client.
pool
  .query("SELECT 1")
  .then(() => console.log("🟢 Connected to Neon PostgreSQL"))
  .catch((err) => console.error("🔴 Error connecting to Neon:", err));

export default pool;
