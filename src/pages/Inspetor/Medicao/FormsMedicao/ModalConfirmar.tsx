import { AlertTriangle, X } from "lucide-react";

interface ModalConfirmacaoProps {
  isOpen: boolean;
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  aoConfirmar: () => void;
  aoCancelar: () => void;
}

export function ModalConfirmacao({
  isOpen,
  titulo,
  mensagem,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  aoConfirmar,
  aoCancelar,
}: ModalConfirmacaoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <button
          aria-label="Fechar"
          type="button"
          onClick={aoCancelar}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1 rounded-lg hover:bg-gray-100"
        >
        <X size={18} />
        </button>

        <div className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
          <AlertTriangle size={24} />
          </div>
          <h3 className="text-base font-black text-gray-900 mb-1">{titulo}</h3>
          <p className="text-xs text-gray-500 leading-relaxed mb-6">{mensagem}</p>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={aoCancelar}
              className="px-4 py-2.5 text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition cursor-pointer"
            >
              {textoCancelar}
            </button>
            <button
              type="button"
              onClick={aoConfirmar}
              className="px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition cursor-pointer shadow-sm shadow-rose-200"
            >
              {textoConfirmar}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}