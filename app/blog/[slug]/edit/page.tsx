"use client";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { allPosts } from "@/data/posts";

export default function EditBlogPostPage() {
  const router = useRouter();
  const { slug } = useParams();
  const post = allPosts.find((p) => p.slug === slug);
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState(post?.category.join(", ") || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const handleSave = () => {
    console.log("Saved:", { title, content, category, excerpt });
    alert("Post updated successfully!");
    router.push(`/blog/${slug}`);
  };
  if (!post) {
    return <p className="p-8 text-red-600">Post Not Found!</p>;
  }
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
      <button
        onClick={handleSave}
        className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
      >
        Save Changes
      </button>
    </div>
  );
}
