import { router, procedure } from "../trpcBase";
import { z } from "zod";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const categoryRouter = router({
  getAll: procedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(categories);
  }),

  create: procedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
        slug: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(categories).values(input);
      return { success: true };
    }),

  delete: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(categories).where(eq(categories.id, input.id));
      return { success: true };
    }),
});
