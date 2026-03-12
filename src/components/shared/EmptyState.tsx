import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
      {icon && (
        <div className="mb-4 rounded-full bg-wf-panel-elevated p-4 text-wf-accent">
          {icon}
        </div>
      )}
      <h3 className="mb-2 text-base font-semibold text-wf-text">{title}</h3>
      {description && (
        <p className="mb-6 max-w-sm text-sm text-wf-text-muted">{description}</p>
      )}
      {action && (
        <Button size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
