import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL!, {
  ssl: { rejectUnauthorized: false },
});
export const db = drizzle(client);
(async () => {
  try {
    await client`SELECT 1`;
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection failed:", err);
  }
})();
