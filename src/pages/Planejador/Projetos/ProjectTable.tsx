import ButtonConfirm from "@/components/ui/Button/ButtonConfirm";
import type { Project } from "@/types/project";
import { Building, Handshake, MapPin, Hash } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProjectTableProps {
  projects: Project[];
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const navigate = useNavigate();

  function handleConfirm(project: Project) {
    navigate(`/projeto/${project.id}`);
  }

  return (
    <div className="relative min-h-screen bg-[#F8F9FB] px-4 py-8 sm:px-8 md:px-10 md:pt-23">
      <header className="absolute top-0 left-0 flex h-16 w-full items-center bg-white px-4 sm:px-8 md:px-10 shadow-sm">
        <h1 className="text-xl font-semibold text-[#003D9B] sm:text-2xl">
          Painel de projetos
        </h1>
      </header>

      <main className="mt-12 space-y-6 md:mt-0">
        <p className="text-sm text-[#737685] sm:text-base">
          Gerencie todos os projetos de clientes e acompanhe o andamento de cada obra.
        </p>

        {/* -------------------------------------------------------------
            VERSÃO DESKTOP (Tabela limpa para telas md:)
           ------------------------------------------------------------- */}
        <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
          <table className="w-full text-left border-collapse">
            <thead className="border-b border-[#DFE1E6] bg-slate-50/80 text-xs uppercase tracking-wide text-[#737685]">
              <tr>
                <th className="px-6 py-4 font-semibold">Nome do projeto</th>
                <th className="px-6 py-4 font-semibold">Nº do pedido</th>
                <th className="px-6 py-4 font-semibold">Prazo acordado</th>
                <th className="px-6 py-4 font-semibold">Local de instalação</th>
                <th className="px-6 py-4 font-semibold text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {projects.map((project) => (
                <tr key={project.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#003D9B]">
                        <Building className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-[#191C1E]">
                        {project.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {project.orderNumber}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {project.productiondeadline ?? "-"}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {project.installationLocation ?? "-"}
                  </td>

                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <ButtonConfirm onClick={() => handleConfirm(project)}>
                      Confirmar
                    </ButtonConfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* -------------------------------------------------------------
            VERSÃO MOBILE E TABLET (Cards dinâmicos para telas abaixo de md:)
           ------------------------------------------------------------- */}
        <div className="grid gap-4 md:hidden">
          {projects.map((project) => (
            <div
              key={project.id}
              className="w-full rounded-2xl border border-[#DFE1E6] bg-white p-5 shadow-sm space-y-4"
            >
              
              <div className="flex items-start gap-3 border-b border-gray-100 pb-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#003D9B]">
                  <Building className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#191C1E] truncate">
                    {project.name}
                  </p>
                  <p className="text-xs text-[#737685]">{project.orderNumber}</p>
                </div>
              </div>

              
              <div className="space-y-2.5 text-sm text-[#434654]">
                <div className="flex items-center gap-2">
                  <Handshake className="h-4 w-4 shrink-0 text-[#737685]" />
                  <span>
                    <strong className="font-semibold text-[#737685]">Prazo: </strong>
                    {project.productiondeadline ?? "-"}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 text-[#737685] mt-0.5" />
                  <span className="line-clamp-2">
                    <strong className="font-semibold text-[#737685]">Local: </strong>
                    {project.installationLocation ?? "-"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-[#737685]" />
                  <span>
                    <strong className="font-semibold text-[#737685]">Nº Pedido: </strong>
                    {project.orderNumber}
                  </span>
                </div>
              </div>

              
              <div className="pt-2">
                <ButtonConfirm
                  onClick={() => handleConfirm(project)}
                >
                  Confirmar
                </ButtonConfirm>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}