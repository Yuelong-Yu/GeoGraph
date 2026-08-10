import pg from "pg";
import { createApp } from "./app.js";
import { loadDemoData } from "./demo-data.js";
import { MemoryWorldRepository } from "./repositories/memory.js";
import { HistoricalGeoJsonRepository } from "./repositories/historical-geojson.js";
import { PostgresWorldRepository } from "./repositories/postgres.js";

const databaseUrl = process.env.DATABASE_URL ?? "postgres://geograph:geograph@localhost:5432/geograph";
const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? "0.0.0.0";
const pool = new pg.Pool({ connectionString: databaseUrl });
const demoMode = process.env.DEMO_MODE === "1";
const demoData = demoMode ? await loadDemoData() : null;
const repository = demoMode
  ? process.env.DEMO_HISTORY === "0"
    ? new MemoryWorldRepository(demoData!)
    : await HistoricalGeoJsonRepository.create(demoData!)
  : new PostgresWorldRepository(pool);
const app = createApp({ repository });

async function shutdown() {
  await app.close();
  if (!demoMode) await pool.end();
}

process.on("SIGINT", () => void shutdown());
process.on("SIGTERM", () => void shutdown());

await app.listen({ port, host });
