import { useState, useEffect, useCallback, useMemo } from "react";
import type { FormEvent } from "react";
import {
  DEFAULT_NOVO_PROJETO,
  getProximoStatus,
  type FaseKey,
  type NovoProjetoForm,
  type Profile,
  type Projeto,
} from "../../utils/painelPlanejadorConfig";
import { useAutoAvancoFase } from "./useAutoAvancoFase";
import {
  atualizarStatusProjeto,
  carregarDadosPlanejador,
  criarProjeto,
  salvarAgendamentoInspecao,
  verificarDisponibilidadeInspetor,
} from "@/services/planejadorService";
import { inspetorEstaDisponivel } from "@/utils/agendaUtils";

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
  const [horariosPrevistos, setHorariosPrevistos] = useState<Record<string, string>>({});

  const atualizarCampoNovoProjeto = <K extends keyof NovoProjetoForm>(campo: K, valor: NovoProjetoForm[K]) => {
    setNovoProjeto((prev) => ({ ...prev, [campo]: valor }));
  };

  const carregarDados = useCallback(async () => {
    setLoading(true);
    const dados = await carregarDadosPlanejador();
    setPlanejadorNome(dados.nome);
    setInspetores(dados.inspetores);
    setProjetos(dados.projetos);
    setLoading(false);
  }, []);

  useEffect(() => {
    void carregarDados();
  }, [carregarDados]);

  const todasInspecoes = useMemo(
    () => projetos.flatMap((projeto) => projeto.inspections || []),
    [projetos],
  );

  const verificarDisponibilidadeInspetorLocal = useCallback(
    (inspetorId: string, projetoId: string, faseAtual: FaseKey) => {
      const dataAgendada = datasPrevistas[projetoId];
      const horaAgendada = horariosPrevistos[projetoId];

      if (!dataAgendada || !horaAgendada) return true;

      const projeto = projetos.find((item) => item.id === projetoId);
      const inspecaoExistente = projeto?.inspections?.find((item) => item.fase === faseAtual);

      return inspetorEstaDisponivel(
        inspetorId,
        todasInspecoes,
        dataAgendada,
        horaAgendada,
        inspecaoExistente?.id,
      );
    },
    [datasPrevistas, horariosPrevistos, projetos, todasInspecoes],
  );

  const handleCriarProjeto = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name_project, prazo_acordado_dias, order_number, installation_location, contato_client } = novoProjeto;

    if (!name_project.trim() || !prazo_acordado_dias || !order_number.trim() || !installation_location.trim() || !contato_client.trim()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    setSalvandoNovoProjeto(true);
    const { error } = await criarProjeto(novoProjeto);
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
    const horaAgendada = horariosPrevistos[projetoId];
    const inspetorId = inspetoresSelecionados[projetoId];

    if (!dataAgendada) {
      alert("Por favor, selecione a data.");
      return;
    }

    if (!horaAgendada) {
      alert("Por favor, selecione o horário.");
      return;
    }

    const dataHoraIso = new Date(`${dataAgendada}T${horaAgendada}`);
    const projeto = projetos.find((p) => p.id === projetoId);
    const inspecaoExistente = projeto?.inspections?.find((i) => i.fase === faseAtual);
    const inspetorEfetivo = inspetorId || inspecaoExistente?.inspetor_id;

    setSalvandoId(projetoId);

    if (!inspetorEfetivo) {
      alert("Por favor, selecione o inspetor responsável.");
      setSalvandoId(null);
      return;
    }

    if (!verificarDisponibilidadeInspetorLocal(inspetorEfetivo, projetoId, faseAtual)) {
      alert("Este inspetor já possui uma vistoria Pendente ou Atrasada neste horário.");
      setSalvandoId(null);
      return;
    }

    try {
      const { disponivel } = await verificarDisponibilidadeInspetor({
        inspetorId: inspetorEfetivo,
        dataAgendada,
        horaAgendada,
        excluirInspecaoId: inspecaoExistente?.id,
      });

      if (!disponivel) {
        alert("Este inspetor já possui uma vistoria Pendente ou Atrasada neste horário.");
        setSalvandoId(null);
        return;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      alert("Erro ao verificar disponibilidade do inspetor: " + message);
      setSalvandoId(null);
      return;
    }

    const { error } = await salvarAgendamentoInspecao({
      projetoId,
      fase: faseAtual,
      inspecaoId: inspecaoExistente?.id,
      inspetorId: inspetorEfetivo,
      dataHora: dataHoraIso,
    });

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

    setHorariosPrevistos((prev) => {
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
    setProjetos((prev) => prev.map((item) =>
      item.id === projeto.id ? { ...item, status: proximoStatus } : item,
    ));

    const { error } = await atualizarStatusProjeto(projeto.id, proximoStatus);
    setSalvandoId(null);

    if (error) {
      setProjetos((prev) => prev.map((item) =>
        item.id === projeto.id ? { ...item, status: projeto.status } : item,
      ));
      alert("Erro ao avançar de fase: " + error.message);
      return;
    }

    await carregarDados();
  };

  useAutoAvancoFase(projetos, handleAvancarFase);

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
    horariosPrevistos,
    setHorariosPrevistos,
    inspetoresSelecionados,
    setInspetoresSelecionados,
    salvandoId,
    handleCriarProjeto,
    handleAgendarInspecao,
    handleAvancarFase,
    carregarDados,
    verificarDisponibilidadeInspetorLocal,
  };
}