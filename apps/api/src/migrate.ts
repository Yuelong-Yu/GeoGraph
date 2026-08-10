import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import pg from "pg";

const databaseUrl = process.env.DATABASE_URL ?? "postgres://geograph:geograph@localhost:5432/geograph";
const migrationPath = fileURLToPath(new URL("../../../db/migrations/001_initial.sql", import.meta.url));
const sql = await readFile(migrationPath, "utf8");
const pool = new pg.Pool({ connectionString: databaseUrl });

try {
  await pool.query(sql);
  console.log("Database migration completed.");
} finally {
  await pool.end();
}
