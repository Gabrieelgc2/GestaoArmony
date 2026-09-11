import { formatarDataHora } from "@/utils/DataConfig";
import type { Projeto } from "@/utils/painelPlanejadorConfig";
import { Target } from "lucide-react";

type ProjetoPrazoProps = {
projeto: Projeto;
};

export function ProjetoPrazo({ projeto }: ProjetoPrazoProps) {
    return (
        <section>
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-2 text-[11px] text-emerald-900 flex items-center justify-between">
              <span className="font-semibold flex items-center gap-1">
              <Target size={13} className="text-emerald-700" /> Prazo final:
              </span>
              <span className="font-bold">{formatarDataHora(projeto.data_limite_entrega)}</span>
            </div>
        </section>
    )
};