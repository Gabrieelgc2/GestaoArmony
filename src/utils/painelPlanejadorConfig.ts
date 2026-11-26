export type FaseKey =
  | "NOVO"
  | "INSTRUCAO_OBRA"
  | "MEDICAO"
  | "COORDENADOR TÉCNICO"
  | "PRODUCAO"
  | "VISTORIA PRÉ-INSTALAÇÃO"
  | "ENTREGA_OBRA"

export type Profile = { id: string; nome: string };
export type NomeEngenheiro = { nome: string };

export type Inspecao = {
  id: string;
  fase: FaseKey;
  data_prevista: string;
  data_realizada: string;
  justificativa: string | null;
  concluido: boolean;
  status_aprovacao: string | null;
  inspetor_id: string | null;
};

export type UsuarioPerfis ={
  id: string;
  nome: string;
  usuario_perfil: { perfil_codigo: string }[];
}

export interface Empresas{
  nome: string;
}

export interface Projeto extends Empresas {
  hetmo: string;
  numero: number;
  installation_location: string | null;
  prazo_acordado_dias: number | null;
  contato_client: string | null;
  data_limite_entrega: string | null;
  data_liberacao_producao: string | null;
  clients: Empresas | null;
  status: FaseKey;
  inspections?: Inspecao[] | null;
};

export type FaseConfig = { key: FaseKey; label: string; color: string };

export const FASES_CONFIG: FaseConfig[] = [
  { key: "NOVO", label: "Novo", color: "bg-slate-100 text-slate-800 border-slate-300" },
  { key: "INSTRUCAO_OBRA", label: "Instrução de Obra", color: "bg-blue-50 text-blue-800 border-blue-200" },
  { key: "MEDICAO", label: "Medição", color: "bg-amber-50 text-amber-800 border-amber-200" },
  // { key: "COORDENADOR TÉCNICO", label: "COORDENADOR TÉCNICO", color: "bg-amber-50 text-amber-800 border-amber-200"},
  // { key: "VISTORIA PRÉ-INSTALAÇÃO", label: "VISTORIA PRÉ-INSTALAÇÃO", color: "bg-indigo-50 text-indigo-800 border-indigo-200" },
  // { key: "PRODUCAO", label: "Produção", color: "bg-purple-50 text-purple-800 border-purple-200" },
  // { key: "ENTREGA_OBRA", label: "Entrega da Obra", color: "bg-emerald-50 text-emerald-800 border-emerald-200" },
];

export const ORDEM_FASES = FASES_CONFIG.map((fase) => fase.key);

export function getProximoStatus(statusAtual: FaseKey): FaseKey | null {
  const indiceAtual = ORDEM_FASES.indexOf(statusAtual);
  return ORDEM_FASES[indiceAtual + 1] ?? null;
}
