import { useNavigate } from "react-router-dom";
import Header from "@/components/ui/Header";
import ProjectPanel from "@/components/project-panel/ProjectPanel";
import { mockProjects } from "@/data/mockProjects";
import type { Project } from "@/types/project";

export default function PainelInstalador() {
  const navigate = useNavigate();

  const handleProjectClick = (_project: Project) => {
    navigate("/detalheprojeto");
  };

  return (
    <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-23 pb-28">
      <Header>Meus Projetos</Header>

      <main className="space-y-6">
        <p className="text-base text-[#737685]">
          Visualize os projetos atribuídos para instalação.
        </p>

        <ProjectPanel
          projects={mockProjects}
          onProjectClick={handleProjectClick}
        />
      </main>
    </div>
  );
}
