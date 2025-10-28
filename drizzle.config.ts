// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts", // path to your schema file
  out: "./migrations", // migration output folder
  dialect: "postgresql", // Supabase uses PostgreSQL
  dbCredentials: {
    url: process.env.DATABASE_URL!, //
  },
});
