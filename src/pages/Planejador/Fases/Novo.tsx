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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const novoProjectSchema = z.object({
    installation_location: z.string().trim().min(1, "Informe o local de instalação."),
    production_deadline: z.number({
    message: "Informe o prazo de produção.",
    }).positive("O prazo de produção deve ser maior que zero.")
})

type NovoProjectFormData = z.infer<typeof novoProjectSchema>;

interface NovoProps {
    project: Project;
}

export default function Novo({ project }: NovoProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NovoProjectFormData>({
        resolver: zodResolver(novoProjectSchema),
        defaultValues: {
            installation_location: project.installation_location || "",
            production_deadline: project.production_deadline || 0,
        }
    });

    const onSubmit = async (data: NovoProjectFormData) => {
        try {
            setIsSubmitting(true);

            const payload = {
                installation_location: data.installation_location,
                production_deadline: data.production_deadline,
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                        register={register}
                        errors={errors}
                    />

                    <CronogramaCard
                        register={register}
                        errors={errors}
                    />
                    <ButtonConfirm
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-xl bg-[#003D9B] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-900 disabled:opacity-50">
                        {isSubmitting ? "Salvando..." : "Confirmar e avançar fase"}
                    </ButtonConfirm>
                </main>
            </form>
        </div>
    )
}