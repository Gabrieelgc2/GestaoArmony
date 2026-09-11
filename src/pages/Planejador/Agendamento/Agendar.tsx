import { Calendar, Clock } from "lucide-react";
import type { FaseKey, Projeto } from "@/utils/painelPlanejadorConfig";
import type { ProjetoCardActions } from "../../../types/projeto-types";

type AgendarProps = {
  projeto: Projeto;
  actions: ProjetoCardActions;
};

export function Agendar({ projeto, actions }: AgendarProps) {
  const faseAtual = projeto.status as FaseKey;
  const dataSelecionada = actions.datasPrevistas[projeto.id];
  const horarioSelecionado = actions.horariosPrevistos[projeto.id];
  const inspetorSelecionado = actions.inspetoresSelecionados[projeto.id];
  const inspetorIndisponivel = Boolean(
    inspetorSelecionado
      && dataSelecionada
      && horarioSelecionado
      && !actions.verificarDisponibilidadeInspetor(inspetorSelecionado, projeto.id, faseAtual),
  );

  return (
    <div className="bg-blue-50/40 rounded-xl p-3 border border-blue-100/80 space-y-2.5">
      <p className="text-[11px] font-bold text-blue-900 tracking-wider uppercase flex items-center gap-1.5">
        <Calendar size={13} className="text-blue-600" />
        Agendar Vistoria
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-gray-600 uppercase tracking-tight">Data</label>
          <input
            type="date"
            value={actions.datasPrevistas[projeto.id] || ""}
            onChange={(event) => actions.setDatasPrevistas((prev) => ({ ...prev, [projeto.id]: event.target.value }))}
            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 outline-none transition shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-gray-600 uppercase tracking-tight flex items-center gap-1">
            <Clock size={11} className="text-gray-500" /> Horário
          </label>
          <input
            type="time"
            value={actions.horariosPrevistos[projeto.id] || ""}
            onChange={(event) => actions.setHorariosPrevistos((prev) => ({ ...prev, [projeto.id]: event.target.value }))}
            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 outline-none transition shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
          />
        </div>
      </div>

      <select
        aria-label="Inspetor responsável"
        value={actions.inspetoresSelecionados[projeto.id] || ""}
        onChange={(event) => actions.setInspetoresSelecionados((prev) => ({ ...prev, [projeto.id]: event.target.value }))}
        className="w-full border border-gray-200 rounded p-1 text-[11px] bg-white outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Selecione o Inspetor...</option>
        {actions.inspetores.map((inspetor) => {
          const disponivel = !dataSelecionada || !horarioSelecionado
            || actions.verificarDisponibilidadeInspetor(inspetor.id, projeto.id, faseAtual);

          return (
            <option key={inspetor.id} value={inspetor.id} disabled={!disponivel}>
              {inspetor.full_name}{!disponivel ? " — Indisponível neste horário" : ""}
            </option>
          );
        })}
      </select>
      {inspetorIndisponivel && (
        <p className="text-[10px] text-rose-700 font-medium">
          O inspetor selecionado já possui uma obra agendada neste horário.
        </p>
      )}
      <button
        disabled={actions.salvandoId === projeto.id || inspetorIndisponivel}
        onClick={() => actions.onAgendarInspecao(projeto.id, faseAtual)}
        className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] rounded transition disabled:bg-gray-300 cursor-pointer"
      >
        {actions.salvandoId === projeto.id ? "Salvando..." : "Confirmar Vistoria"}
      </button>
    </div>
  );
}