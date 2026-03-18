import { patterns } from "@/lib/patterns";
import { PatternsSidebar } from "@/components/patterns/patterns-sidebar";

export default function PatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      <div className="flex gap-8">
        <PatternsSidebar patterns={patterns} />
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}
