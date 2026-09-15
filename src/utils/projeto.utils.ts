import type { Inspecao, Projeto } from "@/utils/painelPlanejadorConfig";

export function obterInspecaoAtual(projeto: Projeto): Inspecao | undefined {
  if (projeto.status === "NOVO") {
    return undefined;
  }
  return projeto.inspections?.find(
    (inspecao) => inspecao.fase === projeto.status,
  );
}

export function inspecaoFoiRecusada(inspecao?: Inspecao): boolean {
  return inspecao?.status_aprovacao === "RECUSADO" && !inspecao.concluido;
}

export function projetoPodeAvancar(
  projeto: Projeto,
  inspecao?: Inspecao,
): boolean {
  if (projeto.status === "NOVO") {
    return true;
  }
  if (projeto.status === "PRODUCAO") {
    return false;
  }

  return Boolean(inspecao?.concluido);
}

export function obterNomeInspetor(
  profiles: Inspecao["profiles"],
): string {
  if (Array.isArray(profiles)) {
    return profiles[0]?.full_name || "Engenheiro escalado";
  }

  return profiles?.full_name || "Engenheiro escalado";
}
