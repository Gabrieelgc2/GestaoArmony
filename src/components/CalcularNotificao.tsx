export interface ObraNotificar {
  id: string;
  nome: string;
  data_prevista: string;
}

export function gerarPayloadNotificacao(obra: ObraNotificar) {
  if (!obra.data_prevista) return null;

  const parteData = obra.data_prevista.split(" ")[0]; 
  const [ano, mes, dia] = parteData.split("-").map(Number);
  const dataPrevista = new Date(ano, mes - 1, dia);

  const agora = new Date();
  agora.setHours(0, 0, 0, 0);

  const diferencaMs = dataPrevista.getTime() - agora.getTime();
  const diasRestantes = Math.round(diferencaMs / (1000 * 60 * 60 * 24));

  if (diasRestantes < 0) {
    const diasAtraso = Math.abs(diasRestantes);
    return {
      prioridade: 1,
      titulo: `🚨 OBRA ATRASADA (${diasAtraso}d)!`,
      options: {
        body: `A obra "${obra.nome}" está atrasada em ${diasAtraso} dias. Verifique o andamento!`,
        tag: `obra-atrasada-${obra.id}`,
        requireInteraction: true,
        vibrate: [300, 100, 300, 100, 300],
        icon: "/pwa-192.png",
        data: { url: `/obras/${obra.id}` }
      }
    };
  }

  if (diasRestantes <= 1) {
    const textoPrazo = diasRestantes === 0 ? "vence HOJE" : "vence AMANHÃ";
    return {
      prioridade: 2,
      titulo: `⚠️ ATENÇÃO: Obra ${textoPrazo}!`,
      options: {
        body: `A obra "${obra.nome}" ${textoPrazo}. Tome as medidas necessárias.`,
        tag: `obra-prazo-${obra.id}`,
        requireInteraction: false,
        vibrate: [200, 100, 200],
        icon: "/pwa-192.png",
        data: { url: `/obras/${obra.id}` }
      }
    };
  }

  if (diasRestantes <= 10) {
    return {
      prioridade: 3,
      titulo: `📅 Lembrete de Obra (${diasRestantes} dias restantes)`,
      options: {
        body: `A obra "${obra.nome}" tem ${diasRestantes} dias restantes para o prazo final.`,
        tag: `obra-lembrete-${obra.id}`,
        requireInteraction: false,
        vibrate: [100, 50, 100],
        icon: "/pwa-192.png",
        data: { url: `/obras/${obra.id}` }
      }
    };
  }

  return null;
}