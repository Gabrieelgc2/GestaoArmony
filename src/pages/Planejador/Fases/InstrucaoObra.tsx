import { useState } from "react";
import AtribuirResponsavel from "../../../components/ui/AtribuirResponsavel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import ProjectCard from "../../../components/ui/ProjectCard";
import type { Project } from "@/types/project";
import { z } from "zod";
import { projectService } from "../projectService";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface InstrucaoObraProps {
  project: Project;
}

const medicaoSchema = z.object({
  medicao_date: z.string().min(1, "Informe a data de agendamento da medição."),
  medicao_responsavel: z.string().min(1, "Informe o responsável pela medição."),
});

type FormData = z.infer<typeof medicaoSchema>;

export default function InstrucaoObra({ project }: InstrucaoObraProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(medicaoSchema),
    defaultValues: {
      medicao_date: project.medicao_date ? project.medicao_date.split("T")[0] : "",
      medicao_responsavel: project.medicao_responsavel || ""
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      const payload = {
        medicao_date: data.medicao_date,
        medicao_responsavel: data.medicao_responsavel,
        status: "MEDICAO"
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
          title="Fase: Instrução de Obra"
          instructionLabel="Instrução de obra"
          instructionDescription="Escolha a data prevista para a próxima fase."
          alertText="Após esta etapa, o agendamento para a medição será realizada."
          dateField={
            <div className="w-full space-y-1">
              <input
                type="date"
                className={`w-full rounded-lg border bg-white p-3 text-sm outline-none ${errors.medicao_date ? "border-red-500" : "border-gray-300"
                  }`}
                {...register("medicao_date")}
              />
              {errors.medicao_date && (
                <p className="text-xs text-red-500">
                  {errors.medicao_date.message}
                </p>
              )}
            </div>
          }
        />

        <Controller
          name="medicao_responsavel"
          control={control}
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