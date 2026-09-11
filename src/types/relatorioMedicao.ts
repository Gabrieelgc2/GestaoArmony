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
        { valor: "UMA_CALHA" as OpcaoCalha, titulo: "1 Calha", imagemUrl: "/images/guia-medicao/calha-1.png" },
        { valor: "DUAS_CALHAS" as OpcaoCalha, titulo: "2 Calhas", imagemUrl: "/images/guia-medicao/calha-2.png " }
    ],
    soleiras: [
        { valor: "SEM" as OpcaoSoleira, titulo: "Sem Soleira", imagemUrl: "/images/guia-medicao/soleira-sem.png" },
        { valor: "COM" as OpcaoSoleira, titulo: "Com Soleira", imagemUrl: "/images/guia-medicao/soleira-com.png" }
    ],
    acabamentos: [
        { valor: "EIXO_VAO" as OpcaoAcabamento, titulo: "Eixo do Vão", imagemUrl: "/images/guia-medicao/acabamento-eixo.png" },
        { valor: "FACEADO_VAO" as OpcaoAcabamento, titulo: "Faceado do Vão", imagemUrl: "/images/guia-medicao/acabamento-faceado.png" }
    ],
    trilhos: [
        { valor: "TRILHO_PRIME" as OpcaoTrilho, titulo: "Trilho Prime", imagemUrl: "/images/guia-medicao/trilho-prime.png" },
        { valor: "TRILHO_INVISIVEL" as OpcaoTrilho, titulo: "Trilho Invisível", imagemUrl: "/images/guia-medicao/trilho-invisivel.png" }
    ],
};