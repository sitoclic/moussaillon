import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 font-semibold transition focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent shadow-[0_6px_0_-1px_var(--accent-strong)] hover:-translate-y-0.5 hover:shadow-[0_8px_0_-1px_var(--accent-strong)] active:translate-y-0.5 active:shadow-[0_3px_0_-1px_var(--accent-strong)]",
  secondary: "border-2 border-fg/80 text-fg hover:bg-fg hover:text-bg",
  ghost: "text-link underline-offset-4 hover:underline",
};

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(base, variants[variant], className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

export function Button({ variant = "primary", className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...rest} />;
}

type LinkProps = React.ComponentProps<typeof Link> & { variant?: Variant };

export function ButtonLink({ variant = "primary", className, ...rest }: LinkProps) {
  return <Link className={buttonClass(variant, className)} {...rest} />;
}
