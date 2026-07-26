import { useEffect, useState } from "react";

import ProjectTable from "./Projetos/ProjectTable";
import { projectService } from "@/pages/Planejador/services/projectService";
import type { Project } from "@/types/project";

export default function PainelProjetos() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const data = await projectService.getProjects();
    setProjects(data);
  }

  return (
      <ProjectTable
        projects={projects}
      />
  );
}