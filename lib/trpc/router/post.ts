import { router, procedure } from "../trpcBase";
import { z } from "zod";
import { posts, categories, postCategories } from "@/lib/db/schema";
import { eq, inArray, desc } from "drizzle-orm";

export const postRouter = router({
  // ✅ 1. Get all posts (optionally filtered by category)
  getAll: procedure
    .input(z.object({ category: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      // 1️⃣ Fetch all posts
      let postList = await ctx.db
        .select()
        .from(posts)
        .orderBy(desc(posts.createdAt));

      // 2️⃣ If filter is applied, get only posts in that category
      if (input?.category) {
        const cat = await ctx.db
          .select()
          .from(categories)
          .where(eq(categories.name, input.category))
          .limit(1);

        if (cat.length === 0) return [];

        const categoryId = cat[0].id;
        const postsInCategory = await ctx.db
          .select()
          .from(postCategories)
          .where(eq(postCategories.categoryId, categoryId));

        const postIds = postsInCategory.map((pc) => pc.postId);
        postList = postList.filter((p) => postIds.includes(p.id));
      }

      if (postList.length === 0) return [];

      // 3️⃣ Attach categories for each post
      const postIds = postList.map((p) => p.id);
      const postCatLinks = await ctx.db
        .select()
        .from(postCategories)
        .where(inArray(postCategories.postId, postIds));

      const categoryIds = postCatLinks.map((pc) => pc.categoryId);
      const categoryList = await ctx.db
        .select()
        .from(categories)
        .where(inArray(categories.id, categoryIds));

      const categoriesById = Object.fromEntries(
        categoryList.map((c) => [c.id, c.name])
      );

      const postsWithCategories = postList.map((p) => ({
        ...p,
        categories: postCatLinks
          .filter((pc) => pc.postId === p.id)
          .map((pc) => categoriesById[pc.categoryId]),
      }));

      return postsWithCategories;
    }),

  // ✅ 2. Create a new post with multiple categories
  create: procedure
    .input(
      z.object({
        title: z.string(),
        slug: z.string(),
        content: z.string(),
        excerpt: z.string().optional(),
        published: z.boolean().optional(),
        categories: z.array(z.string()).default([]), // ✅ renamed
      })
    )
    .mutation(async ({ ctx, input }) => {
      const now = new Date();

      // 1️⃣ Insert the new post
      const [insertedPost] = await ctx.db
        .insert(posts)
        .values({
          title: input.title,
          slug: input.slug,
          content: input.content,
          excerpt: input.excerpt ?? input.content.slice(0, 100),
          published: input.published ?? false,
          createdAt: now,
          updatedAt: now,
        })
        .returning({ id: posts.id });

      const postId = insertedPost.id;

      // 2️⃣ Process categories
      if (input.categories && input.categories.length > 0) {
        // Fetch existing categories
        const existing = await ctx.db
          .select()
          .from(categories)
          .where(inArray(categories.name, input.categories));

        const existingNames = existing.map((c) => c.name);
        const newNames = input.categories.filter(
          (n) => !existingNames.includes(n)
        );

        // Insert missing categories
        if (newNames.length > 0) {
          await ctx.db.insert(categories).values(
            newNames.map((name) => ({
              name,
              slug: name.toLowerCase().replace(/\s+/g, "-"),
            }))
          );
        }

        // Fetch all category IDs
        const allCategories = await ctx.db
          .select()
          .from(categories)
          .where(inArray(categories.name, input.categories));

        // Insert relations into postCategories
        await ctx.db.insert(postCategories).values(
          allCategories.map((cat) => ({
            postId,
            categoryId: cat.id,
          }))
        );
      }

      return { success: true, postId };
    }),

  // ✅ 3. Get single post by slug
  getBySlug: procedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const [post] = await ctx.db
        .select()
        .from(posts)
        .where(eq(posts.slug, input.slug));

      if (!post) return null;

      const postCats = await ctx.db
        .select()
        .from(postCategories)
        .where(eq(postCategories.postId, post.id));

      const categoryIds = postCats.map((pc) => pc.categoryId);

      const categoryList = await ctx.db
        .select()
        .from(categories)
        .where(inArray(categories.id, categoryIds));

      return {
        ...post,
        categories: categoryList.map((c) => c.name),
      };
    }),

  // ✅ 4. Update post (optionally update categories)
  update: procedure
    .input(
      z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        content: z.string().optional(),
        excerpt: z.string().optional(),
        published: z.boolean().optional(),
        categories: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, categories: catNames, ...rest } = input;

      // 1️⃣ Update post fields
      await ctx.db
        .update(posts)
        .set({ ...rest, updatedAt: new Date() })
        .where(eq(posts.id, id));

      // 2️⃣ Handle categories if provided
      if (catNames) {
        // Remove old links
        await ctx.db
          .delete(postCategories)
          .where(eq(postCategories.postId, id));

        // Reinsert updated ones
        const existing = await ctx.db
          .select()
          .from(categories)
          .where(inArray(categories.name, catNames));

        const existingNames = existing.map((c) => c.name);
        const newNames = catNames.filter((n) => !existingNames.includes(n));

        if (newNames.length > 0) {
          await ctx.db.insert(categories).values(
            newNames.map((name) => ({
              name,
              slug: name.toLowerCase().replace(/\s+/g, "-"),
            }))
          );
        }

        const allCats = await ctx.db
          .select()
          .from(categories)
          .where(inArray(categories.name, catNames));

        await ctx.db.insert(postCategories).values(
          allCats.map((cat) => ({
            postId: id,
            categoryId: cat.id,
          }))
        );
      }

      return { success: true };
    }),

  // ✅ 5. Delete post (and its category relations)
  delete: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(postCategories)
        .where(eq(postCategories.postId, input.id));
      await ctx.db.delete(posts).where(eq(posts.id, input.id));
      return { success: true };
    }),
});
