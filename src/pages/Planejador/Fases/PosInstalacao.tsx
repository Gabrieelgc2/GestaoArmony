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

interface PosInstalacaoProps {
    project: Project;
}

const posInstalacaoSchema = z.object({
    pos_instalacao_date: z.string().min(1, "Informe a data de agendamento da entrega de obra."),
    pos_instalacao_responsavel: z.string().min(1, "Informe o responsável pela entrega de obra."),
})

type FormData = z.infer<typeof posInstalacaoSchema>;

export default function PosInstalacao({ project }: PosInstalacaoProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(posInstalacaoSchema),
        defaultValues: {
            pos_instalacao_date: project.pos_instalacao_date ? project.pos_instalacao_date.split("T")[0] : "",
            pos_instalacao_responsavel: project.pos_instalacao_responsavel || ""
        },
    });
    const onSubmit = async (data: FormData) => {
        try {
            setIsSubmitting(true);
            const payload = {
                pos_instalacao_date: data.pos_instalacao_date,
                pos_instalacao_responsavel: data.pos_instalacao_responsavel,
                status: "POS_INSTALACAO"
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
                    title="Fase: Pós-instalação"
                    instructionLabel="Pós-instalação"
                    instructionDescription="Escolha a data prevista para a próxima fase."
                    alertText="Após esta etapa, o agendamento para a entrega de obra será realizada."   
                    dateField={
                        <div className="w-full space-y-1">
                            <input
                                type="date"
                                className={`w-full rounded-lg border bg-white p-3 text-sm outline-none ${errors.pos_instalacao_date ? "border-red-500" : "border-gray-300"
                                    }`}
                                {...register("pos_instalacao_date")}
                            />
                            {errors.pos_instalacao_date && (
                                <p className="text-xs text-red-500">
                                    {errors.pos_instalacao_date.message}
                                </p>
                            )}
                        </div>
                    }
                />
                <Controller
                    control={control}
                    name="pos_instalacao_responsavel"
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