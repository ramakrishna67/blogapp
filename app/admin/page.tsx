"use client";
import { BlogForm } from "@/components/blogForm";
import { useState } from "react";
import Link from "next/link";
import { BlogCard } from "@/components/blogCard";

export default function AdminPosts() {
  const [showform, setShowForm] = useState(false);
  return (
    <main className=" bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Manage Blog Posts
            </h1>
            <p className="text-muted-foreground mt-2">
              Admin dashboard for managing blog content.
              <br />
              Create, Read, Update and Delete posts.
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showform);
            }}
            className="rounded-lg cursor-pointer bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {showform ? "Cancel" : "New Post"}
          </button>
        </div>
        {showform && (
          <div className="mb-8">
            <BlogForm />
          </div>
        )}
      </div>
      <div className="w-fit rounded-2xl bg-gray-300/30 justify-center mx-auto mb-5 ">
        <h1 className="text-2xl px-6 pt-2 font-bold">All Posts</h1>
        <div className="mx-auto grid gap-6 max-w-6xl p-4 md:grid-cols-3">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </main>
  );
}
