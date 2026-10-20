export interface ObraNotificar {
    id: string;
    nome: string;
    data_prevista: string;
}

export function gerarPayloadNotificacao(obra: ObraNotificar) {
    const agora = new Date();
    const dataPrevista = new Date(obra.data_prevista);

    agora.setHours(0, 0, 0, 0);
    dataPrevista.setHours(0, 0, 0, 0);

    const diferencaMs = dataPrevista.getTime() - agora.getTime();
    const diasRestantes = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));
    if (diasRestantes > 10) return null;
    if (diasRestantes < 0) {
        const diasAtraso = Math.abs(diasRestantes);
        return {
            prioridade: 1,
            titulo: `🚨 OBRA ATRASADA (${diasAtraso}d)!`,
            corpo: `A obra "${obra.nome}" está atrasada em ${diasAtraso} dias. Verifique o andamento e tome as medidas necessárias.`,
            tag: `obra-atrasada-${obra.id}`,
            requireInteraction: true,
            vibrate: [300, 100, 300, 100, 300]
        };
    }
    if (diasRestantes <= 1) {
        const textoPrazo = diasRestantes === 0 ? "vence HOJE" : "vence AMANHÃ";
        return {
            prioridade: 2,
            titulo: `⚠️ ATENÇÃO: Obra ${textoPrazo}!`,
            corpo: `A obra "${obra.nome}" ${textoPrazo}. Verifique o andamento e tome as medidas necessárias.`,
            tag: `obra-prazo-${obra.id}`,
            requireInteraction: false,
            vibrate: [200, 100, 200]
        };
    }
    if (diasRestantes <= 10) {
        return {
            prioridade: 3,
            titulo: `📅 Lembrete de Obra (${diasRestantes} dias restantes)`,
            corpo: `A obra "${obra.nome}" tem ${diasRestantes} dias restantes para o prazo final. Fique atento ao andamento.`,
            tag: `obra-lembrete-${obra.id}`,
            requireInteraction: false,
            vibrate: [100, 50, 100]
        };
    }
}