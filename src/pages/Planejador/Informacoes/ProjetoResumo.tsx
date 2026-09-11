import { Clock, MapPin, Phone, Target, Factory } from "lucide-react";
import type { Projeto } from "@/utils/painelPlanejadorConfig";
import { formatarDataHora } from "@/utils/DataConfig";

type ProjetoResumoProps = {
  projeto: Projeto;
};

export function ProjetoResumo({ projeto }: ProjetoResumoProps) {
  return (
    <div>
      <div className="flex items-start justify-between gap-1">
        <h2 className="text-sm font-bold text-gray-900 leading-snug">{projeto.name_project}</h2>
        <span className="text-[10px] font-mono font-semibold bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
          #{projeto.order_number || "-"}
        </span>
      </div>

      <div className="mt-2 space-y-1 text-[11px] text-gray-500">
        <p className="flex items-center gap-1.5 truncate">
          <MapPin size={13} className="text-gray-400 shrink-0" />
          <span className="truncate">{projeto.installation_location || "Local não informado"}</span>
        </p>
        <p className="flex items-center gap-1.5 truncate">
          <Phone size={13} className="text-gray-400 shrink-0" />
          <span className="truncate">{projeto.contato_client || "-"}</span>
        </p>
        <p className="flex items-center gap-1.5">
          <Clock size={13} className="text-gray-400 shrink-0" />
          <span>Prazo acordado: {projeto.prazo_acordado_dias ? `${projeto.prazo_acordado_dias} dias` : "-"}</span>
        </p>
        {projeto.data_limite_entrega && (
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-lg p-2 text-[11px] text-emerald-900 flex items-center justify-between">
            <span className="font-semibold flex items-center gap-1">
              <Target size={13} className="text-emerald-700" /> Prazo final:
            </span>
            <span className="font-bold">{formatarDataHora(projeto.data_limite_entrega)}</span>
          </div>
        )}
        {projeto.status === "PRODUCAO" && projeto.data_liberacao_producao && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-2 text-[11px] text-purple-900 space-y-0.5">
            <p className="font-bold flex items-center gap-1">
              <Factory size={13} className="text-purple-700" /> Produção Liberada (+48h):
            </p>
            <p className="font-mono text-[10px] text-purple-700">
              {new Date(projeto.data_liberacao_producao).toLocaleString("pt-BR")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
