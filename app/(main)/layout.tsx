import Link from "next/link";
import { Header } from "@/components/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border/60 py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-6 sm:gap-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <nav className="flex items-center gap-5 text-muted-foreground">
              <Link href="/patterns" className="hover:text-foreground transition-colors">Patterns</Link>
              <Link href="/compose" className="hover:text-foreground transition-colors">Compose</Link>
              <a href="https://ai-sdk.dev" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">AI SDK Docs</a>
              <a href="https://github.com/AkashKumar7902/ai-sdk-patterns" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            </nav>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground/60">
            <p>
              Built with{" "}
              <a href="https://ai-sdk.dev" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">AI SDK</a>
              {" "}&middot;{" "}
              <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">shadcn/ui</a>
              {" "}&middot;{" "}
              <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Next.js</a>
            </p>
            <p>&copy; {new Date().getFullYear()} AI SDK Patterns</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
