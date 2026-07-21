import { useState } from "react";
import Checkbox from "../../../components/Checkbox/Checkbox";
import AtribuirResponsavel from "../../../components/ui/AtribuirResponsavel";
import ButtonCancel from "../../../components/ui/Button/ButtonCancel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import ProjectCard from "../../../components/ui/ProjectCard";
import DateInput from "@/components/ui/DateInput";
import { useSchedulingForm } from "@/hooks/useSchedulingForm";
import { useSchedulingModals } from "@/hooks/useSchedulingModals";
import SchedulingModals from "@/components/ui/Modal/SchedulingModals";

export default function InstrucaoObra() {
  const [instructionDate, setInstructionDate] = useState<Date>();
  const [instructionMedicaoDate, setInstructionMedicaoDate] = useState<Date>();
  const { responsavel, setResponsavel, errors, validate } = useSchedulingForm();
  const schedulingModals = useSchedulingModals();
  const { openConfirmModal, openCancelModal } = schedulingModals;

  const handleConfirm = () => {
    if (validate(instructionDate)) {
      openConfirmModal();
    }
  };

  return (

    <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-23 pb-28">
      <main className="space-y-6">
        <Header>
          Agendamento
        </Header>
        <Card>
          <ProjectCard
            company="Alpha Construction Ltd."
            projectId="#ORD-2024-0892"
            status="Aguardando Agenda"
          />
        </Card>
        <Fase
          title="Fase: Instrução de Obra"
          instructionLabel="Instrução de obra"
          instructionDescription="Data obrigatória para visita técnica e orientações iniciais."
          alertText="A realização da Instrução de Obra é mandatória para o avanço do cronograma na plataforma."
          dateField={
            <DateInput
              value={instructionDate}
              onChange={setInstructionDate}
              error={errors.date}
            />
          }
        >
          <hr className="my-6 border-gray-600" />

          <p className="text-sm text-black/80 font-semibold">
            Medição campo (opcional)
          </p>

          <Checkbox label="Medição feita?" />

          <DateInput
            value={instructionMedicaoDate}
            onChange={setInstructionMedicaoDate}
          />
        </Fase>
        
        <AtribuirResponsavel
          value={responsavel}
          onChange={setResponsavel}
          error={errors.responsavel}
        />

        <ButtonConfirm onClick={handleConfirm}>
          Confirmar agendamento
        </ButtonConfirm>
        <ButtonCancel onClick={openCancelModal}>
          Cancelar e voltar
        </ButtonCancel>
        
      </main>
      <SchedulingModals modals={schedulingModals} />
    </div>
  )
}