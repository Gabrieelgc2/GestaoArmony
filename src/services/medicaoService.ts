import {supabase} from "@/supabaseClient";
import type {RelatorioPayload} from "@/types/relatorioMedicao";

export async function salvarRelatorioMedicao(payload: RelatorioPayload) {
    const {data: {user}} = await supabase.auth.getUser();
    if (!user) {
        throw new Error("Usuário não autenticado.");
    }
    const {error} = await supabase
    .from("relatorios_medicao")
    .upsert({
    inspetor_id: user.id,
    project_id: payload.projetoId,
    inspecao_id: payload.inspecaoId,
    calhas: payload.calhas,
    soleira_porta_giro: payload.soleira_porta_giro,
    acabamento: payload.acabamento,
    trilho_especial: payload.trilho_especial,
    observacoes: payload.observacoes,
    atualizado_em: new Date().toISOString(),
    }, {
    onConflict: "inspecao_id",
    });
    if(error){
        throw new Error(`Erro ao salvar relatório de medição: ${error.message}`);
    }
}