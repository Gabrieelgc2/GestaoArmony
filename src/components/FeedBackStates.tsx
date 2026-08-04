import { Loader2 } from "lucide-react";

export function LoadingState({ message = "Carregando..." }: { message?: string }) {
  return (
    <div className="flex h-64 w-full items-center justify-center gap-2 text-gray-500">
      <Loader2 className="h-6 w-6 animate-spin text-[#003D9B]" />
      <span>{message}</span>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="rounded-xl bg-red-50 p-6 text-center text-red-600">
      <p>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition"
        >
          Tentar novamente
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = "Nenhum registro encontrado." }: { message?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
      {message}
    </div>
  );
}