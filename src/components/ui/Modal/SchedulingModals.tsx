import CancelAgendamentoModal from "@/components/ui/Modal/CancelAgendamentoModal";
import ConfirmAgendamentoModal from "@/components/ui/Modal/ConfirmAgendamentoModal";
import SchedulingCancelMessage from "@/components/ui/Modal/SchedulingCancelMessage";
import SchedulingSuccessMessage from "@/components/ui/Modal/SchedulingSuccessMessage";
import type { useSchedulingModals } from "@/hooks/useSchedulingModals";

interface SchedulingModalsProps {
  modals: ReturnType<typeof useSchedulingModals>;
}

export default function SchedulingModals({ modals }: SchedulingModalsProps) {
  return (
    <>
      <ConfirmAgendamentoModal
        open={modals.confirmModalOpen}
        onClose={modals.closeConfirmModal}
        onConfirm={modals.handleConfirmAgendamento}
      />

      <CancelAgendamentoModal
        open={modals.cancelModalOpen}
        onClose={modals.closeCancelModal}
        onConfirm={modals.handleConfirmCancel}
      />

      <SchedulingSuccessMessage
        open={modals.successOpen}
        onClose={modals.closeSuccessMessage}
      />

      <SchedulingCancelMessage
        open={modals.cancelMessageOpen}
        onClose={modals.closeCancelMessage}
      />
    </>
  );
}
