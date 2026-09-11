import { describe, it, expect, beforeEach } from "vitest";
import { gerarMapaCalendario } from "../src/utils/agendaUtils";

describe("agendaInspetor -> gerarMapaCalendario", () => {
  let dataReferencia: Date;

  beforeEach(() => {
    dataReferencia = new Date("2026-08-26T14:00:00Z");
  });

  it("deve marcar temAtrasadas = true para inspeção anterior a hoje e não concluída", () => {
    const mock = [
      {
        id: "1",
        project_id: "12341234",
        inspetor_id: "woo23012341234",
        fase: "MEDICAO",
        data_prevista: "2026-08-20T10:00:00Z",
        data_realizada: null,
        justificativa: null,
        created_at: "2026-08-20T10:00:00Z",
        concluido: false,
        status_aprovacao: "PENDENTE",
      }
    ];

    const mapa = gerarMapaCalendario(mock, dataReferencia);
    expect(mapa["2026-08-20"]).toBeDefined();
    expect(mapa["2026-08-20"].temAtrasadas).toBe(true);
    expect(mapa["2026-08-20"].temPendentes).toBe(false);
  });

  it("deve marcar temPendentes = true para a inspeção futura", () => {
    const mock = [
      {
        id: "2",
        project_id: "555555",
        inspetor_id: "klsaka2304910",
        fase: "INSTRUCAO_OBRA",
        data_prevista: "2026-08-30T14:00:00Z",
        data_realizada: null,
        justificativa: null,
        created_at: "2026-08-30T14:00:00Z",
        concluido: false,
        status_aprovacao: "PENDENTE",
      },
    ];

    const mapa = gerarMapaCalendario(mock, dataReferencia);
    expect(mapa["2026-08-30"].temPendentes).toBe(true);
    expect(mapa["2026-08-30"].temAtrasadas).toBe(false);
  });

  it("não deve marcar atrasada nem pendente se status_aprovacao for RECUSADO", () => {
    const mock = [
      {
        id: "4",
        project_id: "9999",
        data_prevista: "2026-08-15T10:00:00Z",
        data_realizada: null,
        justificativa: null,
        concluido: false,
        created_at: "2026-08-15T10:00:00Z",
        status_aprovacao: "RECUSADO",
      },
    ];
    const mapa = gerarMapaCalendario(mock, dataReferencia);
    expect(mapa["2026-08-15"].temAtrasadas).toBe(false);
    expect(mapa["2026-08-15"].temPendentes).toBe(false);
  });

  it("deve ignorar registros sem data_prevista sem quebrar a execução", () => {
    const mock = [
      { 
        id: "5",
        project_id: "33333", 
        data_prevista: null,
        data_realizada: null,
        justificativa: null,
        created_at: null,
        status_aprovacao: null, 
        concluido: false,
      },
      { 
        id: "6",
        project_id: "88888",
        data_prevista: undefined, 
        data_realizada: undefined,
        justificativa: undefined,
        created_at: undefined,
        status_aprovacao: undefined,
        concluido: false,
      },
    ];

    const mapa = gerarMapaCalendario(mock, dataReferencia);
    expect(Object.keys(mapa)).toHaveLength(0);
  });

  // Cenário 6 (Edge Case): Múltiplos status no mesmo dia
  it("deve marcar temAtrasadas e temPendentes no mesmo dia se uma vistoria for das 09h e outra das 18h", () => {
    const mock = [
      {
        id: "7",
        project_id: "222222",
        data_prevista: "2026-08-26T09:00:00Z",
        data_realizada: null,
        justificativa: null,
        created_at: "2026-08-26T09:00:00Z",
        status_aprovacao: "PENDENTE",
        concluido: false,
      },
      {
        id: "8",
        project_id: "333333",
        data_prevista: "2026-08-26T18:00:00Z",
        data_realizada: null,
        justificativa: null,
        created_at: "2026-08-26T18:00:00Z",
        status_aprovacao: "PENDENTE",
        concluido: false,
      }
    ];

    const mapa = gerarMapaCalendario(mock, dataReferencia); 
    expect(mapa["2026-08-26"]).toBeDefined();
    expect(mapa["2026-08-26"].inspecoes).toHaveLength(2);
    expect(mapa["2026-08-26"].temAtrasadas).toBe(true);
    expect(mapa["2026-08-26"].temPendentes).toBe(true);
  });
});