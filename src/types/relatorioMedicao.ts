export interface ItemMedicaoForm {
  id?: string;
  descricao_item: string;
  quantidade: number | "";
  largura: number | "";
  altura: number | "";
  peitoril: number | "";
  giro: string;
  tem_chave: boolean;
  nao_drenar: boolean;
  tem_pelicula: boolean;
  calhas: "1_CALHA" | "2_CALHAS" | null;
  soleira_porta_giro: "SEM" | "COM" | null;
  acabamento: "EIXO_VAO" | "FACEADO_VAO" | null;
  trilho_especial: "SOLEIRA_PRIME" | "TRILHO_INVISIVEL" | null;
  observacao_item: string;
}

export interface GuiaMedicaoCompleta {
  observacoesGerais: string;
  itens: ItemMedicaoForm[];
  fotos: File[];
}

export interface RelatorioPayload extends GuiaMedicaoCompleta {
  projetoId: string;
  inspecaoId: string;
}

export const GUIA_CONFIG = {
    calhas: [
        { valor: "UMA_CALHA", titulo: "1 Calha", imagemUrl: "/guia/1_calha.jpeg" },
        { valor: "DUAS_CALHAS", titulo: "2 Calhas", imagemUrl: "/guia/2_calha.jpeg" }
    ],
    soleiras: [
        { valor: "SEM" , titulo: "Sem Soleira", imagemUrl: "/guia/sem_soleira.jpeg" },
        { valor: "COM" , titulo: "Com Soleira", imagemUrl: "/guia/com_soleira.jpeg" }
    ],
    acabamentos: [
        { valor: "EIXO_VAO", titulo: "Eixo do Vão", imagemUrl: "/guia/eixo_vao.png" },
        { valor: "FACEADO_VAO", titulo: "Faceado do Vão", imagemUrl: "/guia/faceado_vao.jpeg" }
    ],
    trilhos: [
        { valor: "TRILHO_PRIME", titulo: "Trilho Prime", imagemUrl: "/guia/Trilho_prime.jpeg" },
        { valor: "TRILHO_INVISIVEL", titulo: "Trilho Invisível", imagemUrl: "/guia/Trilho_invisivel.png" }
    ],
};