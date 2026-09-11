import { describe, it, expect } from "vitest";
import {
  horariosConflitam,
  inspetorEstaDisponivel,
  inspetorTemConflito,
  isInspecaoAtiva,
} from "@/utils/agendaUtils";

const INSPETOR_A = "inspetor-a";
const INSPETOR_B = "inspetor-b";

describe("disponibilidadeInspetor", () => {
  it("deve considerar inspeção Pendente como ativa", () => {
    expect(isInspecaoAtiva({ concluido: false, status_aprovacao: "PENDENTE" })).toBe(true);
  });

  it("deve considerar inspeção Atrasada como ativa", () => {
    expect(isInspecaoAtiva({ concluido: false, status_aprovacao: "CONFIRMADO" })).toBe(true);
  });

  it("não deve considerar inspeção concluída como ativa", () => {
    expect(isInspecaoAtiva({ concluido: true, status_aprovacao: "CONFIRMADO" })).toBe(false);
  });

  it("não deve considerar inspeção recusada como ativa", () => {
    expect(isInspecaoAtiva({ concluido: false, status_aprovacao: "RECUSADO" })).toBe(false);
  });

  it("deve detectar conflito quando data e horário são iguais", () => {
    expect(horariosConflitam("2026-09-10", "14:00", "2026-09-10T14:00:00")).toBe(true);
  });

  it("não deve detectar conflito quando o horário é diferente no mesmo dia", () => {
    expect(horariosConflitam("2026-09-10", "14:00", "2026-09-10T09:00:00")).toBe(false);
  });

  it("deve marcar inspetor indisponível se houver vistoria Pendente no mesmo horário", () => {
    const inspecoes = [
      {
        id: "1",
        inspetor_id: INSPETOR_A,
        data_prevista: "2026-09-10T14:00:00",
        concluido: false,
        status_aprovacao: "PENDENTE",
      },
    ];

    expect(inspetorTemConflito(INSPETOR_A, inspecoes, "2026-09-10", "14:00")).toBe(true);
    expect(inspetorEstaDisponivel(INSPETOR_A, inspecoes, "2026-09-10", "14:00")).toBe(false);
  });

  it("deve manter inspetor disponível se a vistoria conflitante estiver concluída", () => {
    const inspecoes = [
      {
        id: "1",
        inspetor_id: INSPETOR_A,
        data_prevista: "2026-09-10T14:00:00",
        concluido: true,
        status_aprovacao: "CONFIRMADO",
      },
    ];

    expect(inspetorEstaDisponivel(INSPETOR_A, inspecoes, "2026-09-10", "14:00")).toBe(true);
  });

  it("deve ignorar a inspeção sendo reagendada", () => {
    const inspecoes = [
      {
        id: "1",
        inspetor_id: INSPETOR_A,
        data_prevista: "2026-09-10T14:00:00",
        concluido: false,
        status_aprovacao: "PENDENTE",
      },
    ];

    expect(
      inspetorEstaDisponivel(INSPETOR_A, inspecoes, "2026-09-10", "14:00", "1"),
    ).toBe(true);
  });

  it("não deve conflitar inspetores diferentes no mesmo horário", () => {
    const inspecoes = [
      {
        id: "1",
        inspetor_id: INSPETOR_A,
        data_prevista: "2026-09-10T14:00:00",
        concluido: false,
        status_aprovacao: "PENDENTE",
      },
    ];

    expect(inspetorEstaDisponivel(INSPETOR_B, inspecoes, "2026-09-10", "14:00")).toBe(true);
  });
});