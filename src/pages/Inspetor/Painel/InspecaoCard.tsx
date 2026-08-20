import { CheckCircle2, RotateCcw, AlertTriangle, Calendar, MapPin, Phone, Factory, Target } from "lucide-react";

const fmt = (d?: string | null) => d ? new Date(d).toLocaleDateString("pt-BR", { timeZone: "UTC" }) : "-";

export function InspecaoCard({ inspecao, hook }: { inspecao: any; hook: any }) {
  const {salvandoId, modosRecusa, setModosRecusa, justificativas, setJustificativas, previsaoMedicao, setPrevisaoMedicao, handleConfirmarData, handleRecusarData, handleLiberarProducao } = hook;
  const proj = inspecao.projects;
  const estaRecusando = modosRecusa[inspecao.id];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Topo da Obra */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-gray-100 pb-3">
        <div>
          <h2 className="text-base font-bold text-gray-900">{proj?.name_project}</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mt-1">
            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">#{proj?.order_number || "-"}</span>
            <span className="flex items-center gap-1"><MapPin size={13} className="text-gray-400" />{proj?.installation_location || "Local não informado"}</span>
            <span className="flex items-center gap-1"><Phone size={13} className="text-gray-400" />{proj?.contato_client || "-"}</span>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 self-start">Etapa: {inspecao.fase}</span>
      </div>

      {/* Datas e Prazos */}
      <div className="flex flex-wrap items-center gap-4 bg-gray-50 p-3 rounded-xl text-xs text-gray-600">
        <div className="flex items-center gap-1.5 font-medium">
          <Calendar size={14} className="text-blue-600" />
          <span>Data Prevista: <strong className="text-gray-900">{fmt(inspecao.data_prevista)}</strong></span>
        </div>
        {proj?.data_limite_entrega && (
          <div className="flex items-center gap-1.5 text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            <Target size={14} className="text-emerald-600" />
            <span>Limite de Entrega: {fmt(proj.data_limite_entrega)}</span>
          </div>
        )}
      </div>

      {/* Recusado */}
      {inspecao.status_aprovacao === "RECUSADO" && !inspecao.concluido && (
        <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800 space-y-1">
          <p className="font-bold flex items-center gap-1.5"><AlertTriangle size={14} /> Devolvido ao Planejador (Aguardando nova data)</p>
          <p className="italic">"{inspecao.justificativa}"</p>
        </div>
      )}

      {/* Ações Pendentes */}
      {!inspecao.concluido && inspecao.status_aprovacao !== "RECUSADO" && (
        <div className="space-y-3 pt-1">
          {inspecao.fase === "INSTRUCAO_OBRA" && !estaRecusando && (
            <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 space-y-1">
              <label className="block text-xs font-semibold text-blue-900">Previsão de Medição (Opcional):</label>
              <input type="date" value={previsaoMedicao[inspecao.id] || ""} onChange={(e) => setPrevisaoMedicao({ ...previsaoMedicao, [inspecao.id]: e.target.value })} className="border border-gray-300 rounded-lg p-2 text-xs bg-white outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          )}

          {!estaRecusando ? (
            <div className="flex flex-wrap gap-2">
              <button disabled={salvandoId === inspecao.id} onClick={() => handleConfirmarData(inspecao)} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm disabled:bg-gray-300">
                <CheckCircle2 size={15} /> Confirmar Data Prevista
              </button>
              <button type="button" onClick={() => setModosRecusa({ ...modosRecusa, [inspecao.id]: true })} className="flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition cursor-pointer">
                <RotateCcw size={15} /> Reagendar / Justificar
              </button>
            </div>
          ) : (
            <div className="bg-rose-50/60 border border-rose-200 p-4 rounded-xl space-y-3">
              <p className="text-xs font-bold text-rose-900 flex items-center gap-1.5"><AlertTriangle size={15} /> Justificar Devolução para o Planejador</p>
              <input type="text" placeholder="Informe o motivo da impossibilidade da data..." value={justificativas[inspecao.id] || ""} onChange={(e) => setJustificativas({ ...justificativas, [inspecao.id]: e.target.value })} className="w-full border border-gray-300 rounded-lg p-2.5 text-xs bg-white outline-none focus:ring-2 focus:ring-rose-500" />
              <div className="flex justify-end gap-2 pt-1">
                <button type="button" onClick={() => setModosRecusa({ ...modosRecusa, [inspecao.id]: false })} className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition">Voltar</button>
                <button disabled={salvandoId === inspecao.id} onClick={() => handleRecusarData(inspecao)} className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg transition cursor-pointer disabled:bg-gray-300">
                  {salvandoId === inspecao.id ? "Devolvendo..." : "Devolver ao Planejador"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Concluído & Produção */}
      {inspecao.concluido && (
        <div className="pt-2 space-y-3">
          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 size={16} /> Vistoria realizada em: {fmt(inspecao.data_realizada)}
          </div>
          {inspecao.fase === "MEDICAO" && (
            <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-purple-900 flex items-center gap-1.5"><Factory size={15} /> Liberação para Produção</p>
                <p className="text-[11px] text-purple-700 mt-0.5">
                  {proj?.liberado_producao ? `Produção liberada até: ${new Date(proj.data_liberacao_producao).toLocaleString("pt-BR")}` : "Medição concluída. Deseja liberar o projeto para corte/produção em 48h?"}
                </p>
              </div>
              {!proj?.liberado_producao && (
                <button disabled={salvandoId === proj.id} onClick={() => handleLiberarProducao(proj.id)} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shrink-0 shadow-sm disabled:bg-gray-300">
                  {salvandoId === proj.id ? "Liberando..." : "Liberar para Produção (+48h)"}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}