import type { Inspecao, Projeto } from "@/utils/painelPlanejadorConfig";

export function obterInspecaoAtual(projeto: Projeto): Inspecao | undefined {
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
  return (
    projeto.status !== "NOVO" &&
    projeto.status !== "PRODUCAO" &&
    Boolean(inspecao?.concluido)
  );
}

export function obterNomeInspetor(
  profiles: Inspecao["profiles"],
): string {
  if (Array.isArray(profiles)) {
    return profiles[0]?.full_name || "Inspetor escalado";
  }

  return profiles?.full_name || "Inspetor escalado";
}
