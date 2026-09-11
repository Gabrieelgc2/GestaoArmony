import type { Projeto } from "@/utils/painelPlanejadorConfig";
import { Factory } from "lucide-react";

type ProjetoProducaoProps = {
    projeto: Projeto;
};

export function ProjetoProducao({ projeto }: ProjetoProducaoProps) {
    return (
        <section>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 text-[11px] text-purple-900 space-y-0.5">
                <p className="font-bold flex items-center gap-1">
                    <Factory size={13} className="text-purple-700" /> Produção Liberada (+48h):
                </p>
                <p className="font-mono text-[10px] text-purple-700">
                    {projeto.data_liberacao_producao
                        ? new Date(projeto.data_liberacao_producao).toLocaleString("pt-BR")
                        : "-"}
                </p>
            </div>
        </section>
    )
}