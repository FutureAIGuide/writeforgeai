"use client";
import { useState, useCallback } from "react";
import type { BetaRun, BetaPersona } from "@/types";

export function useBetaReader() {
  const [runs, setRuns] = useState<BetaRun[]>([]);
  const [activeRun, setActiveRun] = useState<BetaRun | null>(null);
  const [personas, setPersonas] = useState<BetaPersona[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const fetchRuns = useCallback(async (novelId: string) => {
    const res = await fetch(`/api/beta-reader?novel_id=${novelId}`);
    if (res.ok) {
      const data = await res.json();
      setRuns(data);
    }
  }, []);

  const startRun = useCallback(async (config: Partial<BetaRun>) => {
    setIsRunning(true);
    try {
      const res = await fetch("/api/beta-reader", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        const run = await res.json();
        setRuns((prev) => [run, ...prev]);
        setActiveRun(run);
        return run;
      }
    } finally {
      setIsRunning(false);
    }
  }, []);

  return { runs, activeRun, setActiveRun, personas, isRunning, fetchRuns, startRun };
}
