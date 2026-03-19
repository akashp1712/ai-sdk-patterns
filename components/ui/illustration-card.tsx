import { type ReactNode } from "react";
import { motion } from "motion/react";
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
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Wrapper
        {...wrapperProps}
        className={cn(
          "group bg-background flex flex-col transition-all duration-300 hover:bg-accent/30 rounded-xl border border-border/60 overflow-hidden",
          "hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20",
          "bg-linear-to-br from-white to-gray-50/60 dark:from-gray-900 dark:to-gray-800/60",
          className
        )}
      >
        <div className={cn("p-6 border-b border-border/20", illustrationHeight, "relative overflow-hidden")}>
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {illustration}
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="text-base font-semibold text-foreground mb-1.5 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed flex-1">
            {description}
          </p>
          {footer && <div className="mt-3">{footer}</div>}
        </div>
      </Wrapper>
    </motion.div>
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
