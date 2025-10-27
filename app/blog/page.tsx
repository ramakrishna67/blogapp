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

export default function BlogPage() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Blog Posts</h1>
        <div className="w-fit rounded-2xl bg-gray-300/80 justify-center mx-auto">
          <h1 className="text-2xl px-6 pt-2 font-bold">Recent Posts</h1>
          <div className="mx-auto grid md:grid-cols-3 gap-6 max-w-6xl p-4">
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
        <div className="mt-6 w-fit rounded-2xl bg-gray-300/30 justify-center mx-auto m-6">
          <h1 className="text-2xl px-6 pt-2 font-bold">All Posts</h1>
          <div className="mx-auto grid md:grid-cols-3 gap-6 max-w-6xl p-4">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </main>
  );
}
