import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // --- BASE + FOCUS + ARIA INVALID STYLING ---
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[var(--primary-bg)] focus-visible:ring-[3px] focus-visible:ring-opacity-50 focus-visible:ring-offset-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // --- 1. PRIMARY BUTTON (Default) ---
        // Uses: #C8EE44 (BG) / #1B212D (Text)
        default:
          "bg-[var(--primary-bg)] text-[var(--primary-fg)] hover:opacity-90",

        // --- 2. SECONDARY BUTTON ---
        // Uses: #EEFEF2 (BG) / #29A073 (Text) - Switches in dark mode
        secondary:
          "bg-[var(--secondary-bg)] text-[var(--secondary-fg)] hover:opacity-90",

        // --- 3. SUCCESS (For Paid Status) ---
        // Uses: #D9FFE9 (BG) / #27AE60 (Text) - Switches in dark mode
        success:
          "bg-[var(--success-bg)] text-[var(--success-fg)] hover:opacity-90",

        // --- 4. WARNING (For Unpaid Status) ---
        // Uses: #FFF1E5 (BG) / #F2994A (Text) - Switches in dark mode
        warning:
          "bg-[var(--warning-bg)] text-[var(--warning-fg)] hover:opacity-90",

        // --- DESTRUCTIVE (Kept for delete actions) ---
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",

        // --- OUTLINE (Kept, but ensures border uses a custom text color) ---
        outline:
          "border border-[var(--text-secondary)] bg-transparent text-[var(--text-primary)] shadow-xs hover:bg-[var(--secondary-bg)] dark:hover:bg-[var(--secondary-bg)] dark:hover:text-[var(--secondary-fg)]",

        // --- GHOST & LINK (Minimal changes) ---
        ghost:
          "text-[var(--text-primary)] hover:bg-[var(--secondary-bg)] hover:text-[var(--secondary-fg)] dark:hover:bg-accent/50",
        link: "text-[var(--primary-fg)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
