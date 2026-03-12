import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-wf-accent",
  {
    variants: {
      variant: {
        default: "border-transparent bg-wf-accent text-white shadow",
        secondary: "border-transparent bg-wf-panel-elevated text-wf-text-muted",
        destructive: "border-transparent bg-wf-danger text-white",
        outline: "border-wf-border text-wf-text-muted",
        success: "border-transparent bg-wf-success/20 text-wf-success",
        warning: "border-transparent bg-wf-warning/20 text-wf-warning",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
