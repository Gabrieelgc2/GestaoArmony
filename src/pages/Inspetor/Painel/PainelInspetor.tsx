import { usePainelInspetor } from "@/hooks/Inspetor/usePainelInspetor";
import { CalendarioInspetor } from "@/pages/Inspetor/Painel/CalendarioInspetor";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export function PainelInspetor() {
  const hook = usePainelInspetor();
  const { inspecoes, loading, userProfile } = hook;
  const { signOut, isLoggingOut } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-sm text-gray-500 font-medium">Carregando calendário...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Cabeçalho simples */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-3">
        <div>
        <h1 className="text-lg font-bold text-gray-900">Agenda de Vistorias</h1>
        <p className="text-xs text-gray-500">
          Olá, {userProfile?.full_name || "Inspetor"}
        </p>
        </div>
        <button
          onClick={signOut}
          disabled={isLoggingOut}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-50 hover:bg-rose-50 text-gray-700 hover:text-rose-600 active:scale-95 text-xs font-bold rounded-xl border border-gray-200 hover:border-rose-200 transition cursor-pointer disabled:opacity-50"
          title="Encerrar Sessão"
        >
          <LogOut size={16} />
          <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
        </button>
        </div>

      <CalendarioInspetor inspecoes={inspecoes} hook={hook} />
    </div>
  );
}