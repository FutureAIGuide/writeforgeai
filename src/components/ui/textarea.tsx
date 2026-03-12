import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-wf-border bg-wf-panel-elevated px-3 py-2 text-sm text-wf-text shadow-sm placeholder:text-wf-text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-wf-accent disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };
