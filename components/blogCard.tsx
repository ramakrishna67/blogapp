import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export interface BlogCardProps {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  published?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  categories?: string[]; // ✅ fixed name (matches backend)
}

export function BlogCard({ post }: { post: BlogCardProps }) {
  return (
    <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition">
      <CardHeader>
        <CardTitle className="text-xl font-semibold line-clamp-1">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 line-clamp-3">{post.excerpt}</p>

        {/* 🏷️ Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium"
              >
                {cat}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <button
          onClick={() => {
            window.location.href = `/blog/${post.slug}`;
          }}
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium cursor-pointer hover:bg-primary/90 transition"
        >
          View Post
        </button>
      </CardFooter>
    </Card>
  );
}
