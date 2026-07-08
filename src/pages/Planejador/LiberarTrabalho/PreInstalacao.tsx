import { useState } from "react";
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

export default function PreInstalacao() {
    const [preInstalacao, setPreInstalacao] = useState<Date>();
    const { responsavel, setResponsavel, errors, validate } = useSchedulingForm();
    const schedulingModals = useSchedulingModals();
    const { openConfirmModal, openCancelModal } = schedulingModals;

    const handleConfirm = () => {
        if (validate(preInstalacao)) {
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
                    title="Fase: Pré-instalação"
                    instructionLabel="Pré-instalação"
                    instructionDescription="Escolha a data prevista para o início da preparação da instalação."
                    alertText="A etapa de pré-instalação garante que o local esteja preparado para receber a equipe de instalação."
                    dateField={
                        <DateInput
                            value={preInstalacao}
                            onChange={setPreInstalacao}
                            error={errors.date}
                        />
                    }
                >
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
