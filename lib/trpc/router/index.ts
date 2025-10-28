import { router, procedure } from "../trpcBase";
import { postRouter } from "./post";
import { categoryRouter } from "./category";

export const appRouter = router({
  post: postRouter,
  category: categoryRouter,

  healthCheck: procedure.query(async ({ ctx }) => {
    try {
      await ctx.db.execute("SELECT 1"); // Checks DB connection
      return { status: "ok", message: "Database connected successfully 🚀" };
    } catch (error) {
      return { status: "error", message: (error as Error).message };
    }
  }),
});

export type AppRouter = typeof appRouter;
