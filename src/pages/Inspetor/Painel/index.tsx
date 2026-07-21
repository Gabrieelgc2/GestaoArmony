import { useNavigate } from "react-router-dom";
import Header from "@/components/ui/Header";
import { mockProjects } from "@/mocks/projects";
import type { Project } from "@/types/project";
import ProjectTable from "@/components/project-panel/ProjectTable";

export default function PainelInspetor() {
  const navigate = useNavigate();

  const handleProjectClick = (_project: Project) => {
    navigate("/detalheprojeto");
  };

  return (
    <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-23 pb-28">
      <Header>Projetos para Inspeção</Header>

      <main className="space-y-6">
        <p className="text-base text-[#737685]">
          Acompanhe os projetos que necessitam de inspeção e medição.
        </p>

        <ProjectTable
          title="Novos"
          projects={mockProjects}
        />
      </main>
    </div>
  );
}
