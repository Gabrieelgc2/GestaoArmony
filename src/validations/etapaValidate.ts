export function validateRequiredDate(date?: Date) {
  return date ? "" : "Informe a data.";
}

export function validateRequiredResponsavel(responsavel: string) {
  return responsavel.trim()
    ? ""
    : "Selecione um responsável.";
}

export function validateRequiredLocation(location: string) {
  return location.trim()
    ? ""
    : "Informe o local de instalação.";
}

export function validateRequiredDeadline(deadline: number) {
  return deadline > 0
    ? ""
    : "Informe o prazo previsto.";
}