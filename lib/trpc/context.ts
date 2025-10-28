import { db } from "@/lib/db/drizzle";

export const createContext = async () => ({
  db,
});
export type Context = Awaited<ReturnType<typeof createContext>>;
