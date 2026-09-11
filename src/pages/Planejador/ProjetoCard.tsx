import type { Projeto } from "../../utils/painelPlanejadorConfig";
import type { ProjetoCardActions } from "../../types/projeto-types";
import { obterInspecaoAtual } from "../../utils/projeto.utils";
import { BlocoInspecao } from "./Agendamento/main";
import { BotaoAvancarFase } from "./BotaoAvancarFase";
import { ProjetoResumo } from "./Informacoes/ProjetoResumo";

export function ProjetoCard({ projeto, actions }: { projeto: Projeto; actions: ProjetoCardActions }) {
  const inspecaoAtual = obterInspecaoAtual(projeto);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm hover:shadow transition-all space-y-3 group">
      <ProjetoResumo projeto={projeto} />
      {projeto.status !== "NOVO" && projeto.status !== "PRODUCAO" && (
        <BlocoInspecao projeto={projeto} inspecaoAtual={inspecaoAtual} actions={actions} />
      )
      }
      <BotaoAvancarFase
        projeto={projeto}
        inspecaoAtual={inspecaoAtual}
        salvando={actions.salvandoId === projeto.id}
        onAvancar={actions.onAvancarFase}
      />
    </div>
  );
}