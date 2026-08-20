import { useState, useEffect, useCallback } from "react";
import type { FormEvent } from "react";
import { supabase } from "@/supabaseClient";
import {
  DEFAULT_NOVO_PROJETO,
  getProximoStatus,
  type FaseKey,
  type NovoProjetoForm,
  type Profile,
  type Projeto,
} from "../../utils/painelPlanejadorConfig";

export function usePainelPlanejador() {
  const [planejadorNome, setPlanejadorNome] = useState("Planejador");
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [inspetores, setInspetores] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalCriarAberto, setModalCriarAberto] = useState(false);
  const [novoProjeto, setNovoProjeto] = useState<NovoProjetoForm>(DEFAULT_NOVO_PROJETO);
  const [salvandoNovoProjeto, setSalvandoNovoProjeto] = useState(false);
  const [datasPrevistas, setDatasPrevistas] = useState<Record<string, string>>({});
  const [inspetoresSelecionados, setInspetoresSelecionados] = useState<Record<string, string>>({});
  const [salvandoId, setSalvandoId] = useState<string | null>(null);

  const atualizarCampoNovoProjeto = <K extends keyof NovoProjetoForm>(campo: K, valor: NovoProjetoForm[K]) => {
    setNovoProjeto((prev) => ({ ...prev, [campo]: valor }));
  };

  const carregarDados = useCallback(async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();
      setPlanejadorNome(profile?.full_name || "Planejador");
    }

    const { data: listaInspetores } = await supabase.from("profiles").select("id, full_name").eq("role", "INSPETOR");
    setInspetores(listaInspetores || []);

    const { data: listaProjetos } = await supabase
      .from("projects")
      .select(`
        id,
        name_project,
        order_number,
        installation_location,
        prazo_acordado_dias,
        contato_client,
        data_medicao_final,
        data_limite_entrega,
        data_liberacao_producao,
        liberado_producao,
        status,
        inspections(
          id,
          fase,
          data_prevista,
          data_realizada,
          justificativa,
          status_aprovacao,
          concluido,
          inspetor_id,
          profiles:inspetor_id (full_name)
        )
      `)
      .order("created_at", { ascending: false });

    setProjetos((listaProjetos || []) as unknown as Projeto[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void carregarDados();
  }, [carregarDados]);

  const handleCriarProjeto = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name_project, prazo_acordado_dias, order_number, installation_location, contato_client } = novoProjeto;

    if (!name_project.trim() || !prazo_acordado_dias || !order_number.trim() || !installation_location.trim() || !contato_client.trim()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    setSalvandoNovoProjeto(true);
    const { error } = await supabase.from("projects").insert([
      {
        name_project: name_project.trim(),
        prazo_acordado_dias: Number(prazo_acordado_dias),
        order_number: order_number.trim(),
        installation_location: installation_location.trim(),
        contato_client: contato_client.trim(),
        status: "NOVO",
      },
    ]);
    setSalvandoNovoProjeto(false);

    if (error) {
      alert("Erro ao cadastrar projeto: " + error.message);
      return;
    }

    setNovoProjeto(DEFAULT_NOVO_PROJETO);
    setModalCriarAberto(false);
    await carregarDados();
  };

  const handleAgendarInspecao = async (projetoId: string, faseAtual: FaseKey) => {
    const dataAgendada = datasPrevistas[projetoId];
    const inspetorId = inspetoresSelecionados[projetoId];

    if (!dataAgendada) {
      alert("Por favor, selecione a data.");
      return;
    }

    const projeto = projetos.find((p) => p.id === projetoId);
    const inspecaoExistente = projeto?.inspections?.find((i) => i.fase === faseAtual);

    setSalvandoId(projetoId);
    let error = null;

    if (inspecaoExistente) {
      const { error: errUpdate } = await supabase
        .from("inspections")
        .update({
          data_prevista: dataAgendada,
          status_aprovacao: "PENDENTE",
          justificativa: null,
          concluido: false,
          ...(inspetorId ? { inspetor_id: inspetorId } : {}),
        })
        .eq("id", inspecaoExistente.id);

      error = errUpdate;
    } else {
      if (!inspetorId) {
        alert("Por favor, selecione o inspetor responsável.");
        setSalvandoId(null);
        return;
      }

      const { error: errInsert } = await supabase.from("inspections").insert([
        {
          project_id: projetoId,
          inspetor_id: inspetorId,
          fase: faseAtual,
          data_prevista: dataAgendada,
          concluido: false,
          status_aprovacao: "PENDENTE",
        },
      ]);

      error = errInsert;
    }

    setSalvandoId(null);

    if (error) {
      alert("Erro ao agendar: " + error.message);
      return;
    }

    setDatasPrevistas((prev) => {
      const copy = { ...prev };
      delete copy[projetoId];
      return copy;
    });

    setInspetoresSelecionados((prev) => {
      const copy = { ...prev };
      delete copy[projetoId];
      return copy;
    });

    await carregarDados();
  };

  const handleAvancarFase = async (projeto: Projeto) => {
    const proximoStatus = getProximoStatus(projeto.status);
    if (!proximoStatus) return;

    setSalvandoId(projeto.id);
    const { error } = await supabase.from("projects").update({ status: proximoStatus }).eq("id", projeto.id);
    setSalvandoId(null);

    if (error) {
      alert("Erro ao avançar de fase: " + error.message);
      return;
    }

    await carregarDados();
  };

  return {
    planejadorNome,
    projetos,
    inspetores,
    loading,
    modalCriarAberto,
    setModalCriarAberto,
    novoProjeto,
    atualizarCampoNovoProjeto,
    salvandoNovoProjeto,
    datasPrevistas,
    setDatasPrevistas,
    inspetoresSelecionados,
    setInspetoresSelecionados,
    salvandoId,
    handleCriarProjeto,
    handleAgendarInspecao,
    handleAvancarFase,
    carregarDados,
  };
}