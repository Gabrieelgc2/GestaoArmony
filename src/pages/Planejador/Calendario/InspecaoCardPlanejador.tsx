import { AlertTriangle, Calendar, MapPin, Phone, Target, User } from "lucide-react";
import { StatusBadge } from "../../../components/StatusBadge";
import { formatarDataHora, formatarDataSimples } from "@/utils/DataConfig";

export function InspecaoCardPlanejador({ inspecao }: { inspecao: any }) {
    const agoraTimestamp = Date.now();
    const dataInsp = inspecao.data_prevista ? new Date(inspecao.data_prevista) : null;
    const estaAtrasada = !inspecao.concluido && Boolean(dataInsp && dataInsp.getTime() < agoraTimestamp);
    const dataHoraFormatada = formatarDataHora(inspecao.data_prevista);
    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">

            {/* 1. TOPO DA OBRA / IDENTIFICAÇÃO */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-gray-100 pb-3">
                <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="text-base font-bold text-gray-900">
                            {inspecao.name_project}
                        </h2>
                        <StatusBadge concluido={inspecao.concluido} atrasada={estaAtrasada} />
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
                        <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
                            #{inspecao?.order_number || "-"}
                        </span>
                        <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-gray-400" />
                            {inspecao?.installation_location || "Local não informado"}
                        </span>
                        <span className="flex items-center gap-1">
                            <Phone size={13} className="text-gray-400" />
                            {inspecao?.contato_client || "-"}
                        </span>
                        <span className="flex items-center gap-1">
                            <User size={13} className="text-gray-400" />
                            {inspecao.profiles?.full_name || "-"}
                        </span>
                    </div>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 self-start">
                    Etapa: {inspecao.fase}
                </span>
            </div>

            {/* 2. DATAS, HORÁRIOS E STATUS TEMPORAL */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 p-3 rounded-xl text-xs text-gray-600">
                <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-600 shrink-0" />
                        <span>Data Prevista: <strong className="text-gray-900">{dataHoraFormatada}</strong></span>
                    </div>
                </div>

                {inspecao?.data_limite_entrega && (
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
                        <Target size={14} className="text-emerald-600 shrink-0" />
                        <span>Limite de Entrega: {formatarDataSimples(inspecao.data_limite_entrega)}</span>
                    </div>
                )}

                {/* 3. ALERTA DE DEVOLUÇÃO / RECUSA */}
                {inspecao.status_aprovacao === "RECUSADO" && !inspecao.concluido && (
                    <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800 space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                            <AlertTriangle size={14} /> Devolvido ao Planejador (Aguardando nova data)
                        </p>
                        <p className="italic">"{inspecao.justificativa}"</p>
                    </div>
                )}
            </div>
        </div>
    )
}