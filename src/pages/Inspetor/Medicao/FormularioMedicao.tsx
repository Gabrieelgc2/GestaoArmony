import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Plus } from "lucide-react";
import { type GuiaMedicaoCompleta, type ItemMedicaoForm } from "@/types/relatorioMedicao";
import { CardItemMedicao } from "./CardItem";

interface Props {
  onSalvar: (dados: GuiaMedicaoCompleta) => Promise<void>;
}

const itemVazio: ItemMedicaoForm = {
  descricao_item: "",
  quantidade: 1,
  largura: "",
  altura: "",
  peitoril: "",
  giro: "",
  tem_chave: false,
  nao_drenar: false,
  tem_pelicula: false,
  calhas: null,
  soleira_porta_giro: null,
  acabamento: null,
  trilho_especial: null,
  observacao_item: "",
};

export function FormularioRelatorioMedicao({ onSalvar }: Props) {
  const [observacoesGerais, setObservacoesGerais] = useState("");
  const [itens, setItens] = useState<ItemMedicaoForm[]>([{ ...itemVazio, descricao_item: "Item 1" }]);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const adicionarItem = () => {
    setItens((prev) => [...prev, { ...itemVazio, descricao_item: `Item ${prev.length + 1}` }]);
  };

  const removerItem = (index: number) => {
    if (itens.length === 1) {
      setErro("É necessário ter pelo menos um item no relatório.");
      return;
    }
    setItens((prev) => prev.filter((_, i) => i !== index));
  };

  const atualizarItem = <K extends keyof ItemMedicaoForm>(index: number, campo: K, valor: ItemMedicaoForm[K]) => {
    setItens((prev) => prev.map((item, i) => (i === index ? { ...item, [campo]: valor } : item)));
    if (erro) setErro(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    for (let i = 0; i < itens.length; i++) {
      const it = itens[i];
      if (!it.descricao_item || !it.quantidade || !it.largura || !it.altura) {
        setErro(`Preencha Descrição, Qtd, Largura e Altura do ${it.descricao_item || `Item ${i + 1}`}.`);
        return;
      }
      if (!it.calhas || !it.soleira_porta_giro || !it.acabamento || !it.trilho_especial) {
        setErro(`Selecione as 4 especificações técnicas do ${it.descricao_item || `Item ${i + 1}`}.`);
        return;
      }
    }

    try {
      setSalvando(true);
      await onSalvar({ observacoesGerais, itens });
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar relatório.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-gray-900">Relatório de Medição e Fabricação</h2>
          <p className="text-xs text-gray-500">Adicione os itens e selecione as especificações técnicas encontradas.</p>
        </div>
        <button
          type="button"
          onClick={adicionarItem}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition cursor-pointer"
        >
          <Plus size={16} /> Adicionar Item
        </button>
      </div>

      {erro && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
          <AlertCircle size={16} className="shrink-0" />
          <span>{erro}</span>
        </div>
      )}

      <div className="space-y-6">
        {itens.map((item, index) => (
          <CardItemMedicao
            key={index}
            item={item}
            index={index}
            totalItens={itens.length}
            onRemover={removerItem}
            onAtualizar={atualizarItem}
          />
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">Observações Gerais da Obra</label>
        <textarea
          rows={3}
          placeholder="Anotações gerais válidas para todo o relatório..."
          value={observacoesGerais}
          onChange={(e) => setObservacoesGerais(e.target.value)}
          className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={salvando}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer disabled:bg-gray-300 flex items-center justify-center gap-2 shadow-sm"
      >
        <CheckCircle2 size={16} />
        {salvando ? "Salvando Relatório Completo..." : "Salvar Relatório de Medição"}
      </button>
    </form>
  );
}