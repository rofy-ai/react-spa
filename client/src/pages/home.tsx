import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
      <p>Start prompting (or editing) to see magic happen :)</p>
      <div className="flex gap-4">
        <Link href="/showcase">
          <Button variant="outline">Component Showcase</Button>
        </Link>
      </div>
    </div>
  );
}
