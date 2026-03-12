"use client";
import { useState, useCallback } from "react";
import type { Workflow } from "@/types";

export function useWorkflow() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [activeWorkflow, setActiveWorkflow] = useState<Workflow | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWorkflows = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/workflows");
      if (res.ok) {
        const data = await res.json();
        setWorkflows(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { workflows, activeWorkflow, setActiveWorkflow, isLoading, fetchWorkflows };
}
