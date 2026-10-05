import { useState, useEffect } from "react";
import { qtdAdicionarLoteSchema, type GuiaMedicaoCompleta, type ItemMedicaoForm } from "@/types/relatorioMedicao";
import { relatorioMedicaoSchema } from "@/utils/relatorioSchema";
import { itemVazio } from "../../../../types/relatorioMedicao";

const PASSO_PAGINACAO = 20;

export function useRelatorioMedicao(onSalvar: (dados: GuiaMedicaoCompleta) => Promise<void>) {
  const [limiteExibicao, setLimiteExibicao] = useState(PASSO_PAGINACAO);
  const [itemParaRolar, setItemParaRolar] = useState<number | null>(null);
  const [observacoesGerais, setObservacoesGerais] = useState("");
  const [itens, setItens] = useState<ItemMedicaoForm[]>([{ ...itemVazio }]);
  const [salvando, setSalvando] = useState(false);
  const [fotos, setFotos] = useState<File[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [qtdAdicionar, setQtdAdicionar] = useState<string>("1");
  const [erroQtd, setErroQtd] = useState<string>("");
  
  const itensVisiveis = itens.slice(0, limiteExibicao);

  const carregarMais = () => setLimiteExibicao((prev) => prev + PASSO_PAGINACAO);

  const adicionarItensEmLote = () => {
    setErroQtd("");
    const resultado = qtdAdicionarLoteSchema.safeParse(qtdAdicionar);
    if (!resultado.success) {
    const mensagemErro = resultado.error.issues[0]?.message;
    setErroQtd(mensagemErro || "Quantidade inválida.");
    return;
  }

  // Se passou na validação, resultado.data já é um NUMBER garantido (1 a 50)
  const quantidadeValida = resultado.data;

  const novosItens: ItemMedicaoForm[] = Array.from(
    { length: quantidadeValida },
    () => ({ ...itemVazio })
  );

  setItens((prev) => [...prev, ...novosItens]);

  // Reseta o campo após o sucesso
  setQtdAdicionar("1");
  };

  const lidarComBusca = (numItem: number) => {
    setItemParaRolar(numItem);
    if (numItem > limiteExibicao) {
      setLimiteExibicao(numItem);
    }
  };


  useEffect(() => {
    if (itemParaRolar === null) return;
    const elemento = document.getElementById(`card-item-${itemParaRolar}`);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "center" });
      elemento.classList.add("animate-destaque");
      setTimeout(() => elemento.classList.remove("animate-destaque"), 2000);
      setItemParaRolar(null);
    }
  }, [limiteExibicao, itemParaRolar]);

  const removerItem = (index: number) => {
    if (itens.length === 1) {
      setErro("É necessário ter pelo menos um item no relatório.");
      return;
    }
    setItens((prev) => prev.filter((_, i) => i !== index));
  };

  const atualizarItem = <K extends keyof ItemMedicaoForm>(
    index: number,
    campo: K,
    valor: ItemMedicaoForm[K]
  ) => {
    setItens((prev) => prev.map((item, i) => (i === index ? { ...item, [campo]: valor } : item)));
    if (erro) setErro(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultado = relatorioMedicaoSchema.safeParse({ observacoesGerais, itens });

    if (!resultado.success) {
      const primeiroErro = resultado.error.issues[0]?.message;
      setErro(primeiroErro || "Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setSalvando(true);
      await onSalvar({ ...resultado.data, fotos });
    } catch (err: any) {
      setErro(err.message || "Erro ao salvar relatório.");
    } finally {
      setSalvando(false);
    }
  };

  return {
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
  };
}