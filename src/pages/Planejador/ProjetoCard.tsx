import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Factory,
  MapPin,
  Phone,
  Target,
  UserCheck,
} from "lucide-react";
import { formatarData, type FaseKey, type Projeto } from "../../utils/painelPlanejadorConfig";

export function ProjetoCard({ projeto, hook }: { projeto: Projeto; hook: any }) {
  const {
    inspetores,
    datasPrevistas,
    setDatasPrevistas,
    inspetoresSelecionados,
    setInspetoresSelecionados,
    salvandoId,
    handleAgendarInspecao,
    handleAvancarFase,
  } = hook;

  const inspecaoAtual = projeto.inspections?.find((insp) => insp.fase === projeto.status);

  const nomeInspetor = inspecaoAtual?.profiles
    ? Array.isArray(inspecaoAtual.profiles)
      ? inspecaoAtual.profiles[0]?.full_name || "Inspetor escalado"
      : inspecaoAtual.profiles.full_name || "Inspetor escalado"
    : "Inspetor escalado";

  const isRecusado = inspecaoAtual?.status_aprovacao === "RECUSADO" && !inspecaoAtual.concluido;
  const podeAvancar = projeto.status === "NOVO" || projeto.status === "PRODUCAO" || Boolean(inspecaoAtual?.concluido);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm hover:shadow transition-all space-y-3 group">
      {/* 1. Identificação da Obra */}
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
              <span className="font-bold">{formatarData(projeto.data_limite_entrega)}</span>
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

      {/* 2. Bloco de Vistoria / Agendamento */}
      {projeto.status !== "NOVO" && projeto.status !== "PRODUCAO" && (
        <div className="pt-2 border-t border-gray-100">
          {isRecusado ? (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-2.5 space-y-2 text-[11px]">
              <div className="flex items-center gap-1.5 font-bold text-rose-800">
                <AlertTriangle size={13} className="shrink-0" />
                <span>Reagendamento Solicitado</span>
              </div>
              <p className="text-[10px] text-rose-700 italic bg-white/70 p-1.5 rounded border border-rose-100">
                "{inspecaoAtual.justificativa || "Sem justificativa informada."}"
              </p>

              <div className="space-y-1.5 pt-1">
                <label className="block text-[10px] font-bold uppercase text-gray-700">Definir Nova Data:</label>
                <input
                  type="date"
                  value={datasPrevistas[projeto.id] || ""}
                  onChange={(e) => setDatasPrevistas((prev: Record<string, string>) => ({ ...prev, [projeto.id]: e.target.value }))}
                  className="w-full border border-rose-200 rounded p-1 text-[11px] bg-white outline-none focus:ring-1 focus:ring-rose-500"
                />
                <button
                  disabled={salvandoId === projeto.id || !datasPrevistas[projeto.id]}
                  onClick={() => handleAgendarInspecao(projeto.id, projeto.status as FaseKey)}
                  className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] rounded transition disabled:bg-gray-300 cursor-pointer"
                >
                  {salvandoId === projeto.id ? "Reagendando..." : "Reenviar Nova Data"}
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-700 mb-0.5">Trocar Inspetor (Opcional):</label>
                <select
                  value={inspetoresSelecionados[projeto.id] || ""}
                  onChange={(e) => setInspetoresSelecionados((prev: Record<string, string>) => ({ ...prev, [projeto.id]: e.target.value }))}
                  className="w-full border border-rose-200 rounded p-1 text-[11px] bg-white outline-none focus:ring-1 focus:ring-rose-500"
                >
                  <option value="">Manter atual ({nomeInspetor})</option>
                  {inspetores.map((insp: any) => (
                    <option key={insp.id} value={insp.id}>{insp.full_name}</option>
                  ))}
                </select>
              </div>
            </div>
          ) : inspecaoAtual ? (
            <div className="bg-gray-50 rounded-lg p-2.5 space-y-1.5 text-[11px] border border-gray-100">
              <div className="flex items-center gap-1.5 font-medium text-gray-700">
                <UserCheck size={13} className="text-blue-600" />
                <span className="truncate">{nomeInspetor}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-[10px]">
                <Calendar size={12} />
                <span>Prevista: {formatarData(inspecaoAtual.data_prevista)}</span>
              </div>
              {inspecaoAtual.concluido ? (
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                    <CheckCircle2 size={11} /> Realizada ({formatarData(inspecaoAtual.data_realizada)})
                  </span>
                </div>
              ) : (
                <div className="pt-0.5">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded">
                    <AlertCircle size={11} /> Aguardando confirmação do inspetor
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-blue-50/50 rounded-lg p-2.5 space-y-2 border border-blue-100">
              <p className="text-[10px] font-bold text-blue-900 uppercase">Agendar Vistoria</p>
              <input
                type="date"
                value={datasPrevistas[projeto.id] || ""}
                onChange={(e) => setDatasPrevistas((prev: Record<string, string>) => ({ ...prev, [projeto.id]: e.target.value }))}
                className="w-full border border-gray-200 rounded p-1 text-[11px] bg-white outline-none focus:ring-1 focus:ring-blue-500"
              />
              <select
                value={inspetoresSelecionados[projeto.id] || ""}
                onChange={(e) => setInspetoresSelecionados((prev: Record<string, string>) => ({ ...prev, [projeto.id]: e.target.value }))}
                className="w-full border border-gray-200 rounded p-1 text-[11px] bg-white outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Selecione o Inspetor...</option>
                {inspetores.map((insp: any) => (
                  <option key={insp.id} value={insp.id}>{insp.full_name}</option>
                ))}
              </select>
              <button
                disabled={salvandoId === projeto.id}
                onClick={() => handleAgendarInspecao(projeto.id, projeto.status as FaseKey)}
                className="w-full py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[11px] rounded transition disabled:bg-gray-300 cursor-pointer"
              >
                {salvandoId === projeto.id ? "Salvando..." : "Confirmar Vistoria"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Botão Avançar Etapa */}
      <div className="pt-1">
        <button
          disabled={!podeAvancar || salvandoId === projeto.id}
          onClick={() => handleAvancarFase(projeto)}
          className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-semibold transition ${
            podeAvancar
              ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          {projeto.status === "NOVO" ? "Iniciar Obra" : "Avançar Etapa"}
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}