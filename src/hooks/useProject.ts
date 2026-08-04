import { useState, useEffect, useCallback } from "react";
import type { Project } from "@/types/project";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch("https://gestao-armony-backend.onrender.com/projects");

      if (!response.ok) {
        throw new Error("Erro ao buscar projetos");
      }

      const data = await response.json();
      setProjects(data);
    } catch (err: any) {
      setError("Ocorreu um erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);


  return { projects, loading, error, refetch: fetchProjects };
}