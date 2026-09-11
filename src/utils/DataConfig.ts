export const formatarDataHora = (data?: string | null) => {
  if (!data) return "--/--/---- --:--";
  return new Date(data).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo"
  });
};

export const formatarDataSimples = (data?: string | null) => 
  data ? new Date(data).toLocaleDateString("pt-BR", { timeZone: "UTC" }) : "-";