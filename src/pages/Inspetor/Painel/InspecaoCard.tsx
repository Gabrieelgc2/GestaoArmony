import { StatusBadge } from "@/components/StatusBadge";
import { salvarRelatorioMedicao } from "@/services/medicaoService";
import type { GuiaMedicaoCompleta } from "@/types/relatorioMedicao";
import { formatarDataHora, formatarDataSimples } from "@/utils/DataConfig";
import { 
  CheckCircle2, 
  RotateCcw, 
  AlertTriangle, 
  Calendar, 
  MapPin, 
  Phone,
  Target,
  ClipboardList,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { FormularioRelatorioMedicao } from "../Medicao/FormularioMedicao";
export function InspecaoCard({ inspecao, hook }: { inspecao: any; hook: any }) {
  const {
    salvandoId,
    modosRecusa,
    setModosRecusa,
    justificativas,
    setJustificativas,
    previsaoMedicaoData,
    setPrevisaoMedicaoData,
    previsaoMedicaoHora,
    setPrevisaoMedicaoHora,
    handleConfirmarData,
    handleRecusarData,
  } = hook;
  const [expandirGuia, setExpandirGuia] = useState(false);
  const [relatorioEnviado, setRelatorioEnviado] = useState(false);
  const ehFaseMedicao = inspecao.fase === "MEDICAO";
  const podeAvancar = !ehFaseMedicao || relatorioEnviado;
  const handleSalvarRelatorio = async (dadosForm: GuiaMedicaoCompleta) => {
    await salvarRelatorioMedicao({
      ...dadosForm,
      projetoId: inspecao.projects?.id,
      inspecaoId: inspecao.id,
    });
    setRelatorioEnviado(true);
    setExpandirGuia(false);
  }
  const proj = inspecao.projects;
  const estaRecusando = Boolean(modosRecusa[inspecao.id]);
  const dataInsp = inspecao.data_prevista ? new Date(inspecao.data_prevista) : null;
  const agoraTimestamp = Date.now();
  const estaAtrasada = !inspecao.concluido && Boolean(dataInsp && dataInsp.getTime() < agoraTimestamp);
  const dataHoraFormatada = formatarDataHora(inspecao.data_prevista);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* 1. TOPO DA OBRA / IDENTIFICAÇÃO */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-gray-100 pb-3">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-base font-bold text-gray-900">
          {proj?.name_project}
          </h2>
          <StatusBadge concluido={inspecao.concluido} atrasada={estaAtrasada} />
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">
              #{proj?.order_number || "-"}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-gray-400" />
              {proj?.installation_location || "Local não informado"}
            </span>
            <span className="flex items-center gap-1">
              <Phone size={13} className="text-gray-400" />
              {proj?.contato_client || "-"}
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

        {proj?.data_limite_entrega && (
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 shrink-0">
            <Target size={14} className="text-emerald-600 shrink-0" />
            <span>Limite de Entrega: {formatarDataSimples(proj.data_limite_entrega)}</span>
          </div>
        )}
      </div>

      {/* 3. ALERTA DE DEVOLUÇÃO / RECUSA */}
      {inspecao.status_aprovacao === "RECUSADO" && !inspecao.concluido && (
        <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
          <AlertTriangle size={14} /> Devolvido ao Planejador (Aguardando nova data)
          </p>
          <p className="italic">"{inspecao.justificativa}"</p>
        </div>
      )}

      {ehFaseMedicao && !inspecao.concluido && (
        <div className="border-t border-gray-100 pt-3 space-y-3">
          {!relatorioEnviado ? (
            <>
            <button
              type="button"
              onClick={() => setExpandirGuia((prev) => !prev)}
              className="w-full flex items-center justify-between px-4 py-2.5 bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-900 rounded-xl text-xs font-bold transition cursor-pointer"
            >
            <span className="flex items-center gap-2">
              <ClipboardList size={16} className="text-blue-600" />
              {expandirGuia ? "Fechar Guia de Medição" : "Preencher Guia de Medição"}
              </span>
              {expandirGuia ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            {/* FORMULÁRIO QUE APARECE/DESAPARECE */}
            {expandirGuia && (
              <div className="pt-2">
              <FormularioRelatorioMedicao onSalvar={handleSalvarRelatorio} />
              </div>
            )}
            </>
          ) : (
          /* FEEDBACK VISUAL APÓS GRAVAÇÃO */
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600" />
          <span>Guia de medição gravado com sucesso!</span>
          </div>
          )}
          </div>
      )}

      {/* 4. AÇÕES OPERACIONAIS PENDENTES */}
      {!inspecao.concluido && inspecao.status_aprovacao !== "RECUSADO" && (
        <div className="space-y-3 pt-1">
          {inspecao.fase === "INSTRUCAO_OBRA" && !estaRecusando && (
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 space-y-1">
              <label className="block text-xs font-semibold text-blue-900">
              Previsão de Medição (Opcional):
              </label>
              <input
                type="date"
                value={previsaoMedicaoData[inspecao.id] || ""}
                onChange={(e) => setPrevisaoMedicaoData({ ...previsaoMedicaoData, [inspecao.id]: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 text-xs bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="time"
                value={previsaoMedicaoHora[inspecao.id] || ""}
                onChange={(e) => setPrevisaoMedicaoHora({ ...previsaoMedicaoHora, [inspecao.id]: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 text-xs bg-white outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {!estaRecusando ? (
            <div className="space-y-2">
              {ehFaseMedicao && !relatorioEnviado && (
                  <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1.5 rounded-lg w-fit">
                  ⚠️ Preencha e salve a Guia de Medição antes de confirmar.
                  </p>
              )}

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                disabled={salvandoId === inspecao.id || !podeAvancar}
                onClick={() => handleConfirmarData(inspecao)}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm disabled:bg-gray-300"
              >
              <CheckCircle2 size={15} /> Confirmar Data Prevista
              </button>

              <button
                type="button"
                onClick={() => setModosRecusa({ ...modosRecusa, [inspecao.id]: true })}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition cursor-pointer"
              >
                <RotateCcw size={15} /> Reagendar / Justificar
              </button>
            </div>
            </div>
          ) : (
            <div className="bg-rose-50/60 border border-rose-200 p-4 rounded-xl space-y-3">
              <p className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle size={15} /> Justificar Devolução para o Planejador
              </p>
              <input
                type="text"
                placeholder="Informe o motivo da impossibilidade da data..."
                value={justificativas[inspecao.id] || ""}
                onChange={(e) => setJustificativas({ ...justificativas, [inspecao.id]: e.target.value })}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-xs bg-white outline-none focus:ring-2 focus:ring-rose-500"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setModosRecusa({ ...modosRecusa, [inspecao.id]: false })}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Voltar
                </button>
                <button
                  disabled={salvandoId === inspecao.id}
                  onClick={() => handleRecusarData(inspecao)}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition cursor-pointer disabled:bg-gray-300"
                >
                  {salvandoId === inspecao.id ? "Devolvendo..." : "Devolver ao Planejador"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. VISTORIA CONCLUÍDA */}
      {inspecao.concluido && (
        <div className="pt-2 space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 size={16} /> Vistoria realizada em: {formatarDataSimples(inspecao.data_realizada)}
          </div>
        </div>
      )}
    </div>
  );
}