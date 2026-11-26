import { useState, useEffect, useCallback, useMemo } from "react";
import {
  getProximoStatus,
  type FaseKey,
  type Profile,
  type Projeto,
} from "../../utils/painelPlanejadorConfig";
import { useAutoAvancoFase } from "./useAutoAvancoFase";
import {
  atualizarStatusProjeto,
  atualizarDadosEStatusProjeto,
  carregarDadosPlanejador,
  salvarAgendamentoInspecao,
  verificarDisponibilidadeInspetor,
} from "@/services/planejadorService";
import { inspetorEstaDisponivel } from "@/utils/agendaUtils";

export function usePainelPlanejador() {
  const [planejadorNome, setPlanejadorNome] = useState("Planejador");
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [inspetores, setInspetores] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [projetoParaIniciar, setProjetoParaIniciar] = useState<Projeto | null>(null);
  const [datasPrevistas, setDatasPrevistas] = useState<Record<string, string>>({});
  const [engenheirosSelecionados, setEngenheirosSelecionados] = useState<Record<string, string>>({});
  const [salvandoId, setSalvandoId] = useState<string | null>(null);
  const [horariosPrevistos, setHorariosPrevistos] = useState<Record<string, string>>({});

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

  const verificarDisponibilidadeEngenheiro = useCallback(
    (inspetorId: string, projetoHetmo: string, faseAtual: FaseKey) => {
      const dataAgendada = datasPrevistas[projetoHetmo];
      const horaAgendada = horariosPrevistos[projetoHetmo];

      if (!dataAgendada || !horaAgendada) return true;

      const projeto = projetos.find((item) => item.hetmo === projetoHetmo);
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

  const handleAgendarInspecao = async (projetoHetmo: string, faseAtual: FaseKey) => {
    const dataAgendada = datasPrevistas[projetoHetmo];
    const horaAgendada = horariosPrevistos[projetoHetmo];
    const inspetorId = engenheirosSelecionados[projetoHetmo];

    if (!dataAgendada) {
      alert("Por favor, selecione a data.");
      return;
    }

    if (!horaAgendada) {
      alert("Por favor, selecione o horário.");
      return;
    }

    const dataHoraIso = new Date(`${dataAgendada}T${horaAgendada}`);
    const projeto = projetos.find((p) => p.hetmo === projetoHetmo);
    const inspecaoExistente = projeto?.inspections?.find((i) => i.fase === faseAtual);
    const inspetorEfetivo = inspetorId || inspecaoExistente?.inspetor_id;

    setSalvandoId(projetoHetmo);

    if (!inspetorEfetivo) {
      alert("Por favor, selecione o engenheiro responsável.");
      setSalvandoId(null);
      return;
    }

    if (!verificarDisponibilidadeEngenheiro(inspetorEfetivo, projetoHetmo, faseAtual)) {
      alert("Este inspetor já possui uma vistoria ativa a menos de 2 horas deste horário.");
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
        alert("Este inspetor já possui uma vistoria ativa a menos de 2 horas deste horário.");
        setSalvandoId(null);
        return;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      alert("Erro ao verificar disponibilidade do engenheiro: " + message);
      setSalvandoId(null);
      return;
    }

    const { error } = await salvarAgendamentoInspecao({
      projetoHetmo,
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
      delete copy[projetoHetmo];
      return copy;
    });

    setEngenheirosSelecionados((prev) => {
      const copy = { ...prev };
      delete copy[projetoHetmo];
      return copy;
    });

    setHorariosPrevistos((prev) => {
      const copy = { ...prev };
      delete copy[projetoHetmo];
      return copy;
    });

    await carregarDados();
  };

  const handleAvancarFase = async (projeto: Projeto) => {
    const proximoStatus = getProximoStatus(projeto.status);
    if (!proximoStatus) return;

    const prazoAcordadoDias = projeto.prazo_acordado_dias;
    if (
      projeto.status === "NOVO"
      && (
        !projeto.installation_location?.trim()
        || prazoAcordadoDias === null
        || !Number.isInteger(prazoAcordadoDias)
        || prazoAcordadoDias <= 0
      )
    ) {
      setProjetoParaIniciar(projeto);
      return;
    }

    setSalvandoId(projeto.hetmo);
    setProjetos((prev) => prev.map((item) =>
      item.hetmo === projeto.hetmo ? { ...item, status: proximoStatus } : item,
    ));

    const { error } = await atualizarStatusProjeto(projeto.hetmo, proximoStatus);
    setSalvandoId(null);

    if (error) {
      setProjetos((prev) => prev.map((item) =>
        item.hetmo === projeto.hetmo ? { ...item, status: projeto.status } : item,
      ));
      alert("Erro ao avançar de fase: " + error.message);
      return;
    }

    await carregarDados();
  };

  const fecharModalInicioObra = () => {
    setProjetoParaIniciar(null);
  };

  const handleCompletarDadosEIniciarObra = async (
    dados: Pick<Projeto, "installation_location" | "prazo_acordado_dias">,
  ) => {
    const projeto = projetoParaIniciar;
    if (!projeto) return;

    const proximoStatus = getProximoStatus(projeto.status);
    if (!proximoStatus) return;

    setSalvandoId(projeto.hetmo);
    try {
      const { error } = await atualizarDadosEStatusProjeto(projeto.hetmo, proximoStatus, dados);
      if (error) {
        alert("Erro ao salvar os dados e iniciar a obra: " + error.message);
        return;
      }

      setProjetoParaIniciar(null);
      await carregarDados();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      alert("Erro ao salvar os dados e iniciar a obra: " + message);
    } finally {
      setSalvandoId(null);
    }
  };

  useAutoAvancoFase(projetos, handleAvancarFase);

  return {
    planejadorNome,
    projetos,
    inspetores,
    loading,
    projetoParaIniciar,
    fecharModalInicioObra,
    handleCompletarDadosEIniciarObra,
    datasPrevistas,
    setDatasPrevistas,
    horariosPrevistos,
    setHorariosPrevistos,
    engenheirosSelecionados,
    setEngenheirosSelecionados,
    salvandoId,
    handleAgendarInspecao,
    handleAvancarFase,
    carregarDados,
    verificarDisponibilidadeEngenheiro,
  };
}