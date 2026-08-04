import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ButtonCancel from "../../../components/ui/Button/ButtonCancel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import ProjectCard from "../../../components/ui/ProjectCard";

import type { Project } from "@/types/project";
import { projectService } from "../projectService";
import { useState } from "react";

const Dataschema = z.object({
  instrucao_date: z.string().min(1, "Informe a data de agendamento da instrução de obra."),
});

type FormData = z.infer<typeof Dataschema>;

export default function LiberarTrabalho({ project }: { project: Project }) {
const [isSubmitting, setIsSubmitting] = useState(false);
const initialDate = project.instrucao_date
    ? project.instrucao_date.split("T")[0]
    : "";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<FormData>({
    resolver: zodResolver(Dataschema),
    defaultValues: {
      instrucao_date: initialDate
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
    setIsSubmitting(true);
    const formattedDate = new Date(`${data.instrucao_date}T12:00:00Z`).toISOString();
    const payload = {
      instrucao_date: formattedDate,
      status: "INSTRUCAO_OBRA"
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
        <Header>Agendamento</Header>

        <Card>
          <ProjectCard
            company={project.name_project}
            projectId={project.id}
            status={project.status}
          />
        </Card>

        <Fase
          title="Fase: Liberar para trabalho"
          instructionLabel="Data do agendamento"
          instructionDescription="Escolha a data prevista para a próxima fase."
          alertText="Após esta etapa, o agendamento para a instrução de obra será realizada."
          dateField={
            <div className="w-full space-y-1">
              <input
                type="date"
                className={`w-full rounded-lg border bg-white p-3 text-sm outline-none ${
                  errors.instrucao_date ? "border-red-500" : "border-gray-300"
                }`}
                {...register("instrucao_date")}
              />
              {errors.instrucao_date && (
                <p className="text-xs text-red-500">
                  {errors.instrucao_date.message}
                </p>
              )}
            </div>
          }
        />

        <ButtonConfirm type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Atualizando..." : "Confirmar agendamento"}
        </ButtonConfirm>

        <ButtonCancel 
         onClick={() => navigate(-1)}>
          Cancelar e voltar
        </ButtonCancel>
      </form>
    </div>
  );
}