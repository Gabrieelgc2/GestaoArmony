import { AlertTriangle, CheckCircle2, Clock } from "lucide-react";

export function StatusBadge({ concluido, atrasada }: { concluido: boolean; atrasada: boolean }) {  if (!concluido && atrasada) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold rounded-lg bg-rose-100/80 text-rose-700 border border-rose-300 animate-pulse uppercase tracking-wide">
        <AlertTriangle size={14} className="stroke-[2.5]" />
        Atrasada
      </span>
    );
  }
  if (concluido) {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold rounded-lg bg-emerald-100/80 text-emerald-700 border border-emerald-300 uppercase tracking-wide">
        <CheckCircle2 size={14} className="stroke-[2.5]" />
        Concluído
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold rounded-lg bg-amber-100/80 text-amber-800 border border-amber-300 uppercase tracking-wide">
      <Clock size={14} className="stroke-[2.5]" />
      Pendente
    </span>
  );
}