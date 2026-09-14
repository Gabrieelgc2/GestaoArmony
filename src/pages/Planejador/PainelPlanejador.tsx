import { Calendar, LogOut, Plus } from "lucide-react";
import { ProjetoCard } from "./ProjetoCard";
import { ModalCadastroProjeto } from "./ModalCadastroProjeto";
import { FASES_CONFIG } from "../../utils/painelPlanejadorConfig";
import { useAuth } from "@/hooks/useAuth";
import { usePainelPlanejador } from "@/hooks/Planejador/usePainelPlanejador";
import { useNavigate } from "react-router-dom";
export default function PainelPlanejador() {
  const navigate = useNavigate();
  const hook = usePainelPlanejador();
  const { signOut, isLoggingOut } = useAuth();
  const projetoCardActions = {
    inspetores: hook.inspetores,
    datasPrevistas: hook.datasPrevistas,
    setDatasPrevistas: hook.setDatasPrevistas,
    horariosPrevistos: hook.horariosPrevistos,
    setHorariosPrevistos: hook.setHorariosPrevistos,
    inspetoresSelecionados: hook.inspetoresSelecionados,
    setInspetoresSelecionados: hook.setInspetoresSelecionados,
    salvandoId: hook.salvandoId,
    onAgendarInspecao: hook.handleAgendarInspecao,
    onAvancarFase: hook.handleAvancarFase,
    verificarDisponibilidadeInspetor: hook.verificarDisponibilidadeInspetorLocal,
  };

  if (hook.loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] p-4 max-w-[1700px] mx-auto space-y-4">
      <header className="flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-4 rounded-2xl border border-gray-200 shadow-sm shrink-0">
        <div>
          <h1 className="text-xl font-black tracking-tight text-gray-900">Planejamento de Obras</h1>
          <p className="text-xs text-gray-500 mt-0.5">
          Bem-vindo, <span className="font-semibold text-gray-800">{hook.planejadorNome}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-xs bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 font-medium text-gray-600">
            Total de Obras: <span className="font-bold text-gray-900">{hook.projetos.length}</span>
          </div>
          <button
          onClick={() => navigate("/planejador/agenda")}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 active:scale-95 text-xs font-bold rounded-xl border border-indigo-200 transition cursor-pointer shadow-sm shadow-indigo-500/10"
          >
          <Calendar size={16} />
          <span>Acessar agenda</span>
          </button>
          <button
            onClick={() => hook.setModalCriarAberto(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-sm shadow-blue-500/20"
          >
          <Plus size={16} /> Cadastrar Nova Obra
          </button>
          <button
            onClick={signOut}
            disabled={isLoggingOut}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-50 hover:bg-rose-50 text-gray-700 hover:text-rose-600 active:scale-95 text-xs font-bold rounded-xl border border-gray-200 hover:border-rose-200 transition cursor-pointer disabled:opacity-50"
            title="Encerrar Sessão"
          >
            <LogOut size={16} />
            <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
          </button>
        </div>
      </header>

      {/* Kanban Board */}
      <main className="flex-1 flex gap-4 overflow-x-auto pb-2 min-h-0">
        {FASES_CONFIG.map((coluna) => {
          const projetosDaFase = hook.projetos.filter((p) => p.status === coluna.key);
          return (
            <section key={coluna.key} className="flex flex-col w-80 shrink-0 bg-gray-50/70 border border-gray-200/80 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200/80">
                <span className="text-xs font-bold text-gray-800 tracking-wide uppercase">{coluna.label}</span>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                  {projetosDaFase.length}
                </span>
              </div>
              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {projetosDaFase.length === 0 ? (
                  <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl text-[11px] text-gray-400 font-medium">
                    Nenhuma obra nesta etapa
                  </div>
                ) : (
                  projetosDaFase.map((projeto) => (
                    <ProjetoCard
                      key={projeto.id}
                      projeto={projeto}
                      actions={projetoCardActions}
                    />
                  ))
                )}
              </div>
            </section>
          );
        })}
      </main>

      <ModalCadastroProjeto hook={hook} />
    </div>
  );
}