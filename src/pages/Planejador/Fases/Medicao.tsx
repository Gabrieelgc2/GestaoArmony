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

interface MedicaoProps {
  project: Project;
}

export default function Medicao({project}: MedicaoProps){
  const [medicaoDate, setMedicaoDate] = useState<Date>();
  const [responsavel, setResponsavel] = useState("");
  const [errors, setErrors] = useState({
      medicaoDate: "",
      responsavel: "",
    });
  
    function handleConfirm (){
        const newErrors = {
          medicaoDate: validateRequiredDate(medicaoDate),
          responsavel: validateRequiredResponsavel(responsavel),
        };
    
    
        setErrors(newErrors);
    
        if (errors.medicaoDate || errors.responsavel) {
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
          title="Fase: Medição"
          instructionLabel="Data da medicação"
          instructionDescription="Escolha a data prevista para a medicação."
          alertText="Após esta etapa, a medição será realizada."
          dateField={
            <DateInput
              value={medicaoDate}
              onChange={setMedicaoDate}
              error={errors.medicaoDate}
            />
          }
        />
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
