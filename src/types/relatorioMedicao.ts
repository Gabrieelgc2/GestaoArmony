export type OpcaoCalha = "UMA_CALHA" | "DUAS_CALHAS"
export type OpcaoSoleira = "COM" | "SEM"
export type OpcaoAcabamento = "EIXO_VAO" | "FACEADO_VAO"
export type OpcaoTrilho = "TRILHO_PRIME" | "TRILHO_INVISIVEL"

export interface GuiaMedicaoForm {
    calhas: OpcaoCalha | null;
    soleira_porta_giro: OpcaoSoleira | null;
    acabamento: OpcaoAcabamento | null;
    trilho_especial: OpcaoTrilho | null;
    observacoes: string;
}

export interface ItemSelecaoVisual<T>{
    valor: T;
    titulo: string;
    imagemUrl: string;
}

export interface RelatorioPayload extends GuiaMedicaoForm {
  projetoId: string;
  inspecaoId: string;
}

export const GUIA_CONFIG = {
    calhas: [
        { valor: "UMA_CALHA" as OpcaoCalha, titulo: "1 Calha", imagemUrl: "/guia/1_calha.jpeg" },
        { valor: "DUAS_CALHAS" as OpcaoCalha, titulo: "2 Calhas", imagemUrl: "/guia/2_calha.jpeg" }
    ],
    soleiras: [
        { valor: "SEM" as OpcaoSoleira, titulo: "Sem Soleira", imagemUrl: "/guia/com_soleira.jpeg" },
        { valor: "COM" as OpcaoSoleira, titulo: "Com Soleira", imagemUrl: "/guia/sem_soleira.jpeg" }
    ],
    acabamentos: [
        { valor: "EIXO_VAO" as OpcaoAcabamento, titulo: "Eixo do Vão", imagemUrl: "/guia/eixo_vao.png" },
        { valor: "FACEADO_VAO" as OpcaoAcabamento, titulo: "Faceado do Vão", imagemUrl: "/guia/faceado_vao.jpeg" }
    ],
    trilhos: [
        { valor: "TRILHO_PRIME" as OpcaoTrilho, titulo: "Trilho Prime", imagemUrl: "/guia/Trilho_prime.jpeg" },
        { valor: "TRILHO_INVISIVEL" as OpcaoTrilho, titulo: "Trilho Invisível", imagemUrl: "/guia/Trilho_invisivel.png" }
    ],
};