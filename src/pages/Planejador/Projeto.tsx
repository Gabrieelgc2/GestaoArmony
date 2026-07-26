import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectService } from "@/pages/Planejador/services/projectService";

// import NovoStep from "@/Planejador/Fases/NovoStep";
// import LiberadoStep from "@/components/Fases/LiberadoStep";
import InstrucaoObraStep from "@/pages/Planejador/Fases/InstrucaoObra";
import MedicaoStep from "@/pages/Planejador/Fases/Medicao";
import PreInstalacaoStep from "@/pages/Planejador/Fases/PreInstalacao";
import PosInstalacaoStep from "@/pages/Planejador/Fases/PosInstalacao";
import EntregaObraStep from "@/pages/Planejador/Fases/EntregaObra";

export default function Projeto() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;

      const numericId = Number(id);
      
      if (!isNaN(numericId)) {
        const data = await projectService.getProjectbyId(numericId);
        setProject(data);
      }

      setLoading(false);
    }

    fetchProject();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!project) return <p>Projeto não encontrado.</p>;

  switch (project.status) {
    // case "novo":
    //   return <NovoStep project={project} />;

    // case "liberado":
    //   return <LiberadoStep project={project} />;

    case "instrucao-obra":
      return <InstrucaoObraStep project={project} />;

    case "medicao":
      return <MedicaoStep project={project} />;

    case "pre-instalacao":
      return <PreInstalacaoStep project={project} />;

    case "pos-instalacao":
      return <PosInstalacaoStep project={project} />;

    case "entrega":
      return <EntregaObraStep project={project} />;

    default:
      return <p>Status inválido.</p>;
  }
}