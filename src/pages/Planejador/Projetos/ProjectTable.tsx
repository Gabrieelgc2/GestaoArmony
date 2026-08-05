import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building, Handshake, MapPin, Hash, LogOut } from "lucide-react";
import { supabase } from "@/supabaseClient";
import ButtonConfirm from "@/components/ui/Button/ButtonConfirm";
import { type ProjectStatus } from "@/types/project";
import StatusFilter from "@/components/StatusFilter";
import { useAuth } from "@/hooks/useAuth";
import { useProjects } from "@/hooks/useProject";
import { EmptyState, ErrorState, LoadingState } from "@/components/FeedBackStates";
import { formatDate, getCurrentPhaseInfo } from "@/utils/projectStatus";

export default function ProjectTable() {
  const { projects, loading, error, refetch } = useProjects();
  const { signOut, isLoggingOut } = useAuth();
  const [activeStatus, setActiveStatus] = useState<ProjectStatus>("NOVO");
  const filteredProjects = projects.filter((p) => p.status === activeStatus);
  const navigate = useNavigate();
  if (loading) return <LoadingState message="Carregando projetos..." />;
  if (error) return <ErrorState message={error} onRetry={refetch} />;
  if (projects.length === 0) return <EmptyState message="Nenhum projeto encontrado." />;

  return (
    <>
      <div className="p-5 space-y-4">
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-[#191C1E]">Painel de projetos</p>
          <button
            onClick={signOut}
            disabled={isLoggingOut}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-[#003D9B] disabled:opacity-50"
          >
            <LogOut size={18} />
            <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>

          </button>
        </div>
        <StatusFilter
          activeStatus={activeStatus}
          onChangeStatus={(newStatus) => setActiveStatus(newStatus)}
        />
      </div>

      {/* Tabela Desktop */}
      <div className="hidden overflow-x-auto md:block p-5">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-100 text-xs uppercase tracking-wider text-gray-500">
              <th className="px-6 py-3 font-semibold">Projeto</th>
              <th className="px-6 py-3 font-semibold">Nº Pedido</th>
              <th className="px-6 py-3 font-semibold">Prazo de Produção</th>
              <th className="px-6 py-3 font-semibold">Local de Instalação</th>
              <th className="px-6 py-3 font-semibold">Data</th>
              <th className="px-6 py-3 font-semibold">Responsável</th>
              <th className="px-6 py-3 text-right font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((p) => {
              const currentPhase = getCurrentPhaseInfo(p);
              return (
                <tr key={p.id} className="transition hover:bg-slate-50/50 border-b border-gray-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#003D9B]">
                        <Building className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-[#191C1E]">{p.name_project}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.order_number ?? "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{p.production_deadline ?? "-"}</td>
                  <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-600">{p.installation_location ?? "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(currentPhase.date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{currentPhase.responsavel ?? "-"}</td>
                  <td className="px-3 py-4 text-right">
                    <ButtonConfirm onClick={() => navigate(`/projeto/${p.id}`)}>Confirmar</ButtonConfirm>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Versão Mobile */}
      <div className="grid gap-4 md:hidden">
        {filteredProjects.map((p) => (
          <div key={p.id} className="w-full space-y-4 rounded-2xl border border-[#DFE1E6] bg-white p-5 shadow-sm">
            <div className="flex items-start gap-3 border-b border-gray-100 pb-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-[#003D9B]">
                <Building className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-[#191C1E]">{p.name_project}</p>
                <p className="text-xs text-[#737685]">{p.order_number}</p>
              </div>
            </div>
            <div className="space-y-2.5 text-sm text-[#434654]">
              <p><Handshake className="inline h-4 w-4 mr-2 text-[#737685]" /><strong>Prazo: </strong>{p.production_deadline ?? "-"}</p>
              <p><MapPin className="inline h-4 w-4 mr-2 text-[#737685]" /><strong>Local: </strong>{p.installation_location ?? "-"}</p>
              <p><Hash className="inline h-4 w-4 mr-2 text-[#737685]" /><strong>Nº Pedido: </strong>{p.order_number ?? "-"}</p>
            </div>
            <ButtonConfirm onClick={() => navigate(`/projeto/${p.id}`)}>Confirmar</ButtonConfirm>
          </div>
        ))}
      </div>
    </>
  );
}