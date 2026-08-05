import { useForm, Controller } from "react-hook-form";
import AtribuirResponsavel from "../../../components/ui/AtribuirResponsavel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import ProjectCard from "../../../components/ui/ProjectCard";
import type { Project } from "@/types/project";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { projectService } from "../projectService";

interface MedicaoProps {
  project: Project;
}

const preInstalacaoSchema = z.object({
  pre_instalacao_date: z.string().min(1, "Informe a data de agendamento da pré-instalação."),
  pre_instalacao_responsavel: z.string().min(1, "Informe o responsável pela pré-instalação."),
});

type FormData = z.infer<typeof preInstalacaoSchema>;

export default function Medicao({ project }: MedicaoProps) {
const [isSubmitting, setIsSubmitting] = useState(false);
const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(preInstalacaoSchema),
    defaultValues: {
      pre_instalacao_date: project.pre_instalacao_date ? project.pre_instalacao_date.split("T")[0] : "",
      pre_instalacao_responsavel: project.pre_instalacao_responsavel || ""
    },
  });
    const onSubmit = async (data: FormData) => {
      try {
        setIsSubmitting(true);
        const payload = {
          pre_instalacao_date: data.pre_instalacao_date,
          pre_instalacao_responsavel: data.pre_instalacao_responsavel,
          status: "PRE_INSTALACAO"
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
          title="Fase: Medição"
          instructionLabel="Data da medicação"
          instructionDescription="Escolha a data prevista para a pré-instalação."
          alertText="Após esta etapa, a pré-instalação será realizada."
          dateField={
            <div className="w-full space-y-1">
              <input
                type="date"
                className={`w-full rounded-lg border bg-white p-3 text-sm outline-none ${errors.pre_instalacao_date ? "border-red-500" : "border-gray-300"
                  }`}
                {...register("pre_instalacao_date")}
              />
              {errors.pre_instalacao_date && (
                <p className="text-xs text-red-500">
                  {errors.pre_instalacao_date.message}
                </p>
              )}
            </div>
          }
        />

        <Controller
          control={control}
          name="pre_instalacao_responsavel"
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
