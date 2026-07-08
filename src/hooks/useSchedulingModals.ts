import { useState } from "react";

export function useSchedulingModals() {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [cancelMessageOpen, setCancelMessageOpen] = useState(false);

  const openConfirmModal = () => setConfirmModalOpen(true);
  const closeConfirmModal = () => setConfirmModalOpen(false);

  const openCancelModal = () => setCancelModalOpen(true);
  const closeCancelModal = () => setCancelModalOpen(false);

  const handleConfirmAgendamento = () => {
    closeConfirmModal();
    setSuccessOpen(true);
  };

  const handleConfirmCancel = () => {
    closeCancelModal();
    setCancelMessageOpen(true);
  };

  return {
    confirmModalOpen,
    cancelModalOpen,
    successOpen,
    cancelMessageOpen,
    openConfirmModal,
    closeConfirmModal,
    openCancelModal,
    closeCancelModal,
    handleConfirmAgendamento,
    handleConfirmCancel,
    closeSuccessMessage: () => setSuccessOpen(false),
    closeCancelMessage: () => setCancelMessageOpen(false),
  };
}
