import { cn } from "@/lib/cn";

/** Carte de base : surface claire, bord fin, coin arrondi. */
export function Card({
  className,
  as: Tag = "div",
  ...rest
}: React.HTMLAttributes<HTMLElement> & { as?: "div" | "section" | "article" | "aside" }) {
  return (
    <Tag
      className={cn(
        "border-line bg-surface rounded-2xl border p-5 shadow-[0_1px_0_rgb(var(--shadow)/0.04),0_12px_30px_-18px_rgb(var(--shadow)/0.35)] sm:p-6",
        className,
      )}
      {...rest}
    />
  );
}
