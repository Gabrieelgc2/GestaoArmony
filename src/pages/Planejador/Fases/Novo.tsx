import Card from "@/components/ui/Card/Card";
import CardHeader from "@/components/ui/Card/CardHeader";
import Header from "@/components/ui/Header";
import LocalizacaoCard from "@/components/ui/LocalizacaoCard";
import ProjectCard from "@/components/ui/ProjectCard";
import type { Project } from "@/types/project";
import { HardHat } from "lucide-react";
import CronogramaCard from "../../../components/ui/CronogramaCard";
import { useState } from "react";
import ButtonConfirm from "@/components/ui/Button/ButtonConfirm";
import { projectService } from "../projectService";
import { useNavigate } from "react-router-dom";

interface NovoProps {
    project: Project;
}

export default function Novo({ project }: NovoProps) {
    const [location, setLocation] = useState<string>("");
    const [deadline, setDeadline] = useState<number>(project.production_deadline || 0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleConfirm = async () => {

        if(!location.trim() || !deadline) {
            alert("Por favor, informe o local de instalação e o prazo previsto.");
            return;
        }
        try {
            setIsSubmitting(true);

            const payload = {
                installation_location: location,
                production_deadline: deadline,
                status: "LIBERADO_TRABALHO"
            }

            await projectService.updateProject(project.id, payload);
            alert("Dados atualizados com sucesso!");
            navigate("/painel");

        } catch (error) {
            console.error("Erro ao atualizar os dados do projeto:", error);
            alert("Ocorreu um erro ao atualizar os dados do projeto. Por favor, tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
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

                <Card>
                    <CardHeader
                        variant="outlined"
                        icon={<HardHat />}
                        title={"Fase: Novo"}
                    />
                </Card>

                <LocalizacaoCard
                localizacao={location}
                onLocationChange={setLocation}
                />

                <CronogramaCard
                measurementDate={project?.medicao_date ? new Date(project.medicao_date) : null}
                productionDeadline={project?.production_deadline}
                onProductDeadlineChange={(value) => setDeadline(value)}
                />
                <ButtonConfirm
                onClick={handleConfirm}
                disabled={isSubmitting}
                className="rounded-xl bg-[#003D9B] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-900 disabled:opacity-50">
                {isSubmitting ? "Salvando..." : "Confirmar e avançar fase"}
                </ButtonConfirm>
            </main>
        </div>
    )
}