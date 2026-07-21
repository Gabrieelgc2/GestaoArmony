import type { useSchedulingModals } from "@/hooks/useSchedulingModals";
import { CheckCircle2, XCircle } from "lucide-react";

import AgendamentoModal from "./AgendamentoModal";
import SchedulingMessage from "@/components/ui/Modal/SchedulingMessage";
import type { Project } from "@/types/project";

interface SchedulingModalsProps {
  modals: ReturnType<typeof useSchedulingModals>;
  project: Project | null;
}

export default function SchedulingModals({ modals, project }: SchedulingModalsProps) {
  return (
    <>
      <AgendamentoModal
        open={modals.confirmModalOpen}
        onClose={modals.closeConfirmModal}
        onConfirm={modals.handleConfirmAgendamento}
        title="Resumo das informações"
        description="Confira se as informações estão corretas."
        confirmText="Sim, confirmar"
      >
        <div className="rounded-xl border border-[#DFE1E6] p-4 space-y-4">
          <div>
            <p className="text-base text-[#737685]">
              Nome do projeto
            </p>
            <p className="font-semibold text-[#191C1E]">
              {project?.name}
            </p>
          </div>
          <hr />
          <p className="font-semibold text-[#191C1E]">
            Prazo acordado:{" "}
            {project?.productiondeadline != null ? (
              `${project.productiondeadline} dias`
            ) : (
              <span className="text-red-600">
                Informe o prazo acordado
              </span>
            )}
          </p>

          <hr />

          <div>
            <p className="text-sm text-[#737685]">
              Local de instalação
            </p>

            <p className="font-semibold text-[#191C1E]">
              {project?.installationLocation}
            </p>
          </div>

          <hr />
          <div>
            <p className="text-sm text-[#737685]">
              Número do pedido
            </p>
            <p className="font-semibold text-[#191C1E]">
              {project?.orderNumber}
            </p>
          </div>
        </div>
      </AgendamentoModal>

      <AgendamentoModal
        open={modals.cancelModalOpen}
        onClose={modals.closeCancelModal}
        onConfirm={modals.handleConfirmCancel}
        title="Cancelar agendamento"
        description="Você deseja mesmo cancelar?"
        confirmText="Sim, cancelar"
      />

      <SchedulingMessage
        open={modals.successOpen}
        onClose={modals.closeSuccessMessage}
        title="Agendamento confirmado!"
        description="O agendamento foi confirmado com sucesso."
        icon={<CheckCircle2 size={48} className="text-green-600" />}
        buttonText="Entendi"
      />

      <SchedulingMessage
        open={modals.cancelMessageOpen}
        onClose={modals.closeCancelMessage}
        title="Agendamento cancelado"
        description="O agendamento foi cancelado. Nenhuma alteração foi salva."
        icon={<XCircle size={48} className="text-[#FF5630]" />}
        buttonText="Entendi"
      />
    </>
  );
}