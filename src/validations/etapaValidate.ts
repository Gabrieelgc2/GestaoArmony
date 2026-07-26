export function validateRequiredDate(date?: Date) {
  return date ? "" : "Informe a data.";
}

export function validateRequiredResponsavel(responsavel: string) {
  return responsavel.trim()
    ? ""
    : "Selecione um responsável.";
}