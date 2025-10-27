export function BlogForm() {
  const isSubmitting = false; // Replace with actual submission state
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-foreground">
        Create Blog Post
      </h1>
      <form
        //   onSubmit={handleSubmit}
        className="space-y-6"
      >
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
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Blog Title"
          />
        </div>
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
            placeholder="blog-slug-example"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
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
            placeholder="A short summary of the blog post"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          ></textarea>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-foreground"
          >
            Blog Category
          </label>
          <select
            id="category"
            name="category"
            required
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select a category</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="business">Business</option>
          </select>
        </div>
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
            placeholder="Write your blog post content here"
            className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          ></textarea>
        </div>
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          >
            {/* {isSubmitting ? "Saving..." : post ? "Update Post" : "Create Post"} */}
            Save Blog
          </button>
          <button
            type="button"
            //   onClick={() => router.back()}
            className="rounded-lg border border-input bg-background px-6 py-2 font-medium text-foreground transition-colors hover:bg-muted"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
