export type UserRole = "engenheiro" | "master" | "planejador";

export const roleHomeRoutes: Record<UserRole, string> = {
  planejador: "/planejador",
  engenheiro: "/inspetor",
  master: "/administrador",
};

export const roleLabels: Record<UserRole, string> = {
  planejador: "Planejador",
  engenheiro: "Engenheiro",
  master: "Master",
};

export const isUserRole = (role: string): role is UserRole =>
  role === "planejador" || role === "engenheiro" || role === "master";