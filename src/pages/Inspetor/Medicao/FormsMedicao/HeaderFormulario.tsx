import { Plus } from "lucide-react";

interface Props {
  qtdAdicionar: string;
  onChangeQtd: (val: string) => void;
  onAdicionar: () => void;
  erroQtd?: string;
}

export function HeaderFormulario({ qtdAdicionar, onChangeQtd, onAdicionar, erroQtd }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between gap-4">
      <div>
        <h2 className="text-lg font-black text-gray-900">Relatório de Medição e Fabricação</h2>
        <p className="text-xs text-gray-500">Adicione os itens e selecione as especificações técnicas encontradas.</p>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold uppercase text-gray-400 mb-0.5">Qtd</span>
            <input
              type="text"
              inputMode="numeric"
              value={qtdAdicionar}
              onChange={(e) => onChangeQtd(e.target.value)}
              className={`w-14 border rounded-xl p-1.5 text-center text-xs font-bold bg-white outline-none focus:ring-2 ${
                erroQtd ? "border-rose-500 focus:ring-rose-500 text-rose-600" : "border-gray-200 focus:ring-blue-500"
              }`}
            />
          </div>

          <button
            type="button"
            onClick={onAdicionar}
            className="flex items-center gap-1.5 px-4 py-2 mt-3.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition cursor-pointer"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>
        {erroQtd && <span className="text-[10px] font-bold text-rose-600 animate-fade-in">{erroQtd}</span>}
      </div>
    </div>
  );
}