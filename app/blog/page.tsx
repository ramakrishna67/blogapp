"use client";

import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc/client";
import { BlogCard, BlogCardProps } from "@/components/blogCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function BlogPage() {
  // 🧠 State for category filter and pagination
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currPage, setCurrPage] = useState(1);
  const postsPerPage = 3;

  // 🧩 Fetch posts (filtered if category provided)
  const { data: allPosts = [], isLoading } = trpc.post.getAll.useQuery(
    selectedCategory ? { category: selectedCategory } : undefined
  );

  // 🕓 Sort by creation date (descending)
  const sortedPosts = useMemo(() => {
    return [...allPosts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [allPosts]);

  // 📰 Recent posts (top 3)
  const recentPosts = sortedPosts.slice(0, 3);

  // 📄 Pagination logic
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const startIndex = (currPage - 1) * postsPerPage;
  const currentPosts = sortedPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => setCurrPage(page);

  // 🏷️ Collect all unique categories safely
  const allCategories = Array.from(
    new Set(allPosts.flatMap((p: BlogCardProps) => p.categories ?? []))
  );

  if (isLoading) {
    return (
      <main className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">Loading posts...</p>
      </main>
    );
  }

  return (
    <main className="bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground text-center">
          Blog Posts
        </h1>

        {/* 🏷️ Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setCurrPage(1);
            }}
            className={`px-4 py-2 rounded-xl border font-medium transition ${
              selectedCategory === null
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            All
          </button>

          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrPage(1);
              }}
              className={`px-4 py-2 rounded-xl border font-medium transition ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 📰 Recent Posts */}
        {recentPosts.length > 0 && (
          <div className="w-fit rounded-2xl bg-gray-300/80 justify-center mx-auto mb-8">
            <h1 className="text-2xl px-6 pt-2 font-bold">Recent Posts</h1>
            <div className="mx-auto grid md:grid-cols-3 gap-6 max-w-6xl p-4">
              {recentPosts.map((post: BlogCardProps) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* 📚 All / Filtered Posts */}
        <div className="mt-6 w-fit rounded-2xl bg-gray-300/30 justify-center mx-auto m-6">
          <h1 className="text-2xl px-6 pt-2 font-bold text-center">
            {selectedCategory ? `${selectedCategory} Posts` : "All Blog Posts"}
          </h1>

          <div className="mx-auto grid md:grid-cols-3 gap-6 max-w-6xl p-4">
            {currentPosts.length > 0 ? (
              currentPosts.map((post: BlogCardProps) => (
                <BlogCard key={post.id} post={post} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-3 py-6">
                No posts found in this category.
              </p>
            )}
          </div>

          {/* 📑 Pagination */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      currPage > 1 && handlePageChange(currPage - 1)
                    }
                    className={
                      currPage === 1
                        ? "pointer-events-none opacity-50 cursor-pointer"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={currPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className="cursor-pointer"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      currPage < totalPages && handlePageChange(currPage + 1)
                    }
                    className={
                      currPage === totalPages
                        ? "pointer-events-none opacity-50 cursor-pointer"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </main>
  );
}
