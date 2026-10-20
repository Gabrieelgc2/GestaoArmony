export type StatusObra = 'Todos' | 'Recusados' | 'Em revisão' | 'Liberado'

export interface Obra {
    id: string;
    numero: string;
    nomeCliente: string;
    subtituloStatus?: string;
    status: StatusObra;
}