"use client";

import { BlogForm } from "@/components/blogForm";
import { useState } from "react";
import { BlogCard } from "@/components/blogCard";
import { trpc } from "@/lib/trpc/client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AdminPosts() {
  const [showform, setShowForm] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const postsPerPage = 3;

  const { data: allPosts = [], isLoading } = trpc.post.getAll.useQuery();

  if (isLoading) {
    return (
      <main className="bg-background flex justify-center items-center h-screen">
        <p className="text-lg text-muted-foreground">Loading posts...</p>
      </main>
    );
  }

  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currPage - 1) * postsPerPage;
  const currentPosts = allPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => setCurrPage(page);

  return (
    <main className="bg-background">
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
            onClick={() => setShowForm(!showform)}
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
          {currentPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={{ ...post, category: post.category ?? [] }}
            />
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => currPage > 1 && handlePageChange(currPage - 1)}
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
      </div>
    </main>
  );
}
