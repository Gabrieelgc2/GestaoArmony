import Modal from "./Modal";

interface ConfirmAgendamentoModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmAgendamentoModal({
  open,
  onClose,
  onConfirm,
}: ConfirmAgendamentoModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="space-y-6 pt-2">
        <h2 className="text-xl font-bold text-[#191C1E]">
          Confirmar agendamento
        </h2>

        <p className="text-base text-[#434654]">
          Você deseja mesmo confirmar o agendamento?
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-[#C3C6D6] py-3 font-semibold text-[#434654] transition hover:bg-[#BFC3D1]"
          >
            Não, voltar
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-xl bg-blue-800 py-3 font-semibold text-white transition hover:bg-blue-900"
          >
            Sim, confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
}
