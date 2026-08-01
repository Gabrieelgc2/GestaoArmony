import { useState } from "react";
import AtribuirResponsavel from "../../../components/ui/AtribuirResponsavel";
import ButtonCancel from "../../../components/ui/Button/ButtonCancel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import ProjectCard from "../../../components/ui/ProjectCard";
import DateInput from "@/components/ui/DateInput";
import type { Project } from "@/types/project";
import { validateRequiredDate, validateRequiredResponsavel } from "@/validations/etapaValidate";

interface InstrucaoObraProps {
  project: Project;
}

export default function InstrucaoObra({ project }: InstrucaoObraProps) {
  const [instructionDate, setInstructionDate] = useState<Date>();
  const [responsavel, setResponsavel] = useState("");
  const [errors, setErrors] = useState({
    instructionDate: "",
    responsavel: "",
  });

  function handleConfirm() {

    const newErrors = {
      instructionDate: validateRequiredDate(instructionDate),
      responsavel: validateRequiredResponsavel(responsavel),
    };


    setErrors(newErrors);

    if (errors.instructionDate || errors.responsavel) {
      return;
    }

    // atualizar projeto
  }

  return (

    <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-23 pb-28">
      <main className="space-y-6">
        <Header>
          Agendamento
        </Header>
        <Card>
          <ProjectCard
            company={project.name_project}
            projectId={project.id}
            status={project.status}
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
              error={errors.instructionDate}
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
        <ButtonCancel>
          Cancelar e voltar
        </ButtonCancel>

      </main>
    </div>
  )
}