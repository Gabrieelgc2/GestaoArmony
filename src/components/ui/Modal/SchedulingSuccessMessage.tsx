import { CheckCircle2 } from "lucide-react";
import Modal from "./Modal";

interface SchedulingSuccessMessageProps {
  open: boolean;
  onClose: () => void;
}

export default function SchedulingSuccessMessage({
  open,
  onClose,
}: SchedulingSuccessMessageProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-6 pt-2 text-center">
        <div className="flex justify-center">
          <CheckCircle2
            size={48}
            className="text-green-600"
            strokeWidth={2}
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-[#191C1E]">
            Agendamento confirmado!
          </h2>

          <p className="text-base text-[#434654]">
            O agendamento foi confirmado com sucesso.
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
