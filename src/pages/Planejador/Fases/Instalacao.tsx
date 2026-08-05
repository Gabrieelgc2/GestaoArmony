import { useState } from "react";
import AtribuirResponsavel from "../../../components/ui/AtribuirResponsavel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import ProjectCard from "../../../components/ui/ProjectCard";
import type { Project } from "@/types/project";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectService } from "../projectService";

interface InstalacaoProps {
  project: Project;
}

const InstalacaoSchema = z.object({
  instalacao_date: z.string().min(1, "Informe a data de agendamento da instalação."),
  instalacao_responsavel: z.string().min(1, "Informe o responsável pela instalação."),
})

type FormData = z.infer<typeof InstalacaoSchema>

export default function Instalacao({ project }: InstalacaoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(InstalacaoSchema),
    defaultValues: {
      instalacao_date: project.instalacao_date ? project.instalacao_date.split("T")[0] : "",
      instalacao_responsavel: project.instalacao_responsavel || "",
    }
  });
  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const payload = {
        instalacao_date: data.instalacao_date,
        instalacao_responsavel: data.instalacao_responsavel
      }
      await projectService.updateProject(project.id, payload);
      alert("Dados atualizados com sucesso!");
      navigate("/painel");
    } catch (error) {
      alert("Ocorreu um erro ao atualizar os dados.");
    } finally {
      setIsSubmitting(true);
    }
  }
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
          title="Fase: Instalação"
          instructionLabel="Instalação"
          instructionDescription="Escolha a data prevista para a instalação."
          alertText="Após esta etapa, o instalador será notificado."
          dateField={
            <div className="w-full space-y-1">
              <input
                type="date"
                className={`w-full rounded-lg border bg-white p-3 text-sm outline-none ${errors.instalacao_date ? "border-red-500" : "border-gray-300"
                  }`}
                {...register("instalacao_date")}
              />
              {errors.instalacao_date && (
                <p className="text-xs text-red-500">
                  {errors.instalacao_date.message}
                </p>
              )}
            </div>
          }
        />
        <Controller
        control={control}
        name="instalacao_responsavel"
        render = {({ field, fieldState}) => (
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