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

interface PosInstalacaoProps{
    project: Project;
}

export default function PosInstalacao({project}: PosInstalacaoProps ){
    const [posInstalacao, setPosInstalacao] = useState<Date>();
    const [responsavel, setResponsavel] = useState("");
    const [errors, setErrors] = useState({
          posInstalacao: "",
          responsavel: "",
        });
      
        function handleConfirm (){
            const newErrors = {
              posInstalacao: validateRequiredDate(posInstalacao),
              responsavel: validateRequiredResponsavel(responsavel),
            };
        
        
            setErrors(newErrors);
        
            if (errors.posInstalacao || errors.responsavel) {
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
                    title="Fase: Pós-instalação"
                    instructionLabel="Pós-instalação"
                    instructionDescription="Escolha a data prevista para a vistoria e conclusão dos serviços."
                    alertText="Após a pós-instalação, será realizada a validação final dos serviços executados antes do encerramento da obra."
                    dateField={
                        <DateInput
                            value={posInstalacao}
                            onChange={setPosInstalacao}
                            error={errors.posInstalacao}
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
