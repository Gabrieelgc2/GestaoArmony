import { CheckCircle2, AlertCircle } from "lucide-react";
import { type GuiaMedicaoCompleta } from "@/types/relatorioMedicao";
import { CardItemMedicao } from "../../Medicao/CardItem";
import { InputAnexoMedicao } from "../Fotos/Anexar";
import { BuscaItemIndex } from "@/components/BuscaItems";
import { useRelatorioMedicao } from "./useRelatorioMedicao";
import { HeaderFormulario } from "./HeaderFormulario";

interface Props {
  onSalvar: (dados: GuiaMedicaoCompleta) => Promise<void>;
}

export function FormularioRelatorioMedicao({ onSalvar }: Props) {
  const {
    itens,
    itensVisiveis,
    limiteExibicao,
    observacoesGerais,
    setObservacoesGerais,
    salvando,
    fotos,
    setFotos,
    erro,
    qtdAdicionar,
    setQtdAdicionar,
    erroQtd,
    setErroQtd,
    adicionarItensEmLote,
    carregarMais,
    lidarComBusca,
    removerItem,
    atualizarItem,
    handleSubmit,
  } = useRelatorioMedicao(onSalvar);

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <HeaderFormulario
        qtdAdicionar={qtdAdicionar}
        onChangeQtd={(val) => {
          setQtdAdicionar(val);
          if (erroQtd) setErroQtd("");
        }}
        onAdicionar={adicionarItensEmLote}
        erroQtd={erroQtd}
      />

      {itens.length >= 1 && (
        <div className="flex items-center justify-between bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm">
          <span className="text-xs font-bold text-gray-600">
            Exibindo <span className="text-blue-600 font-extrabold">{itensVisiveis.length}</span> de{" "}
            <span className="text-gray-900 font-extrabold">{itens.length}</span> itens
          </span>
          <BuscaItemIndex totalItens={itens.length} onBuscar={lidarComBusca} />
        </div>
      )}

      {erro && (
        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
          <AlertCircle size={16} className="shrink-0" />
          <span>{erro}</span>
        </div>
      )}

      <div className="space-y-6">
        {itensVisiveis.map((item, index) => (
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

      {limiteExibicao < itens.length && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={carregarMais}
            className="px-6 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl transition border border-blue-200 shadow-sm cursor-pointer"
          >
            Carregar mais ({itens.length - limiteExibicao} restantes)
          </button>
        </div>
      )}

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

      <InputAnexoMedicao fotos={fotos} onFotosChange={setFotos} />

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