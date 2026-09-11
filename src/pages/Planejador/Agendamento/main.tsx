import type { Inspecao, Projeto } from "@/utils/painelPlanejadorConfig";
import type { ProjetoCardActions } from "../../../types/projeto-types";
import { inspecaoFoiRecusada } from "../../../utils/projeto.utils";
import { Agendar } from "./Agendar";
import { Agendada } from "./Agendada";
import { Reagendamento } from "./Reagendamento";

type BlocoInspecaoProps = {
  projeto: Projeto;
  inspecaoAtual?: Inspecao;
  actions: ProjetoCardActions;
};

export function BlocoInspecao({ projeto, inspecaoAtual, actions }: BlocoInspecaoProps) {
  return (
    <div className="pt-2 border-t border-gray-100">
      {inspecaoFoiRecusada(inspecaoAtual) ? (
        <Reagendamento projeto={projeto} inspecao={inspecaoAtual!} actions={actions} />
      ) : inspecaoAtual ? (
        <Agendada inspecao={inspecaoAtual} />
      ) : (
        <Agendar projeto={projeto} actions={actions} />
      )}
    </div>
  );
}
