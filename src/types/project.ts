export interface Project {
  id: string;
  name_project: string;
  order_number: string;
  production_deadline?: number | null;
  installation_location?: string | null;
  medicao_date?: Date | null;
  instrucao_date?: string | null;
  status: ProjectStatus;
}

export type ProjectStatus =
  | "NOVO"
  | "LIBERADO_TRABALHO"
  | "INSTRUCAO_OBRA"
  | "MEDICAO"
  | "PRE_INSTALACAO"
  | "POS_INSTALACAO"
  | "ENTREGA_OBRA"
  | "ETAPA_FINAL"

export const PROJECT_STATUSES = [
  "NOVO",
  "LIBERADO_TRABALHO",
  "INSTRUCAO_OBRA",
  "MEDICAO",
  "PRE_INSTALACAO",
  "POS_INSTALACAO",
  "ENTREGA_OBRA",
  "ETAPA_FINAL",
] as const;

export const STATUS_LABELS: Record<string, string> = {
  NOVO: "Novo",
  LIBERADO_TRABALHO: "Liberado para trabalho",
  INSTRUCAO_OBRA: "Instrução de obra",
  MEDICAO: "Medição",
  PRE_INSTALACAO: "Inspeção pré-instalação",
  POS_INSTALACAO: "Inspeção pós-instalação",
  ENTREGA_OBRA: "Entrega de obra",
  ETAPA_FINAL: "Etapa final",
};