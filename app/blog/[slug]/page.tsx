import { notFound } from "next/navigation";
import { allPosts } from "@/data/posts";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = allPosts.find((p) => p.slug === slug);
  console.log("Fetching post for slug:", slug);
  console.log("Post found:", post);

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-gray-200/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold">{`${post.author}'s Blog`}</h2>
        <div className="flex gap-2 right-2 top-2 absolute p-2">
          <Link
            href={`/blog/${post.slug}/edit`}
            className="bg-foreground rounded-2xl px-3 py-1 text-white font-bold cursor-pointer"
          >
            Edit Blog
          </Link>
          <button className="bg-red-600 rounded-2xl px-3 py-1 text-white font-bold cursor-pointer">
            Delete Blog
          </button>
        </div>
        <div className="mt-3">
          <hr className="border-t-2 border-black" />
          <h1 className="text-4xl font-bold mt-4">{post.title}</h1>
          <article className="prose prose-lg text-foreground whitespace-pre-line leading-relaxed">
            {post.content}
          </article>
        </div>
      </div>
    </main>
  );
}
