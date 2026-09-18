export interface Projeto{
id: string | number;
name_project?: string;
order_number?: string | number;
status: string;
}

export function filtrarProjetosPorBusca(projetos: Projeto[], busca: string): Projeto[] {
    const termoLimpo = busca.trim().toLowerCase();
    if(!termoLimpo) return projetos;
    return projetos.filter((p) => {
    const nomeMatch = p.name_project?.toLowerCase().includes(termoLimpo);
    const pedidoMatch = String(p.order_number ?? "").toLowerCase().includes(termoLimpo);
    return Boolean(nomeMatch || pedidoMatch);
    })
}