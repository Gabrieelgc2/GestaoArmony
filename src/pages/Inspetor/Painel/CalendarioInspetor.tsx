import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gerarMapaCalendario } from "@/utils/agendaUtils";
import { InspecaoCard } from "./InspecaoCard";

export function CalendarioInspetor({ inspecoes, hook }: { inspecoes: any[]; hook: any }) {
  const [dataAtual, setDataAtual] = useState(new Date());
  const [diaSelecionado, setDiaSelecionado] = useState<string>(
  new Date().toISOString().split("T")[0]
);
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();
  // 1. Gera o mapa de status dos dias
  const inspecoesPorData = useMemo(() => gerarMapaCalendario(inspecoes), [inspecoes]);

  // 2. Calcula a grade de dias do mês
  const diasDoMes = useMemo(() => {
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const totalDiasNoMes = new Date(ano, mes + 1, 0).getDate();

    const dias: (string | null) [] = [];
    for (let i = 0; i < primeiroDiaSemana; i++) dias.push(null);
    for (let d = 1; d <= totalDiasNoMes; d++) {
      const mesStr = String(mes + 1).padStart(2, "0");
      const diaStr = String(d).padStart(2, "0");
      dias.push(`${ano}-${mesStr}-${diaStr}`);
    }
    return dias;
  }, [ano, mes]);

  const nomeMes = dataAtual.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const inspecoesDoDia = diaSelecionado ? inspecoesPorData[diaSelecionado]?.inspecoes || [] : [];

  // Função para definir a cor de fundo e texto do quadrado
  const obterEstiloQuadrado = (dataIso: string) => {
    const info = inspecoesPorData[dataIso];
    const isSelecionado = diaSelecionado === dataIso;

    // Base de borda se for o dia selecionado ou dia de hoje
    const bordaSelecao = isSelecionado
      ? "ring-2 ring-gray-900 shadow-md z-10"
      : "border border-gray-100";

    // 1. Atrasada -> Fundo Vermelho
    if (info?.temAtrasadas) {
      return `${bordaSelecao} bg-red-500 text-black border-rose-200 hover:bg-red-300`;
    }

    // 2. Agendada/Pendente -> Fundo Amarelo
    if (info?.temPendentes) {
      return `${bordaSelecao} bg-yellow-500 text-black border-yellow-200 hover:bg-yellow-300`;
    }

    // 3. Concluidas -> Fundo verde
    if(info?.temConcluidas){
      return `${bordaSelecao} bg-emerald-500 text-black border-emerald-200 hover:bg-emerald-300`
    }

    // 4. Sem vistorias -> Fundo Neutro
    return `${bordaSelecao} bg-gray-200 text-gray-700 hover:bg-gray-100`;
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho e Navegação do Mês */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900 capitalize">{nomeMes}</h2>
          <div className="flex gap-1">
            <button
              onClick={() => setDataAtual(new Date(ano, mes - 1, 1))}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setDataAtual(new Date(ano, mes + 1, 1))}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cabeçalho dos dias da semana */}
        <div className="grid grid-cols-7 text-center text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          <span>Dom</span>
          <span>Seg</span>
          <span>Ter</span>
          <span>Qua</span>
          <span>Qui</span>
          <span>Sex</span>
          <span>Sáb</span>
        </div>

        {/* Grade do Calendário (Quadrados coloridos) */}
        <div className="grid grid-cols-7 gap-1.5">
          {diasDoMes.map((dataIso, index) => {
            if (!dataIso) {
              return <div key={`empty-${index}`} className="h-12" />
            }

            const numeroDia = dataIso.split("-")[2];
            const qtdVisitas = inspecoesPorData[dataIso]?.inspecoes?.length || 0;

            return (
              <button
                key={dataIso}
                onClick={() => setDiaSelecionado(dataIso)}
                className={`h-12 rounded-xl flex flex-col items-center justify-between py-1 px-1 transition relative ${obterEstiloQuadrado(
                  dataIso
                )}`}
              >
                <span className="text-xs font-bold leading-none">{Number(numeroDia)}</span>

                {/* Contador discreto no rodapé do quadrado se tiver vistorias */}
                {qtdVisitas > 0 ? (
                  <span className="text-[9px] font-semibold opacity-75 leading-none">
                    {qtdVisitas} {qtdVisitas === 1 ? "vistoria" : "vistorias"}
                  </span>
                ) : (
                  <span className="h-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legenda visual dos quadrados */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3 border-t border-gray-100 text-[11px] text-gray-600">
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-red-500 border border-rose-200" /> Atrasada
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-yellow-500 border border-yellow-200" /> Pendente
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-md bg-emerald-400 border border-emerald-200" /> Concluída
          </span>
        </div>
      </div>

      {/* Lista das vistorias do dia clicado */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            Vistorias de {diaSelecionado.split("-").reverse().join("/")}
          </h3>
          <span className="text-xs text-gray-500 font-medium">
            {inspecoesDoDia.length} {inspecoesDoDia.length === 1 ? "item" : "itens"}
          </span>
        </div>

        {inspecoesDoDia.length > 0 ? (
          inspecoesDoDia.map((insp) => (
            <InspecaoCard key={insp.id} inspecao={insp} hook={hook} />
          ))
        ) : (
          <div className="bg-white border border-dashed border-gray-200 rounded-xl p-6 text-center text-xs text-gray-400">
            Nenhuma vistoria registrada para este dia.
          </div>
        )}
      </div>
    </div>
  );
}