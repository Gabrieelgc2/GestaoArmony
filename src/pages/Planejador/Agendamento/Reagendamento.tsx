import { AlertTriangle } from "lucide-react";
import type { FaseKey, Inspecao, Projeto } from "@/utils/painelPlanejadorConfig";
import type { ProjetoCardActions } from "../../../types/projeto-types";

type ReagendamentoProps = {
  projeto: Projeto;
  inspecao: Inspecao;
  actions: ProjetoCardActions;
};

export function Reagendamento({ projeto, inspecao, actions }: ReagendamentoProps) {
  const faseAtual = projeto.status as FaseKey;
  const dataSelecionada = actions.datasPrevistas[projeto.id];
  const horarioSelecionado = actions.horariosPrevistos[projeto.id];
  const inspetorIndisponivel = Boolean(
    inspecao.inspetor_id
      && dataSelecionada
      && horarioSelecionado
      && !actions.verificarDisponibilidadeInspetor(inspecao.inspetor_id, projeto.id, faseAtual),
  );

  return (
    <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 space-y-2 text-[11px]">
      <div className="flex items-center gap-1.5 font-bold text-rose-800">
        <AlertTriangle size={13} className="shrink-0" />
        <span>Reagendamento Solicitado</span>
      </div>
      <p className="text-[10px] text-rose-700 italic bg-white/70 p-1.5 rounded border border-rose-100">
        "{inspecao.justificativa || "Sem justificativa informada."}"
      </p>
      <div className="space-y-1.5 pt-1">
        <label className="block text-[10px] font-bold uppercase text-gray-700">Definir Nova Data:</label>
        <input
          type="date"
          value={actions.datasPrevistas[projeto.id] || ""}
          onChange={(event) => actions.setDatasPrevistas((prev) => ({ ...prev, [projeto.id]: event.target.value }))}
          className="w-full border border-rose-200 rounded p-1 text-[11px] bg-white outline-none focus:ring-1 focus:ring-rose-500"
        />
        <label className="text-[11px] font-semibold text-gray-700">Horário</label>
        <input
          type="time"
          aria-label="Horário do reagendamento"
          value={actions.horariosPrevistos[projeto.id] || ""}
          onChange={(event) => actions.setHorariosPrevistos((prev) => ({ ...prev, [projeto.id]: event.target.value }))}
          className="border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-gray-900 bg-white"
        />
        {inspetorIndisponivel && (
          <p className="text-[10px] text-rose-700 font-medium">
            O inspetor responsável já possui vistoria Pendente ou Atrasada neste horário.
          </p>
        )}
        <button
          disabled={
            actions.salvandoId === projeto.id
            || !dataSelecionada
            || !horarioSelecionado
            || inspetorIndisponivel
          }
          onClick={() => actions.onAgendarInspecao(projeto.id, faseAtual)}
          className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] rounded transition disabled:bg-gray-300 cursor-pointer"
        >
          {actions.salvandoId === projeto.id ? "Reagendando..." : "Reenviar Nova Data"}
        </button>
      </div>
    </div>
  );
}