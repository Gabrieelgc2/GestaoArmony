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

interface EntregaObraProps{
    project: Project;
}

export default function EntregaObra({project}: EntregaObraProps) {
    const [entregaDate, setEntregaDate] = useState<Date>();
    const [responsavel, setResponsavel] = useState("");
     const [errors, setErrors] = useState({
        entregaDate: "",
        responsavel: "",
      });
    
      function handleConfirm (){
          const newErrors = {
            entregaDate: validateRequiredDate(entregaDate),
            responsavel: validateRequiredResponsavel(responsavel),
          };
      
      
          setErrors(newErrors);
      
          if (errors.entregaDate || errors.responsavel) {
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
                        company={project.name}
                        projectId={project.id}
                        status={project.status}
                    />
                </Card>
                <Fase
                    title="Fase: Entrega de Obra"
                    instructionLabel="Entrega de obra"
                    instructionDescription="Escolha a data prevista para a entrega da obra ao cliente."
                    alertText="Após a confirmação da entrega da obra, esta etapa será registrada e o cronograma será atualizado."
                    dateField={
                        <DateInput
                            value={entregaDate}
                            onChange={setEntregaDate}
                            error={errors.entregaDate}
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
