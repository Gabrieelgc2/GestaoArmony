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

interface PreInstalacaoProps{
    project: Project;
}

export default function PreInstalacao({project}: PreInstalacaoProps) {
    const [preInstalacao, setPreInstalacao] = useState<Date>();
    const [responsavel, setResponsavel] = useState("");
    const [errors, setErrors] = useState({
              preInstalacao: "",
              responsavel: "",
            });
          
            function handleConfirm (){
                const newErrors = {
                  preInstalacao: validateRequiredDate(preInstalacao),
                  responsavel: validateRequiredResponsavel(responsavel),
                };
            
            
                setErrors(newErrors);
            
                if (errors.preInstalacao || errors.responsavel) {
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
                    title="Fase: Pré-instalação"
                    instructionLabel="Pré-instalação"
                    instructionDescription="Escolha a data prevista para o início da preparação da instalação."
                    alertText="A etapa de pré-instalação garante que o local esteja preparado para receber a equipe de instalação."
                    dateField={
                        <DateInput
                            value={preInstalacao}
                            onChange={setPreInstalacao}
                            error={errors.preInstalacao}
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
