export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t bg-background/50 px-4 py-6 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
      © {year} BlogVerse. All rights reserved.
    </footer>
  );
}
