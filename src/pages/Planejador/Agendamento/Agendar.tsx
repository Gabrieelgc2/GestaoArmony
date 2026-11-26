import { Calendar, Clock } from "lucide-react";
import type { FaseKey, Projeto } from "@/utils/painelPlanejadorConfig";
import type { ProjetoCardActions } from "../../../types/projeto-types";

type AgendarProps = {
  projeto: Projeto;
  actions: ProjetoCardActions;
};

export function Agendar({ projeto, actions }: AgendarProps) {
  const faseAtual = projeto.status as FaseKey;
  const dataSelecionada = actions.datasPrevistas[projeto.hetmo];
  const horarioSelecionado = actions.horariosPrevistos[projeto.hetmo];
  const inspetorSelecionado = actions.engenheirosSelecionados[projeto.hetmo];
  const inspetorIndisponivel = Boolean(
    inspetorSelecionado
      && dataSelecionada
      && horarioSelecionado
      && !actions.verificarDisponibilidadeEngenheiro(inspetorSelecionado, projeto.hetmo, faseAtual),
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
            value={actions.datasPrevistas[projeto.hetmo] || ""}
            onChange={(event) => actions.setDatasPrevistas((prev) => ({ ...prev, [projeto.hetmo]: event.target.value }))}
            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 outline-none transition shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-semibold text-gray-600 uppercase tracking-tight flex items-center gap-1">
            <Clock size={11} className="text-gray-500" /> Horário
          </label>
          <input
            type="time"
            value={actions.horariosPrevistos[projeto.hetmo] || ""}
            onChange={(event) => actions.setHorariosPrevistos((prev) => ({ ...prev, [projeto.hetmo]: event.target.value }))}
            className="w-full bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 outline-none transition shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
          />
        </div>
      </div>

      <select
        aria-label="Inspetor responsável"
        value={actions.engenheirosSelecionados[projeto.hetmo] || ""}
        onChange={(event) => actions.setEngenheirosSelecionados((prev) => ({ ...prev, [projeto.hetmo]: event.target.value }))}
        className="w-full border border-gray-200 rounded p-1 text-[11px] bg-white outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">Selecione o Inspetor...</option>
        {actions.inspetores.map((inspetor) => {
          const disponivel = !dataSelecionada || !horarioSelecionado
            || actions.verificarDisponibilidadeEngenheiro(inspetor.id, projeto.hetmo, faseAtual);
        
          return (
            <option key={inspetor.id} value={inspetor.id} disabled={!disponivel}>
              {inspetor.nome}{!disponivel ? " — Indisponível (intervalo mínimo de 2h)" : ""}
            </option>
          );
        })}
      </select>
      {inspetorIndisponivel && (
        <p className="text-[10px] text-rose-700 font-medium">
          O inspetor selecionado já possui uma vistoria ativa a menos de 2 horas deste horário.
        </p>
      )}
      <button
        disabled={actions.salvandoId === projeto.hetmo || inspetorIndisponivel}
        onClick={() => actions.onAgendarInspecao(projeto.hetmo, faseAtual)}
        className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] rounded transition disabled:bg-gray-300 cursor-pointer"
      >
        {actions.salvandoId === projeto.hetmo ? "Salvando..." : "Confirmar Vistoria"}
      </button>
    </div>
  );
}