import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface IllustrationCardProps {
  title: string;
  description: string;
  illustration: ReactNode;
  illustrationHeight?: string;
  className?: string;
  href?: string;
  footer?: ReactNode;
}

export function IllustrationCard({
  title,
  description,
  illustration,
  illustrationHeight = "h-48",
  className,
  href,
  footer,
}: IllustrationCardProps) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group bg-background flex flex-col transition-colors hover:bg-accent/30 rounded-xl border border-border/60 overflow-hidden",
        className
      )}
    >
      <div className={cn("p-6 border-b border-border/20", illustrationHeight)}>
        {illustration}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-base font-semibold text-foreground mb-1.5">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {description}
        </p>
        {footer && <div className="mt-3">{footer}</div>}
      </div>
    </Wrapper>
  );
}

export function IllustrationGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5",
        className
      )}
    >
      {children}
    </div>
  );
}
