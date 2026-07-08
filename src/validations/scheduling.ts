export interface SchedulingData {
  date?: Date;
  responsavel: string;
}

export interface SchedulingErrors {
  date: string;
  responsavel: string;
}

export function validateScheduling(data: SchedulingData): SchedulingErrors {
  const errors: SchedulingErrors = {
    date: "",
    responsavel: "",
  };

  if (!data.date) {
    errors.date = "Este campo é obrigatório. Selecione uma data.";
  }

  if (!data.responsavel) {
    errors.responsavel = "Este campo é obrigatório. Selecione um responsável.";
  }

  return errors;
}

export function hasSchedulingErrors(errors: SchedulingErrors): boolean {
  return Boolean(errors.date || errors.responsavel);
}
