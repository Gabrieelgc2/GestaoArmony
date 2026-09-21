import { Trash2, Key, Droplet, Layers } from "lucide-react";
import { GUIA_CONFIG, type ItemMedicaoForm } from "@/types/relatorioMedicao";
import { GrupoEspecTecnica } from "./GrupoTec";

interface Props {
  item: ItemMedicaoForm;
  index: number;
  totalItens: number;
  onRemover: (index: number) => void;
  onAtualizar: <K extends keyof ItemMedicaoForm>(index: number, campo: K, valor: ItemMedicaoForm[K]) => void;
}

export function CardItemMedicao({ item, index, totalItens, onRemover, onAtualizar }: Props) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-5 relative">
      <div className="flex items-center justify-between border-b pb-3 border-gray-100">
        <span className="text-xs font-extrabold text-blue-900 bg-blue-50 px-3 py-1 rounded-lg">
          Item #{index + 1}
        </span>
        {totalItens > 1 && (
          <button
            type="button"
            onClick={() => onRemover(index)}
            className="text-rose-500 hover:text-rose-700 p-1 rounded-lg hover:bg-rose-50 transition"
            title="Remover Item"
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-6 gap-3">
        <div className="col-span-1 sm:col-span-2">
          <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Descrição *</label>
          <input
            type="text"
            placeholder="Ex: J01 - Suíte"
            value={item.descricao_item}
            onChange={(e) => onAtualizar(index, "descricao_item", e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-2 text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-1">
          <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Qtd *</label>
          <input
            type="number"
            min={1}
            value={item.quantidade}
            onChange={(e) => onAtualizar(index, "quantidade", e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl p-2 text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-1">
          <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1 whitespace-nowrap">Largura (mm) *</label>
          <input
            type="number"
            placeholder="0"
            value={item.largura}
            onChange={(e) => onAtualizar(index, "largura", e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl p-2 text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-1">
          <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Altura (mm) *</label>
          <input
            type="number"
            placeholder="0"
            value={item.altura}
            onChange={(e) => onAtualizar(index, "altura", e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl p-2 text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-1">
          <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Peitoril (mm)</label>
          <input
            type="number"
            placeholder="0"
            value={item.peitoril}
            onChange={(e) => onAtualizar(index, "peitoril", e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl p-2 text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="text-[10px] font-bold uppercase text-gray-500 block mb-1">Giro</label>
          <input
            type="text"
            placeholder="Ex: Esquerdo Interno"
            value={item.giro}
            onChange={(e) => onAtualizar(index, "giro", e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-2 text-xs font-semibold bg-white outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Checkboxes organizados na linha de baixo */}
        <div className="col-span-2 md:col-span-6 flex flex-wrap items-center gap-4 pt-2">
          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={item.tem_chave}
              onChange={(e) => onAtualizar(index, "tem_chave", e.target.checked)}
              className="h-4 w-4 rounded text-blue-600 focus:ring-0"
            />
            <Key size={14} className="text-gray-500" /> Chave
          </label>

          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={item.nao_drenar}
              onChange={(e) => onAtualizar(index, "nao_drenar", e.target.checked)}
              className="h-4 w-4 rounded text-blue-600 focus:ring-0"
            />
            <Droplet size={14} className="text-gray-500" /> Não Drenar
          </label>

          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={item.tem_pelicula}
              onChange={(e) => onAtualizar(index, "tem_pelicula", e.target.checked)}
              className="h-4 w-4 rounded text-blue-600 focus:ring-0"
            />
            <Layers size={14} className="text-gray-500" /> Película
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <GrupoEspecTecnica
          titulo="Calhas"
          opcoes={GUIA_CONFIG.calhas}
          valorAtual={item.calhas}
          onSelect={(val) => onAtualizar(index, "calhas", val as any)}
        />
        <GrupoEspecTecnica
          titulo="Soleiras Porta Giro"
          opcoes={GUIA_CONFIG.soleiras}
          valorAtual={item.soleira_porta_giro}
          onSelect={(val) => onAtualizar(index, "soleira_porta_giro", val as any)}
        />
        <GrupoEspecTecnica
          titulo="Acabamentos"
          opcoes={GUIA_CONFIG.acabamentos}
          valorAtual={item.acabamento}
          onSelect={(val) => onAtualizar(index, "acabamento", val as any)}
        />
        <GrupoEspecTecnica
          titulo="Trilhos Especiais"
          opcoes={GUIA_CONFIG.trilhos}
          valorAtual={item.trilho_especial}
          onSelect={(val) => onAtualizar(index, "trilho_especial", val as any)}
        />
      </div>

      <div>
        <label className="text-[10px] font-bold uppercase text-gray-500">Observação deste Item</label>
        <textarea
          rows={2}
          placeholder="Particularidades deste vão especificamente..."
          value={item.observacao_item}
          onChange={(e) => onAtualizar(index, "observacao_item", e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-2.5 text-xs bg-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}