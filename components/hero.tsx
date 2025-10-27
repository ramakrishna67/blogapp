import Link from "next/link";

export function HeroSection() {
  return (
    <section className="space-y-6 py-36 text-center">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-foreground sm:text-6xl">
          Welcome to BlogVerse
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Explore web development, technology trends, and building amazing
          digital products.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/blog"
          className="rounded-lg bg-primary px-8 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Read Blog
        </Link>
        <Link
          href="/admin"
          className="rounded-lg border border-input bg-background px-8 py-3 font-medium text-foreground transition-colors hover:bg-muted"
        >
          Admin Dashboard
        </Link>
      </div>
    </section>
  );
}
