import type { ReactNode } from "react";
import Modal from "./Modal";

interface AgendamentoModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title: string;
  description: string;
  confirmText: string;
  cancelText?: string;
  children?: ReactNode
}

export default function AgendamentoModal({
  open,
  onClose,
  onConfirm,
  title,
  description, 
  confirmText,
  cancelText= "Não, voltar",
  children
}: AgendamentoModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-6 pt-2">
        <h2 className="text-xl font-bold text-[#191C1E]">
          {title}
        </h2>

        <p className="text-base text-[#434654]">
          {description}
        </p>

        {children}    
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#C3C6D6] py-3 font-semibold text-[#434654] transition hover:bg-[#BFC3D1]"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-xl bg-blue-800 py-3 font-semibold text-white transition hover:bg-blue-900"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
