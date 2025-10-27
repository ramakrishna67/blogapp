import { notFound } from "next/navigation";

const posts = [
  {
    slug: "ai-future",
    title: "The Future of Artificial Intelligence",
    content: `
Artificial Intelligence (AI) is rapidly changing the world. 
From healthcare to finance, AI-driven solutions are optimizing processes 
and creating new opportunities. However, with great power comes great responsibility. 
Ethical AI development will play a crucial role in ensuring a fair and inclusive future.
    `,
  },
  {
    slug: "nextjs-guide",
    title: "A Beginner’s Guide to Next.js 16",
    content: `
Next.js 16 introduces Turbopack and powerful performance optimizations. 
It simplifies routing, server components, and edge rendering.
If you’re starting with modern web apps, Next.js is one of the best frameworks to learn in 2025.
    `,
  },
  {
    slug: "productivity-hacks",
    title: "Top 5 Productivity Hacks for Developers",
    content: `
1. Use keyboard shortcuts.  
2. Plan your day using the Pomodoro technique.  
3. Automate repetitive tasks.  
4. Keep your workspace distraction-free.  
5. Take regular breaks to recharge your mind.
    `,
  },
];

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  console.log("Fetching post for slug:", slug);
  console.log("Post found:", post);

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-gray-200/60 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">
        <div className="flex gap-2 right-2 top-2 absolute p-2">
          <button className="bg-foreground rounded-2xl px-3 py-1 text-white font-bold cursor-pointer">
            Edit Blog
          </button>
          <button className="bg-red-600 rounded-2xl px-3 py-1 text-white font-bold cursor-pointer">
            Delete Blog
          </button>
        </div>
        <div className="mt-9">
          <hr className="border-t-2 border-black" />
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <article className="prose prose-lg text-foreground whitespace-pre-line leading-relaxed">
            {post.content}
          </article>
        </div>
      </div>
    </main>
  );
}
