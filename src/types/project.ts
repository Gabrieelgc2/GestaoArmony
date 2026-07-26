export interface Project {
  id: number;
  name: string;
  orderNumber: string;
  productiondeadline?: number | null;
  installationLocation?: string | null;
  status: ProjectStatus;
}

export type ProjectStatus =
  | "novo"
  | "liberado"
  | "instrucao-obra"
  | "medicao"
  | "pre-instalacao"
  | "pos-instalacao"
  | "entrega";