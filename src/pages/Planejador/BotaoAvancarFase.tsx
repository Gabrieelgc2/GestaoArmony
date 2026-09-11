import { ArrowRight } from "lucide-react";
import type { Inspecao, Projeto } from "@/utils/painelPlanejadorConfig";
import { projetoPodeAvancar } from "../../utils/projeto.utils";

type BotaoAvancarFaseProps = {
  projeto: Projeto;
  inspecaoAtual?: Inspecao;
  salvando: boolean;
  onAvancar: (projeto: Projeto) => Promise<void>;
};

export function BotaoAvancarFase({ projeto, inspecaoAtual, salvando, onAvancar }: BotaoAvancarFaseProps) {
  const podeAvancar = projetoPodeAvancar(projeto, inspecaoAtual);

  if (inspecaoAtual?.concluido) {
    return null;
  }

  return (
    <div className="pt-1">
      <button
        disabled={!podeAvancar || salvando}
        onClick={() => onAvancar(projeto)}
        className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${podeAvancar
          ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm"
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
      >
        {projeto.status === "NOVO" ? "Iniciar Obra" : "Avançar Etapa"}
        <ArrowRight size={13} />
      </button>
    </div>
  );
}
