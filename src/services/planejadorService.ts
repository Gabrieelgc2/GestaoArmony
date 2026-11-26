import { supabase } from "@/supabaseClient";
import type { FaseKey, Profile, Projeto, UsuarioPerfis } from "@/utils/painelPlanejadorConfig";
import { horariosConflitam, isInspecaoAtiva } from "@/utils/agendaUtils";

const projetoSelect = `
  hetmo,
  numero,
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
    inspetor_id
  ),
  clients(
  nome
  )
`;

const UsuariosBanco = `
id,
nome,
usuario_perfil(
usuario_id,
perfil_codigo
)
`

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
      .from("usuarios")
      .select("nome")
      .eq("id", user.id)
      .single();
    nome = profile?.nome || nome;
  }

  const { data: Users, error: error } = await supabase
    .from("usuarios")
    .select(UsuariosBanco)

  const AllUsers = (Users ?? []) as unknown as UsuarioPerfis[];
  console.log("Usuários retornados: ", AllUsers)
  const nomeEngenheiros: Profile[] = AllUsers
  .filter((usuario) =>
    usuario.usuario_perfil.some(
      (perfil) => perfil.perfil_codigo === "engenheiro"
    )
  )
  .map(({ id, nome }) => ({ id, nome }));

  console.log("Quantidade de engenheiros:", nomeEngenheiros.length);
  console.log("Erro de usuário: ", error)
  console.log("Nome Engenheiros: ", nomeEngenheiros)

  const { data: listaProjetos, error: errors } = await supabase
    .from("projects")
    .select(projetoSelect)
    .order("created_at", { ascending: false });
    console.log("Erro ao selecionar Projetos:", errors)

  return {
    nome,
    inspetores: nomeEngenheiros || [],
    projetos: (listaProjetos || []) as unknown as Projeto[],
  };
}

export async function atualizarStatusProjeto(projetoHetmo: string, status: FaseKey) {
  return supabase.from("projects").update({ status }).eq("hetmo", projetoHetmo);
}

export async function atualizarDadosEStatusProjeto(
  projetoHetmo: string,
  status: FaseKey,
  dados: Pick<Projeto, "installation_location" | "prazo_acordado_dias">,
) {
  return supabase
    .from("projects")
    .update({ ...dados, status })
    .eq("hetmo", projetoHetmo);
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
  const dataHoraAgendada = new Date(`${dataAgendada}T${horaAgendada}`);
  if (Number.isNaN(dataHoraAgendada.getTime())) {
    throw new Error("A data ou o horário do agendamento é inválido.");
  }

  const margemConflitoMs = 2 * 60 * 60 * 1000; // 2 horas em milissegundos
  const inicioBusca = new Date(dataHoraAgendada.getTime() - margemConflitoMs);
  const fimBusca = new Date(dataHoraAgendada.getTime() + margemConflitoMs);

  const { data, error } = await supabase
    .from("inspections")
    .select("id, inspetor_id, data_prevista, concluido, status_aprovacao")
    .eq("inspetor_id", inspetorId)
    .gte("data_prevista", inicioBusca.toISOString())
    .lte("data_prevista", fimBusca.toISOString());

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
  projetoHetmo,
  fase,
  inspecaoId,
  inspetorId,
  dataHora,
}: {
  projetoHetmo: string;
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
      hetmo: projetoHetmo,
      inspetor_id: inspetorId,
      fase,
      data_prevista: dataHora,
      concluido: false,
      status_aprovacao: "PENDENTE",
    },
  ]);
}