import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import NovoStep from "@/Planejador/Fases/NovoStep";
// import LiberadoStep from "@/components/Fases/LiberadoStep";
import InstrucaoObraStep from "@/pages/Planejador/Fases/InstrucaoObra";
import MedicaoStep from "@/pages/Planejador/Fases/Medicao";
import PreInstalacaoStep from "@/pages/Planejador/Fases/PreInstalacao";
import PosInstalacaoStep from "@/pages/Planejador/Fases/PosInstalacao";
import EntregaObraStep from "@/pages/Planejador/Fases/EntregaObra";
import Novo from "./Fases/Novo";
import { projectService } from "./projectService";
import LiberarTrabalho from "./Fases/LiberarTrabalho";

export default function Projeto() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;

        const data = await projectService.getById(id)
        setProject(data);

      setLoading(false);
    }

    fetchProject();
  }, [id]);


  if (loading) return <p>Carregando...</p>;
  if (!project) return <p>Projeto não encontrado.</p>;

  switch (project.status) {
    case "NOVO":
      return <Novo project={project} />;

    case "LIBERADO_TRABALHO":
      return <LiberarTrabalho project={project} />;

    case "INSTRUCAO_OBRA":
      return <InstrucaoObraStep project={project} />;

    case "MEDICAO":
      return <MedicaoStep project={project} />;

    case "PRE_INSTALACAO":
      return <PreInstalacaoStep project={project} />;

    case "POS_INSTALACAO":
      return <PosInstalacaoStep project={project} />;

    case "ENTREGA_OBRA":
      return <EntregaObraStep project={project} />;

    default:
      return <p>Status inválido.</p>;
  }
}