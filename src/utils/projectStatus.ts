import type { Project } from "@/types/project";

export interface CurrentPhaseInfo {
  date: string | null | undefined;
  responsavel: string | null | undefined;
}

export function getCurrentPhaseInfo(project: Project): CurrentPhaseInfo {
  switch (project.status) {
    case "INSTRUCAO_OBRA":
      return {
        date: project.instrucao_date,
        responsavel: project.instrucao_responsavel,
      };
    case "MEDICAO":
      return {
        date: project.medicao_date,
        responsavel: project.medicao_responsavel,
      };
    case "PRE_INSTALACAO":
      return {
        date: project.pre_instalacao_date,
        responsavel: project.pre_instalacao_responsavel,
      };
    case "POS_INSTALACAO":
      return {
        date: project.pos_instalacao_date,
        responsavel: project.pos_instalacao_responsavel,
      };
    case "ENTREGA_OBRA":
      return {
        date: project.entrega_obra_date,
        responsavel: project.entrega_obra_responsavel,
      };
    case "ETAPA_FINAL":
      return {
        date: project.etapa_final_date,
        responsavel: project.etapa_final_responsavel,
      };
    default:
      return {
        date: null,
        responsavel: null,
      };
  }
}

export function formatDate(dateString?: string | null): string {
  if (!dateString) return "Não agendado";
  const [year, month, day] = dateString.split("T")[0].split("-");
  return `${day}/${month}/${year}`;
}