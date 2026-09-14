import { AlertCircle, Calendar, CheckCircle2, UserCheck } from "lucide-react";
import type { Inspecao } from "@/utils/painelPlanejadorConfig";
import { formatarDataHora } from "@/utils/DataConfig";
import { obterNomeInspetor } from "../../../utils/projeto.utils";

type AgendadaProps = {
  inspecao: Inspecao;
};

export function Agendada({ inspecao }: AgendadaProps) {
  const nomeInspetor = obterNomeInspetor(inspecao.profiles);

  return (
    <div className="bg-gray-50 rounded-lg p-2.5 space-y-1.5 text-[11px] border border-gray-100">
      <div className="flex items-center gap-1.5 font-medium text-gray-700">
        <UserCheck size={13} className="text-blue-600" />
        <span className="truncate">{nomeInspetor}</span>
      </div>
      <div className="flex items-center gap-1.5 text-gray-500 text-[10px]">
        <Calendar size={12} />
        <span>Data Prevista: {formatarDataHora(inspecao.data_prevista)}</span>
      </div>
      {inspecao.concluido ? (
        <div className="pt-1">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
            <CheckCircle2 size={11} /> Realizada ({formatarDataHora(inspecao.data_realizada)})
          </span>
        </div>
      ) : (
        <div className="pt-0.5">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
            <AlertCircle size={11} /> Aguardando confirmação do engenheiro
          </span>
        </div>
      )}
    </div>
  );
}