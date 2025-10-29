import { notFound } from "next/navigation";
import { createCaller } from "@/lib/trpc/server";
import Link from "next/link";
import { DeleteButton } from "@/components/deleteButton";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caller = createCaller();
  const post = await caller.post.getBySlug({ slug });
  console.log("Fetching post for slug:", slug);
  console.log("Post found:", post);

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-gray-200/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold">Blog</h2>
        <div className="flex gap-2 right-2 top-2 absolute p-2">
          <Link
            href={`/blog/${post.slug}/edit`}
            className="bg-foreground rounded-2xl px-3 py-1 text-white font-bold cursor-pointer"
          >
            Edit Blog
          </Link>
          <DeleteButton id={post.id} />
        </div>
        <div className="mt-3">
          <hr className="border-t-2 border-black" />
          <h1 className="text-3xl font-bold mt-4 mb-2">{post.title}</h1>
          <article className="prose prose-lg text-foreground whitespace-pre-line leading-relaxed">
            <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
          </article>
        </div>
      </div>
    </main>
  );
}
