export interface DiaCalendarioInfo {
  inspecoes: any[];
  temAtrasadas: boolean;
  temPendentes: boolean;
  temConcluidas: boolean;
}

type InspecaoCalendario = {
  id?: string;
  inspetor_id?: string | null;
  data_prevista?: string | null;
  concluido?: boolean;
  status_aprovacao?: string | null;
};

export function isInspecaoAtiva(insp: Pick<InspecaoCalendario, "concluido" | "status_aprovacao">): boolean {
  return !insp.concluido && insp.status_aprovacao !== "RECUSADO";
}

export function extrairDataHorarioLocal(isoString: string): { data: string; hora: string } | null {
  if (!isoString) return null;

  const dataHora = new Date(isoString);
  if (Number.isNaN(dataHora.getTime())) return null;

  const year = dataHora.getFullYear();
  const month = String(dataHora.getMonth() + 1).padStart(2, "0");
  const day = String(dataHora.getDate()).padStart(2, "0");
  const hora = `${String(dataHora.getHours()).padStart(2, "0")}:${String(dataHora.getMinutes()).padStart(2, "0")}`;

  return { data: `${year}-${month}-${day}`, hora };
}

export function horariosConflitam(dataAgendada: string, horaAgendada: string, dataPrevista: string): boolean {
  const slot = extrairDataHorarioLocal(dataPrevista);
  if (!slot) return false;

  return slot.data === dataAgendada && slot.hora === horaAgendada;
}

export function inspetorTemConflito(
  inspetorId: string,
  inspecoes: InspecaoCalendario[],
  dataAgendada: string,
  horaAgendada: string,
  excluirInspecaoId?: string,
): boolean {
  return inspecoes.some((insp) => {
    if (insp.inspetor_id !== inspetorId) return false;
    if (excluirInspecaoId && insp.id === excluirInspecaoId) return false;
    if (!insp.data_prevista || !isInspecaoAtiva(insp)) return false;

    return horariosConflitam(dataAgendada, horaAgendada, insp.data_prevista);
  });
}

export function inspetorEstaDisponivel(
  inspetorId: string,
  inspecoes: InspecaoCalendario[],
  dataAgendada: string,
  horaAgendada: string,
  excluirInspecaoId?: string,
): boolean {
  return !inspetorTemConflito(inspetorId, inspecoes, dataAgendada, horaAgendada, excluirInspecaoId);
}

export function gerarMapaCalendario(inspecoes: any[], dataReferencia?: Date): Record<string, DiaCalendarioInfo> {
  const hoje = (dataReferencia || new Date()).getTime();
  const mapa: Record<string, DiaCalendarioInfo> = {};

  inspecoes.forEach((insp) => {
    const dataPrev = insp.data_prevista ? insp.data_prevista.split("T")[0] : null;
    if (!dataPrev) return;

    if (!mapa[dataPrev]) {
      mapa[dataPrev] = {
        inspecoes: [],
        temAtrasadas: false,
        temPendentes: false,
        temConcluidas: false,
      };
    }

    mapa[dataPrev].inspecoes.push(insp);

    if (!insp.concluido && insp.status_aprovacao !== "RECUSADO") {
      const dataInspecaoTimestamp = new Date(insp.data_prevista).getTime();

      if (dataInspecaoTimestamp < hoje) {
        mapa[dataPrev].temAtrasadas = true;
      } else {
        mapa[dataPrev].temPendentes = true;
      }
    } else if (insp.concluido) {
      mapa[dataPrev].temConcluidas = true;
    }
  });

  return mapa;
};