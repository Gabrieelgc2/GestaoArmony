import type { GuiaMedicaoForm } from "../types/relatorioMedicao";

export function validarRelatorioMedicao(dados: GuiaMedicaoForm): { valido: boolean; erros: string[] } {
  const erros: string[] = [];

  if (!dados.calhas) erros.push("O tipo de calha deve ser definido.");
  if (!dados.soleira_porta_giro) erros.push("A presença de soleira deve ser indicada.");
  if (!dados.acabamento) erros.push("O acabamento do vão é obrigatório.");
  if (!dados.trilho_especial) erros.push("O modelo do trilho especial deve ser selecionado.");

  return {
    valido: erros.length === 0,
    erros,
  };
}