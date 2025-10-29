"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
import { toast } from "sonner";

export function BlogForm() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    categories: [] as string[], // ✅ now an array
    content: "",
  });

  const utils = trpc.useContext();

  const { mutate: createPost, isPending } = trpc.post.create.useMutation({
    onSuccess: () => {
      utils.post.getAll.invalidate();
      toast.success("Blog post created successfully!");
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        categories: [],
        content: "",
      });
    },
    onError: (err) => {
      toast.error(`Failed to create blog: ${err.message}`);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFormData({ ...formData, categories: selected });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.categories.length === 0) {
      toast.error("Please select at least one category!");
      return;
    }

    createPost({
      title: formData.title,
      slug: formData.slug,
      excerpt: formData.excerpt,
      content: formData.content,
      categories: formData.categories, // ✅ now directly array
      published: true,
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">
        Create Blog Post
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-foreground"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="w-full rounded-lg border border-input bg-background px-4 py-2"
          />
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-foreground"
          >
            Blog Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            value={formData.slug}
            onChange={handleChange}
            placeholder="blog-slug-example"
            className="w-full rounded-lg border border-input bg-background px-4 py-2"
          />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <label
            htmlFor="excerpt"
            className="block text-sm font-medium text-foreground"
          >
            Blog Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="A short summary of the blog post"
            className="w-full rounded-lg border border-input bg-background px-4 py-2"
          />
        </div>

        {/* Categories (multi-select) */}
        <div className="space-y-2">
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-foreground"
          >
            Blog Categories (hold Ctrl/Cmd to select multiple)
          </label>
          <select
            id="categories"
            name="categories"
            multiple
            required
            value={formData.categories}
            onChange={handleCategoryChange}
            className="w-full rounded-lg border border-input bg-background px-4 py-2 h-32"
          >
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Business">Business</option>
            <option value="AI">AI</option>
            <option value="Health">Health</option>
          </select>
          <p className="text-sm text-gray-500">
            (Hold Ctrl or Cmd to select multiple)
          </p>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <label
            htmlFor="content"
            className="block text-sm font-medium text-foreground"
          >
            Blog Content
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog post content here"
            className="w-full rounded-lg border border-input bg-background px-4 py-2"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-lg bg-primary px-6 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save Blog"}
          </button>
          <button
            type="button"
            onClick={() =>
              setFormData({
                title: "",
                slug: "",
                excerpt: "",
                categories: [],
                content: "",
              })
            }
            className="rounded-lg border border-input bg-background px-6 py-2 font-medium text-foreground"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
