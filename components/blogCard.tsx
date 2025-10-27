import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

export function BlogCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Blog Post Title</CardTitle>
      </CardHeader>
      <CardContent>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni
        voluptatem animi, eveniet numquam suscipit accusantium fugit repudiandae
        iusto quos, ad, ipsam laboriosam illo est non odio asperiores pariatur
        fugiat voluptatibus.
      </CardContent>
      <CardFooter>
        <button className="rounded-lg bg-primary text-primary-foreground px-4 py-2 font-medium cursor-pointer hover:bg-primary/90">
          View Post
        </button>
      </CardFooter>
    </Card>
  );
}
