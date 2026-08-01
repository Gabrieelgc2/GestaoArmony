import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building, Handshake, MapPin, Hash, Loader2 } from "lucide-react";
import ButtonConfirm from "@/components/ui/Button/ButtonConfirm";
import {type Project, type ProjectStatus } from "@/types/project";
import StatusFilter from "@/components/StatusFilter";


export default function ProjectTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStatus, setActiveStatus] = useState<ProjectStatus>("NOVO");
  const filteredProjects = projects.filter((p) => p.status === activeStatus);
  const navigate = useNavigate();

  // Chamada da API
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        const response = await fetch("https://gestao-armony-backend.onrender.com/projects");

        if (!response.ok) {
          throw new Error("Erro ao buscar projetos");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err: any) {
        setError(err.message || "Ocorreu um erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // 3. Renderização de Estado de Carregamento (Loading)
  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center gap-2 text-gray-500">
        <Loader2 className="h-6 w-6 animate-spin text-[#003D9B]" />
        <span>Carregando projetos...</span>
      </div>
    );
  }

  // 4. Renderização de Erro
  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center text-red-600">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  // 5. Renderização caso a API retorne um array vazio
  if (projects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        Nenhum projeto encontrado.
      </div>
    );
  }

  return (
    <>
    <div className="p-5 space-y-4">
      <p className="text-lg font-semibold text-[#191C1E]">Painel de projetos</p>
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
              <th className="px-6 py-3 text-right font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((p) => (
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
                <td className="px-3 py-4 text-right">
                  <ButtonConfirm onClick={() => navigate(`/projeto/${p.id}`)}>Confirmar</ButtonConfirm>
                </td>
              </tr>
            ))}
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