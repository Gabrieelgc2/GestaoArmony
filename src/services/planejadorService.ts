import { supabase } from "@/supabaseClient";
import type { FaseKey, NovoProjetoForm, Profile, Projeto } from "@/utils/painelPlanejadorConfig";
import { horariosConflitam, isInspecaoAtiva } from "@/utils/agendaUtils";

const projetoSelect = `
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
`;

export async function carregarDadosPlanejador(): Promise<{
  nome: string;
  inspetores: Profile[];
  projetos: Projeto[];
}> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let nome = "Planejador";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();
    nome = profile?.full_name || nome;
  }

  const { data: listaInspetores } = await supabase
    .from("profiles")
    .select("id, full_name")
    .eq("role", "INSPETOR");

  const { data: listaProjetos } = await supabase
    .from("projects")
    .select(projetoSelect)
    .order("created_at", { ascending: false });

  return {
    nome,
    inspetores: listaInspetores || [],
    projetos: (listaProjetos || []) as unknown as Projeto[],
  };
}

export async function criarProjeto(projeto: NovoProjetoForm) {
  return supabase.from("projects").insert([
    {
      name_project: projeto.name_project.trim(),
      prazo_acordado_dias: Number(projeto.prazo_acordado_dias),
      order_number: projeto.order_number.trim(),
      installation_location: projeto.installation_location.trim(),
      contato_client: projeto.contato_client.trim(),
      status: "NOVO",
    },
  ]);
}

export async function atualizarStatusProjeto(projetoId: string, status: FaseKey) {
  return supabase.from("projects").update({ status }).eq("id", projetoId);
}

export async function verificarDisponibilidadeInspetor({
  inspetorId,
  dataAgendada,
  horaAgendada,
  excluirInspecaoId,
}: {
  inspetorId: string;
  dataAgendada: string;
  horaAgendada: string;
  excluirInspecaoId?: string;
}): Promise<{ disponivel: boolean }> {
  const inicioDia = new Date(`${dataAgendada}T00:00:00`);
  const fimDia = new Date(`${dataAgendada}T23:59:59`);

  const { data, error } = await supabase
    .from("inspections")
    .select("id, inspetor_id, data_prevista, concluido, status_aprovacao")
    .eq("inspetor_id", inspetorId)
    .gte("data_prevista", inicioDia.toISOString())
    .lte("data_prevista", fimDia.toISOString());

  if (error) {
    throw error;
  }

  const temConflito = (data || []).some((insp) => {
    if (excluirInspecaoId && insp.id === excluirInspecaoId) return false;
    if (!insp.data_prevista || !isInspecaoAtiva(insp)) return false;

    return horariosConflitam(dataAgendada, horaAgendada, insp.data_prevista);
  });

  return { disponivel: !temConflito };
}

export async function salvarAgendamentoInspecao({
  projetoId,
  fase,
  inspecaoId,
  inspetorId,
  dataHora,
}: {
  projetoId: string;
  fase: FaseKey;
  inspecaoId?: string;
  inspetorId?: string;
  dataHora: Date;
}) {
  if (inspecaoId) {
    return supabase
      .from("inspections")
      .update({
        data_prevista: dataHora,
        status_aprovacao: "PENDENTE",
        justificativa: null,
        concluido: false,
        ...(inspetorId ? { inspetor_id: inspetorId } : {}),
      })
      .eq("id", inspecaoId);
  }

  return supabase.from("inspections").insert([
    {
      project_id: projetoId,
      inspetor_id: inspetorId,
      fase,
      data_prevista: dataHora,
      concluido: false,
      status_aprovacao: "PENDENTE",
    },
  ]);
}