import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface BlogCardProps {
  id: number;
  title: string;
  slug: string;
  content: string;
  category: string[];
  excerpt: string;
}

export function BlogCard({ post }: { post: BlogCardProps }) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.category.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-gray-200 px-3 py-1  text-sm font-medium"
            >
              {cat}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <button
          onClick={() => {
            window.location.href = `/blog/${post.slug}`;
          }}
          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium cursor-pointer hover:bg-primary/90"
        >
          View Post
        </button>
      </CardFooter>
    </Card>
  );
}
