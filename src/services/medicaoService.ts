import { supabase } from "@/supabaseClient";
import type { RelatorioPayload } from "@/types/relatorioMedicao";

export async function salvarRelatorioMedicao(payload: RelatorioPayload) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Usuário não autenticado.");
  }

  // 1. Grava ou atualiza o cabeçalho do relatório
  const { data: relatorio, error: errRelatorio } = await supabase
    .from("relatorios_medicao")
    .upsert(
      {
        inspetor_id: user.id,
        project_id: payload.projetoId,
        inspecao_id: payload.inspecaoId,
        observacoes_gerais: payload.observacoesGerais,
        atualizado_em: new Date().toISOString(),
      },
      { onConflict: "inspecao_id" }
    )
    .select("id")
    .single();

  if (errRelatorio) {
    throw new Error(`Erro ao salvar cabeçalho: ${errRelatorio.message}`);
  }

  // 2. Remove itens antigos para regravar em lote limpo
  const { error: errDeleteItens } = await supabase
    .from("itens_medicao")
    .delete()
    .eq("relatorio_id", relatorio.id);

  if (errDeleteItens) {
    throw new Error(`Erro ao limpar itens antigos: ${errDeleteItens.message}`);
  }

  // 3. Formata e insere a lista de itens
  const itensParaInserir = payload.itens.map((item, idx) => ({
    relatorio_id: relatorio.id,
    ordem: idx + 1,
    descricao_item: item.descricao_item,
    quantidade: Number(item.quantidade) || 1,
    largura: Number(item.largura) || 0,
    altura: Number(item.altura) || 0,
    peitoril: Number(item.peitoril) || 0,
    giro: item.giro,
    tem_chave: item.tem_chave,
    nao_drenar: item.nao_drenar,
    tem_pelicula: item.tem_pelicula,
    calhas: item.calhas,
    soleira_porta_giro: item.soleira_porta_giro,
    acabamento: item.acabamento,
    trilho_especial: item.trilho_especial,
    observacao_item: item.observacao_item,
  }));

  const { error: errItens } = await supabase
    .from("itens_medicao")
    .insert(itensParaInserir);

  if (errItens) {
    throw new Error(`Erro ao salvar itens de medição: ${errItens.message}`);
  }

  // 4. Upload das fotos em lote para o Supabase Storage
  if (payload.fotos && payload.fotos.length > 0) {
    const uploads = payload.fotos.map(async (file) => {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${relatorio.id}/${fileName}`;

      // Upload do arquivo para o bucket 'fotos_medicao'
      const { error: uploadError } = await supabase.storage
        .from("fotos_medicao")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        throw new Error(`Erro ao enviar a imagem ${file.name}: ${uploadError.message}`);
      }

      // Obtém a URL pública gerada
      const { data: urlData } = supabase.storage
        .from("fotos_medicao")
        .getPublicUrl(filePath);

      // Registra a referência da foto na tabela 'medicao_fotos'
      const { error: errFotoDb } = await supabase
        .from("medicao_fotos")
        .insert({
          medicao_id: relatorio.id,
          url_foto: urlData.publicUrl,
          nome_arquivo: file.name,
        });

      if (errFotoDb) {
        throw new Error(`Erro ao registrar foto no banco: ${errFotoDb.message}`);
      }
    });

    await Promise.all(uploads);
  }
}