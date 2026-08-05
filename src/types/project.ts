export interface Project {
  id: string;
  name_project: string;
  order_number: string;
  production_deadline?: number | null;
  installation_location?: string | null;
  instrucao_date?: string | null;
  instrucao_responsavel?: string | null;
  medicao_date?: string | null;
  medicao_responsavel?: string | null;
  pre_instalacao_date?: string | null;
  pre_instalacao_responsavel?: string | null;
  instalacao_date?: string | null;
  instalacao_responsavel?: string | null;
  pos_instalacao_date?: string | null;
  pos_instalacao_responsavel?: string | null;
  entrega_obra_date?: string | null;
  entrega_obra_responsavel?: string | null;
  etapa_final_date?: string | null;
  etapa_final_responsavel?: string | null;
  status: ProjectStatus;
}

export type ProjectStatus =
  | "NOVO"
  | "LIBERADO_TRABALHO"
  | "INSTRUCAO_OBRA"
  | "MEDICAO"
  | "INSTALACAO"
  | "PRE_INSTALACAO"
  | "POS_INSTALACAO"
  | "ENTREGA_OBRA"
  | "ETAPA_FINAL"

export const PROJECT_STATUSES = [
  "NOVO",
  "INSTRUCAO_OBRA",
  "MEDICAO",
  "PRE_INSTALACAO",
  "INSTALACAO",
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
  INSTALACAO: "Instalação",
  POS_INSTALACAO: "Inspeção pós-instalação",
  ENTREGA_OBRA: "Entrega de obra",
  ETAPA_FINAL: "Etapa final",
};