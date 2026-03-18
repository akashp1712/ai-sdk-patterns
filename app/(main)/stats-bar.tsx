"use client";

import { NumberTicker } from "@/components/ui/number-ticker";

interface Stat {
  value: number | string;
  label: string;
  prefix?: string;
  suffix?: string;
}

const stats: Stat[] = [
  { value: 8, label: "Patterns" },
  { value: 3, label: "Providers" },
  { value: 6, label: "AI SDK", prefix: "v" },
  { value: 100, label: "Free & OSS", suffix: "%" },
];

export function StatsBar() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-4 gap-6 text-center">
      {stats.map((s) => (
        <div key={s.label}>
          <div className="text-lg font-bold tracking-tight">
            {s.prefix}
            {typeof s.value === "number" ? (
              <NumberTicker value={s.value} delay={0.3} />
            ) : (
              s.value
            )}
            {s.suffix}
          </div>
          <div className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
