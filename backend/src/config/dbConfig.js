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
});

pool
  .connect()
  .then(() => console.log("🟢 Connected to Neon PostgreSQL"))
  .catch((err) => console.error("🔴 Error connecting to Neon:", err));

  pool.on("error", (err, client) => {
    console.error("Unexpected error on idle client", err);
  });

export default pool;
