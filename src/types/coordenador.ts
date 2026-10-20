export type StatusObra = 'Todos' | 'Recusados' | 'Em revisão' | 'Liberado'

export interface ObraCoordenador {
    id: string;
    numero: string;
    nomeCliente: string;
    subtituloStatus?: string;
    status: StatusObra;
}