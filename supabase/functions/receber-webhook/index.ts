import {createClient} from "npm:@supabase/supabase-js@2"

Deno.serve(async (req) => {
  if(req.method !== "POST"){
    return Response.json(
      {erro: "Método não permitido"},
      {status: 405}
    );
  }

const segredo = Deno.env.get("WEBHOOK_SECRET");
const recebido = req.headers.get("x-webhook-secret");
if(!segredo || recebido !== segredo){
  return Response.json(
    {error: "Não autorizado"},
    {status: 401}
  );
}

let dados;

try{
  dados = await req.json();
} catch {
  return Response.json(
    { error: "JSON inválido"},
    { status: 404}
  );
}

const pedido = String(dados.pedido ?? "").trim();
const cliente = String(dados.cliente ?? "").trim();
const prazo = dados.prazo;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await supabase
    .from("obras")
    .upsert(
      {
        numero_cliente: pedido,
        nome_obra: cliente,
        prazo,
      },
      { onConflict: "numero_cliente" }
    );

  if (error) {
    console.error("Erro ao gravar obra:", error);

    return Response.json(
      { erro: "Erro ao salvar no banco" },
      { status: 500 }
    );
  }

  return Response.json({ sucesso: true });
})
