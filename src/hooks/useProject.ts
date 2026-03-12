"use client";
import { useState, useCallback } from "react";
import type { Project } from "@/types";

export function useProject() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/manuscripts");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { projects, activeProject, setActiveProject, isLoading, fetchProjects };
}
