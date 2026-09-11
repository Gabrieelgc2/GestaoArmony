import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePainelPlanejador } from "@/hooks/Planejador/usePainelPlanejador";
import { CalendarioPlanejador } from "./CalendarioPlanejador";

export default function AgendaPlanejadorPage() {
  const navigate = useNavigate();
  const hook = usePainelPlanejador();

  if (hook.loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer"
      >
        <ArrowLeft size={16} /> Voltar para o Kanban
      </button>

      <CalendarioPlanejador hook={hook} />
    </div>
  );
}