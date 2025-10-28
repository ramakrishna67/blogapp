"use client";
import { BlogCard } from "@/components/blogCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { allPosts } from "@/data/posts";

export default function BlogPage() {
  const [currPage, setCurrPage] = useState(1);
  const postsPerPage = 3;
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const startIndex = (currPage - 1) * postsPerPage;
  const currentPosts = allPosts.slice(startIndex, startIndex + postsPerPage);

  const handlePageChange = (page: number) => {
    setCurrPage(page);
  };

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Blog Posts</h1>
        <div className="w-fit rounded-2xl bg-gray-300/80 justify-center mx-auto">
          <h1 className="text-2xl px-6 pt-2 font-bold">Recent Posts</h1>
          <div className="mx-auto grid md:grid-cols-3 gap-6 max-w-6xl p-4">
            {allPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="mt-6 w-fit rounded-2xl bg-gray-300/30 justify-center mx-auto m-6">
          <h1 className="text-2xl px-6 pt-2 font-bold">All Posts</h1>
          <div className="mx-auto grid md:grid-cols-3 gap-6 max-w-6xl p-4">
            {currentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
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
      </div>
    </main>
  );
}
