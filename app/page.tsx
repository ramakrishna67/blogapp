import { HeroSection } from "@/components/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <HeroSection />
      </div>
    </main>
  );
}
