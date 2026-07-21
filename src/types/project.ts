export type ProjectCategory = "novo" | "liberado" | "em_andamento";

export interface Project {
  id: string;
  name: string;
  orderNumber: string;
  installationLocation: string;
  productiondeadline?: number;
}

export interface ProjectCategoryTab {
  id: ProjectCategory;
  label: string;
}

export const PROJECT_CATEGORY_TABS: ProjectCategoryTab[] = [
  { id: "novo", label: "Novos" },
  { id: "liberado", label: "Liberados para trabalhar" },
  { id: "em_andamento", label: "Em andamento" },
];

