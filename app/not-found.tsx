import Link from "next/link";
import { Header } from "@/components/header";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-6xl font-bold tracking-tight">404</h1>
        <p className="text-lg text-muted-foreground">
          This page could not be found.
        </p>
        <Link
          href="/"
          className="mt-2 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Go home
        </Link>
      </main>
    </div>
  );
}
