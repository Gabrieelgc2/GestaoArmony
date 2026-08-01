import { useState } from "react";
import AtribuirResponsavel from "../../../components/ui/AtribuirResponsavel";
import ButtonCancel from "../../../components/ui/Button/ButtonCancel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import ProjectCard from "../../../components/ui/ProjectCard";
import DateInput from "@/components/ui/DateInput";
import { validateRequiredDate, validateRequiredResponsavel } from "@/validations/etapaValidate";
import type { Project } from "@/types/project";

interface InstalacaoProps {
  project: Project;
}

export default function Instalacao({project}: InstalacaoProps) {
  const [instalacaoDate, setInstalacaoDate] = useState<Date>();
  const [responsavel, setResponsavel] = useState("");
  const [errors, setErrors] = useState({
    instalacaoDate: "",
    responsavel: "",
  });

  function handleConfirm (){
      const newErrors = {
        instalacaoDate: validateRequiredDate(instalacaoDate),
        responsavel: validateRequiredResponsavel(responsavel),
      };
  
  
      setErrors(newErrors);
  
      if (errors.instalacaoDate || errors.responsavel) {
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
          title="Fase: Instalação"
          instructionLabel="Instalação"
          instructionDescription="Escolha a data prevista para a instalação."
          alertText="Após esta etapa, o instalador será notificado."
          dateField={
            <DateInput
              value={instalacaoDate}
              onChange={setInstalacaoDate}
              error={errors.instalacaoDate}
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
