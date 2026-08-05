import { useState } from "react";
import AtribuirResponsavel from "../../../components/ui/AtribuirResponsavel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import ProjectCard from "../../../components/ui/ProjectCard";
import type { Project } from "@/types/project";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectService } from "../projectService";
import { useForm, Controller } from "react-hook-form";

interface EntregaObraProps {
    project: Project;
}

const EtapFinal = z.object({
    etapa_final_date: z.string().min(1, "Informe a data de agendamento da etapa final."),
    etapa_final_responsavel: z.string().min(1, "Informe o responsável pela etapa final."),
})

type FormData = z.infer<typeof EtapFinal>;

export default function EntregaObra({ project }: EntregaObraProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(EtapFinal),
        defaultValues: {
            etapa_final_date: project.etapa_final_date ? project.etapa_final_date.split("T")[0] : "",
            etapa_final_responsavel: project.etapa_final_responsavel || ""
        },
    });
    const onSubmit = async (data: FormData) => {
        try {
            setIsSubmitting(true);
            const payload = {
                etapa_final_date: data.etapa_final_date,
                etapa_final_responsavel: data.etapa_final_responsavel,
                status: "ETAPA_FINAL"
            };
            await projectService.updateProject(project.id, payload);
            alert("Dados atualizados com sucesso!");
            navigate("/painel");

        } catch (error) {
            alert("Ocorreu um erro ao atualizar os dados.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (

        <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-23 pb-28">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    title="Fase: Entrega de obra"
                    instructionLabel="Entrega de obra"
                    instructionDescription="Escolha a data prevista para a próxima fase."
                    alertText="Após esta etapa, o agendamento para a etapa final será realizada."   
                    dateField={
                        <div className="w-full space-y-1">
                            <input
                                type="date"
                                className={`w-full rounded-lg border bg-white p-3 text-sm outline-none ${errors.etapa_final_date ? "border-red-500" : "border-gray-300"
                                    }`}
                                {...register("etapa_final_date")}
                            />
                            {errors.etapa_final_date && (
                                <p className="text-xs text-red-500">
                                    {errors.etapa_final_date.message}
                                </p>
                            )}
                        </div>
                    }
                />
                <Controller
                    control={control}
                    name="etapa_final_responsavel"
                    render={({ field, fieldState }) => (
                        <AtribuirResponsavel
                            value={field.value}
                            onChange={field.onChange}
                            error={fieldState.error?.message}
                        />
                    )}
                />
                <ButtonConfirm type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Atualizando..." : "Confirmar agendamento"}
                </ButtonConfirm>
            </form>
        </div>
    )
}
