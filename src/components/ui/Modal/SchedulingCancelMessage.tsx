import { XCircle } from "lucide-react";
import Modal from "./Modal";

interface SchedulingCancelMessageProps {
  open: boolean;
  onClose: () => void;
}

export default function SchedulingCancelMessage({
  open,
  onClose,
}: SchedulingCancelMessageProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-6 pt-2 text-center">
        <div className="flex justify-center">
          <XCircle
            size={48}
            className="text-[#FF5630]"
            strokeWidth={2}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#191C1E]">
            Agendamento cancelado
          </h2>

          <p className="text-base text-[#434654]">
            O agendamento foi cancelado. Nenhuma alteração foi salva.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-xl bg-blue-800 py-3 font-semibold text-white transition hover:bg-blue-900"
        >
          Entendi
        </button>
      </div>
    </Modal>
  );
}
