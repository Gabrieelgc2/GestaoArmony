import { useNavigate } from "react-router-dom";
import Header from "@/components/ui/Header";
import { mockProjects } from "@/mocks/projects";
import type { Project } from "@/types/project";
import ProjectTable from "@/components/project-panel/ProjectTable";

export default function PainelPlanejador() {
  const navigate = useNavigate();

  const handleProjectClick = (_project: Project) => {
    navigate("/detalheprojeto");
  };

  const handleEditClick = (_project: Project) => {
    navigate("/editarprojeto");
  };


  return (
    <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-23 pb-28">
      <Header>Painel de Projetos</Header>

      <main className="space-y-6">
        <p className="text-base text-[#737685]">
          Gerencie todos os projetos de clientes e acompanhe o andamento de cada obra.
        </p>

        <ProjectTable
        title="Novos"
        projects={mockProjects}
        />

      </main>
    </div>
  );
}
