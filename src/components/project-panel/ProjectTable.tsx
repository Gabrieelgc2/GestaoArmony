import Card from "@/components/ui/Card/Card";
import type { Project } from "@/types/project";
import {
  House,
  Hash,
  Ruler,
  MapPin,
} from "lucide-react";
import ButtonConfirm from "../ui/Button/ButtonConfirm";
import { useSchedulingModals } from "@/hooks/useSchedulingModals";
import SchedulingModals from "../ui/Modal/SchedulingModals";
import { useState } from "react";

interface ProjectTableProps {
  title: string;
  projects: Project[];
}

export default function ProjectTable({
  title,
  projects,
}: ProjectTableProps) {

  const schedulingModals = useSchedulingModals();
  const { openConfirmModal } = schedulingModals;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleConfirm = (project: Project) => {
    setSelectedProject(project);
    openConfirmModal();
  };


  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-[#DFE1E6] bg-[#F8F9FB] px-6 py-4">
        <h2 className="text-lg font-semibold text-[#191C1E]">
          {title} ({projects.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[400px]">
          <thead>
          <tr className="border-b border-[#DFE1E6] bg-white text-left text-sm font-semibold text-[#737685]">
            <th className="px-6 py-4">
              <div className="flex items-center gap-2">
                <House size={16} />
                <span>Nome do projeto</span>
              </div>
            </th>

            <th className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Hash size={16} />
                <span>Nº do pedido</span>
              </div>
            </th>

            <th className="px-6 py-4">
              <div className="flex items-center gap-2">
                <Ruler size={16} />
                <span>Prazo acordado</span>
              </div>
            </th>

            <th className="px-6 py-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Local de instalação</span>
              </div>
            </th>
            <th className="px-6 py-4">
              <div className="flex items-center gap-2">
                <span>Ação</span>
              </div>
            </th>
          </tr>
          </thead>

          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-8 text-center text-sm text-[#737685]"
                >
                  Nenhum projeto encontrado.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-[#DFE1E6] last:border-b-0 hover:bg-slate-50"
                >
                  <td className="px-6 py-4">{project.name}</td>
                  <td className="px-6 py-4">{project.orderNumber}</td>
                  <td className="px-6 py-4">{project.productiondeadline}</td>
                  <td className="px-6 py-4">
                    {project.installationLocation}
                  </td>
                  <td className="px-6 py-4">

                    <ButtonConfirm
                      onClick={() => handleConfirm(project)}
                    >
                      Confirmar
                    </ButtonConfirm>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <SchedulingModals 
        modals={schedulingModals}
        project={selectedProject}  />
      </div>
    </Card>
  );
}