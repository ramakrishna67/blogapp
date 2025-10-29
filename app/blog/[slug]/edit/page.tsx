"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc/client";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string | undefined;
  const { data: post, isLoading } = trpc.post.getBySlug.useQuery(
    { slug: slug! },
    { enabled: !!slug }
  );
  const utils = trpc.useUtils();
  const updatePost = trpc.post.update.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate(); // refresh cache
      alert("✅ Post updated successfully!");
      router.push(`/blog/${slug}`);
    },
  });

  // Initialize state AFTER post loads
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setExcerpt(post.excerpt);
      setCategory((post.categories ?? []).join(", "));
    }
  }, [post]);

  const handleSave = async () => {
    if (!post?.id) return alert("Post not found!");

    await updatePost.mutateAsync({
      id: post.id,
      slug,
      title,
      content,
      excerpt,
      categories: category.split(",").map((c) => c.trim()),
    });
  };

  if (isLoading) return <p className="p-8 text-gray-600">Loading...</p>;
  if (!post) return <p className="p-8 text-red-600">Post Not Found!</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white/40 rounded-2xl backdrop-blur-md shadow-lg">
      <h1 className="text-3xl font-bold mb-4">Edit Blog Post</h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-4 py-2 px-3 border border-gray-300 rounded-lg"
        placeholder="Title"
      />

      <textarea
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className="w-full mb-4 py-2 px-3 border border-gray-300 rounded-lg h-24"
        placeholder="Excerpt"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full mb-4 py-2 px-3 border border-gray-300 rounded-lg h-48"
        placeholder="Content"
      />

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-4 py-2 px-3 border border-gray-300 rounded-lg"
        placeholder="Categories (comma-separated)"
      />

      <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
      >
        Save Changes
      </button>
    </div>
  );
}
