import { router, procedure } from "../trpcBase";
import { z } from "zod";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const postRouter = router({
  getAll: procedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(posts);
  }),

  create: procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        slug: z.string(),
        excerpt: z.string().optional(),
        published: z.boolean().optional(),
        category: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const now = new Date();

      const data = {
        title: input.title,
        content: input.content,
        slug: input.slug,
        category: input.category ?? [],
        excerpt: input.excerpt ?? input.content.slice(0, 100),
        published: input.published ?? false,
        createdAt: now,
        updatedAt: now,
      };

      await ctx.db.insert(posts).values(data);
      return { success: true };
    }),

  // ✅ 3. Get Single Post by Slug
  getBySlug: procedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      const post = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.slug, input.slug));
      return post[0];
    }),

  update: procedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        content: z.string().optional(),
        slug: z.string().optional(),
        excerpt: z.string().optional(),
        published: z.boolean().optional(),
        category: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(posts)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(posts.id, input.id));

      return { success: true };
    }),

  delete: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(posts).where(eq(posts.id, input.id));
      return { success: true };
    }),
});
