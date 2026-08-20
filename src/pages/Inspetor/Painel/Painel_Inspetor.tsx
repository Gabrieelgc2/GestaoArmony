import { usePainelInspetor } from "@/hooks/Inspetor/usePainelInspetor";
import { InspecaoCard } from "./InspecaoCard";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export default function PainelInspetor() {
  const hook = usePainelInspetor();
  const { signOut, isLoggingOut } = useAuth();

  if (hook.loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  const pendentes = hook.inspecoes.filter((i) => !i.concluido).length;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      <header className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Painel de Vistorias do Inspetor</h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Bem-vindo, <span className="font-semibold text-gray-800">{hook.userProfile?.full_name}</span>
            <button
            onClick={signOut}
            disabled={isLoggingOut}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-gray-50 hover:bg-rose-50 text-gray-700 hover:text-rose-600 active:scale-95 text-xs font-bold rounded-xl border border-gray-200 hover:border-rose-200 transition cursor-pointer disabled:opacity-50"
            title="Encerrar Sessão"
          >
            <LogOut size={16} />
            <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>
          </button>
          </p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-lg border border-blue-200 self-start sm:self-auto">
          {pendentes} vistorias pendentes
        </span>
      </header>

      <div className="space-y-4">
        {hook.inspecoes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
            Nenhuma vistoria atribuída a você no momento.
          </div>
        ) : (
          hook.inspecoes.map((inspecao) => (
            <InspecaoCard key={inspecao.id} inspecao={inspecao} hook={hook} />
          ))
        )}
      </div>
    </div>
  );
}