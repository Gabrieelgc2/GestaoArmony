import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/supabaseClient";
export function usePainelInspetor() {
  const [inspecoes, setInspecoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [previsaoMedicaoData, setPrevisaoMedicaoData] = useState<{ [key: string]: string }>({});
  const [previsaoMedicaoHora, setPrevisaoMedicaoHora] = useState<{ [key: string]: string }>({});
  const [justificativas, setJustificativas] = useState<{ [key: string]: string }>({});
  const [modosRecusa, setModosRecusa] = useState<{ [key: string]: boolean }>({});
  const [salvandoId, setSalvandoId] = useState<string | null>(null);
  
  // 1. Carregar Inspeções
  const carregarInspecoes = useCallback(async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile} = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    setUserProfile(profile);

    const { data } = await supabase
      .from("inspections")
      .select(`
        id,
        inspetor_id,
        fase,
        data_prevista,
        data_realizada,
        concluido,
        justificativa,
        status_aprovacao,
        project_id,
        projects:project_id (
          id,
          name_project,
          order_number,
          installation_location,
          contato_client,
          prazo_acordado_dias,
          status,
          data_medicao_final,
          data_limite_entrega,
          liberado_producao,
          data_liberacao_producao
        )
      `)
      .eq("inspetor_id", user.id)
      .order("data_prevista", { ascending: true });

    setInspecoes(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void carregarInspecoes();
  }, [carregarInspecoes]);

  // 2. Confirmar Data Prevista
  const handleConfirmarData = async (inspecao: any) => {
    setSalvandoId(inspecao.id);
    const dataDefinitiva =
      inspecao.data_prevista || new Date().toISOString().split("T")[0];

    const { error: errInspecao } = await supabase
      .from("inspections")
      .update({
        data_realizada: dataDefinitiva,
        concluido: true,
        status_aprovacao: "CONFIRMADO",
      })
      .eq("id", inspecao.id);

    if (errInspecao) {
      alert("Erro ao confirmar vistoria: " + errInspecao.message);
      setSalvandoId(null);
      return;
    }

    if (inspecao.fase === "INSTRUCAO_OBRA") {
      const dataPrevMedicao = previsaoMedicaoData[inspecao.id];
      const horaPrevMedicao = previsaoMedicaoHora[inspecao.id];
      const dataHoraIso = new Date(`${dataPrevMedicao}T${horaPrevMedicao}`);
      if (dataPrevMedicao && horaPrevMedicao) {
        await supabase.from("inspections").insert([
          {
            project_id: inspecao.project_id,
            inspetor_id: inspecao.inspetor_id,
            fase: "MEDICAO",
            data_prevista: dataHoraIso,
            concluido: false,
            status_aprovacao: "PENDENTE",
          },
        ]);
      }
    }

    if (inspecao.fase === "MEDICAO") {
      const prazoDias = Number(inspecao.projects?.prazo_acordado_dias);
      let dataLimiteFormatada: string | null = null;

      if (prazoDias && prazoDias > 0) {
        const dataBase = new Date(dataDefinitiva);
        dataBase.setDate(dataBase.getDate() + prazoDias);
        dataLimiteFormatada = dataBase.toISOString().split("T")[0];
      }

      await supabase
        .from("projects")
        .update({
          data_medicao_final: dataDefinitiva,
          data_limite_entrega: dataLimiteFormatada,
        })
        .eq("id", inspecao.project_id);
    }

    setSalvandoId(null);
    await carregarInspecoes();
  };

  // 3. Recusar e Devolver ao Planejador
  const handleRecusarData = async (inspecao: any) => {
    const motivo = justificativas[inspecao.id];

    if (!motivo?.trim()) {
      alert("Por favor, preencha o motivo para devolver ao planejador.");
      return;
    }

    setSalvandoId(inspecao.id);

    const { error } = await supabase
      .from("inspections")
      .update({
        concluido: false,
        status_aprovacao: "RECUSADO",
        justificativa: motivo.trim(),
      })
      .eq("id", inspecao.id);

    setSalvandoId(null);

    if (error) {
      alert("Erro ao devolver vistoria: " + error.message);
    } else {
      setModosRecusa((prev) => ({ ...prev, [inspecao.id]: false }));
      await carregarInspecoes();
    }
  };

  return {
    inspecoes,
    loading,
    userProfile,
    previsaoMedicaoData,
    setPrevisaoMedicaoData,
    previsaoMedicaoHora,
    setPrevisaoMedicaoHora,
    justificativas,
    setJustificativas,
    modosRecusa,
    setModosRecusa,
    salvandoId,
    carregarInspecoes,
    handleConfirmarData,
    handleRecusarData,
  };
}