import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#DFE1E6] bg-white p-6 shadow-lg">
        <button
          type="button"
          aria-label="Fechar"
          className="absolute right-4 top-4 text-[#737685] transition hover:text-[#191C1E]"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </div>
  );
}
