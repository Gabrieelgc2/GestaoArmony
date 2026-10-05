  # Gestão Armony

  Aplicação web para acompanhar obras, vistorias e medições. O Planejador cadastra projetos e organiza a agenda; o Engenheiro consulta as vistorias atribuídas, confirma ou devolve agendamentos e preenche o relatório da etapa de medição. Os dados operacionais e a autenticação são mantidos no Supabase.

  ## Começando

  ### Pré-requisitos

  - Node.js 22.12 ou superior e npm.
  - Acesso a um projeto Supabase configurado com as tabelas, políticas e bucket descritos em [Integração com Supabase](#integração-com-supabase).
  - Contas de teste com os perfis Planejador e Engenheiro para validar os fluxos autenticados.

  ### Instalação e execução

  1. Instale as dependências a partir do lockfile:

     ```bash
     npm ci
     ```

  2. Crie o arquivo `.env` na raiz com as credenciais do projeto Supabase:

     ```dotenv
     VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
     VITE_SUPABASE_ANON_KEY=SUA_CHAVE_ANON_PUBLICA
     ```

     Use somente a chave pública `anon` no frontend. Nunca coloque uma `service_role` ou outro segredo no código ou em variáveis `VITE_*`. O arquivo `.env` não deve ser versionado.

  3. Inicie o servidor de desenvolvimento:

     ```bash
     npm run dev
     ```

  4. Abra o endereço informado pelo Vite, normalmente `http://localhost:5173`.

  Sem as variáveis do Supabase, a aplicação não consegue autenticar nem carregar os dados de negócio.

  ## Como o app funciona

  ### Inicialização e navegação

  1. `index.html` fornece o elemento `#root`; `src/main.tsx` importa os estilos, registra o service worker do PWA e monta o React.
  2. `src/App.tsx` carrega as rotas e o aviso de instalação do PWA.
  3. `src/contexts/AuthContext.tsx` consulta a sessão persistida no Supabase Auth e busca o perfil correspondente em `profiles`.
  4. `src/routes/AppRoutes.tsx` declara as páginas. `src/components/PrivateRoute.tsx` exige sessão e restringe as rotas pelo campo `role` do perfil.
  5. Os hooks das áreas chamam os serviços Supabase, mantêm o estado da tela e atualizam a interface após operações.

  ### Rotas e perfis

  | Rota | Acesso | O que apresenta |
  | --- | --- | --- |
  | `/` | Público | Login; usuário autenticado é encaminhado ao painel do seu perfil. |
  | `/esquecer` | Público | Contatos de suporte para recuperação de acesso. |
  | `/planejador` | `PLANEJADOR` | Projetos, cadastro de obra, agenda e agendamentos. |
  | `/planejador/agenda` | `PLANEJADOR` | Calendário das vistorias dos projetos. |
  | `/inspetor` | `INSPETOR` | Calendário e lista das vistorias atribuídas ao usuário. |

  Não há rota ativa para o perfil Instalador neste momento. A pasta `src/pages/Instalador` contém uma implementação comentada, não ligada à navegação.

  ### Fluxo do Planejador

  1. O painel (`src/pages/Planejador/PainelPlanejador.tsx`) carrega o nome do Planejador, a lista de Engenheiros e os projetos pelo hook `src/hooks/Planejador/usePainelPlanejador.ts`.
  2. Para cadastrar uma obra, informe nome, número do pedido, local, contato do cliente e prazo acordado em dias. O serviço cria o projeto com status `NOVO`.
  3. O botão **Iniciar Obra** muda o status inicial para `INSTRUCAO_OBRA`.
  4. Nas etapas com vistoria, selecione data, horário e Inspetor. O app confere conflitos entre vistorias ativas no mesmo horário, primeiro nos dados carregados e novamente no Supabase antes de gravar.
  5. Se o Inspetor devolver uma data, o cartão mostra a justificativa e permite reenviar o agendamento. O registro existente é atualizado, em vez de criar outra vistoria para a mesma etapa.
  6. Depois que uma vistoria é concluída, `useAutoAvancoFase` avança o projeto para a próxima fase configurada e recarrega os dados.
  7. A agenda do Planejador reúne as inspeções dos projetos e permite navegar pelo calendário e filtrar por Inspetor.

  As fases são definidas em `src/utils/painelPlanejadorConfig.ts`, e as regras de disponibilidade e agrupamento do calendário estão em `src/utils/agendaUtils.ts`. O fluxo enumera `NOVO`, `INSTRUCAO_OBRA`, `MEDICAO`, `COORDENADOR TÉCNICO`, `VISTORIA PRÉ-INSTALAÇÃO`, `PRODUCAO` e `ENTREGA_OBRA`. Há uma particularidade no comportamento atual: `projetoPodeAvancar` bloqueia `PRODUCAO`; portanto, embora `ENTREGA_OBRA` esteja configurada, o avanço padrão não chega a essa fase.

  ### Fluxo do Inspetor

  1. `src/hooks/Inspetor/usePainelInspetor.ts` carrega somente as inspeções cujo `inspetor_id` é o usuário autenticado.
  2. O calendário agrupa as vistorias por data e sinaliza pendências, atrasos e conclusões.
  3. Para aceitar a data, o Inspetor confirma a vistoria. O registro recebe `data_realizada`, `concluido = true` e `status_aprovacao = CONFIRMADO`.
  4. Para devolver o agendamento, informe uma justificativa. O registro fica como `RECUSADO` e volta ao Planejador para reagendamento.
  5. Na fase `INSTRUCAO_OBRA`, o Inspetor pode informar uma previsão opcional de medição. Quando confirma a vistoria com data e horário preenchidos, uma vistoria `MEDICAO` é criada para o mesmo Inspetor.
  6. Na fase `MEDICAO`, é obrigatório salvar o relatório antes de confirmar a vistoria. Ao confirmar, a data de medição e a data limite de entrega (data da medição + prazo acordado do projeto) são atualizadas no projeto.

  ### Relatório de medição

  O formulário em `src/pages/Inspetor/Medicao/FormsMedicao` permite:

  - Adicionar itens individualmente ou em lotes de 1 a 50; a lista exibe 20 itens por vez e permite carregar mais ou localizar um item.
  - Registrar ambiente, descrição, quantidade, largura, altura, peitoril, giro, opções de calha, soleira, acabamento, trilho e observações.
  - Anexar fotos e adicionar observações gerais da obra.

  `src/utils/relatorioSchema.ts` valida o conteúdo antes do envio. `src/services/medicaoService.ts` grava ou atualiza o cabeçalho do relatório, substitui os itens associados e envia fotos ao Storage. A confirmação de vistoria da fase de medição fica bloqueada na interface até o formulário ser salvo.

  ## Integração com Supabase

  O cliente é criado em `src/supabaseClient.tsx` usando `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`. O repositório não contém migrations nem a definição do schema; o ambiente Supabase precisa disponibilizar as tabelas e relacionamentos usados pelo frontend:

  | Tabela/recurso | Uso observado no app |
  | --- | --- |
  | `profiles` | Nome e perfil (`PLANEJADOR` ou `INSPETOR`); lista de Inspetores. |
  | `projects` | Dados da obra, status, prazo e datas de medição/entrega. |
  | `inspections` | Fase, projeto, Inspetor, data prevista/realizada, conclusão, aprovação e justificativa. |
  | `relatorios_medicao` | Cabeçalho do relatório; `inspecao_id` é usado como chave de conflito no upsert. |
  | `itens_medicao` | Itens relacionados ao relatório. |
  | `medicao_fotos` | URLs e nomes dos arquivos associados à medição. |
  | Storage `fotos_medicao` | Arquivos das fotos de medição. |

  As políticas de Row Level Security (RLS), permissões do Storage, constraints e chaves estrangeiras precisam permitir as operações feitas por cada perfil. Esses controles são responsabilidade do projeto Supabase e não são definidos neste repositório.

  ## Organização do código

  | Diretório/arquivo | Responsabilidade |
  | --- | --- |
  | `src/main.tsx`, `src/App.tsx` | Inicialização do React, registro do service worker e composição da aplicação. |
  | `src/routes`, `src/contexts`, `src/components/PrivateRoute.tsx` | Rotas, sessão, perfil e proteção por função. |
  | `src/pages/Planejador` | Painel, cadastro de obra, cartões, fases, agendamento e calendário do Planejador. |
  | `src/pages/Inspetor` | Agenda do Inspetor e componentes do relatório de medição. |
  | `src/hooks` | Estado e regras de interação dos painéis e do PWA. |
  | `src/services` | Consultas e gravações no Supabase. |
  | `src/utils`, `src/validations`, `src/types` | Regras de domínio, validação e contratos TypeScript. |
  | `src/components` | Componentes reutilizáveis, formulários de acesso, controles e interface. |
  | `tests` | Testes unitários e de integração de UI com Vitest; `tests/e2e` contém testes de navegador com Playwright. |
  | `public/guia` | Imagens de referência usadas nas opções do formulário de medição. |

  ## Comandos

  | Comando | Finalidade |
  | --- | --- |
  | `npm run dev` | Inicia o Vite em desenvolvimento com HMR. |
  | `npm run build` | Executa `tsc -b` e gera a versão de produção em `dist/`. |
  | `npm run preview` | Serve localmente o conteúdo já compilado em `dist/`. |
  | `npm run lint` | Executa ESLint no projeto. |
  | `npm run test` | Inicia Vitest em modo interativo/watch. |
  | `npm run test:run` | Executa os testes unitários uma vez. |
  | `npm run test:e2e` | Inicia o servidor Vite e executa os testes Playwright em Chromium. |

Os testes unitários estão configurados em `vite.config.ts` para usar `jsdom` e `tests/setup.ts`. Os cenários atuais cobrem regras do calendário, disponibilidade e conflitos de Inspetor, busca de projetos e validações/formulário do relatório. Para executar somente os arquivos unitários:

```bash
npx vitest run tests/agendaInspetor.test.ts tests/disponibilidadeInspetor.test.ts tests/lupa.test.ts tests/relatorioMedicao/BuscaItem.test.tsx tests/relatorioMedicao/relatorioMedicao.test.ts
```

No estado atual, `npm run test:run` também encontra `tests/e2e/login-and-support.spec.ts` e tenta executá-lo como teste Vitest. Isso causa uma falha de runner, embora os 57 testes unitários distribuídos nos outros cinco arquivos passem. Os testes de navegador devem ser executados separadamente com `npm run test:e2e`; precisam de um Supabase acessível e contas de teste válidas. Para instalar o navegador usado pelo Playwright pela primeira vez, execute `npx playwright install chromium`.

  ## PWA

  O Vite configura um manifesto com o nome Gestão Armony e registra o service worker com atualização automática. O app também oferece instalação em navegadores compatíveis e orienta usuários iOS a adicionar o site à tela inicial. O comportamento offline depende dos recursos efetivamente armazenados em cache; não assuma que as operações Supabase funcionam sem conexão.

  ## Pontos para colaboradores

  - Mantenha os nomes de fase e os valores de `status_aprovacao` compatíveis com os dados existentes no Supabase e com `src/utils/painelPlanejadorConfig.ts`.
  - Ao alterar agendamento, preserve as verificações de conflito local e remota e os casos de reagendamento cobertos em `tests/disponibilidadeInspetor.test.ts`.
  - Ao alterar o relatório, atualize em conjunto tipos, schema, persistência e testes em `tests/relatorioMedicao`.
  - A página `/esquecer` atualmente apresenta canais de suporte; não dispara fluxo automatizado de redefinição de senha pelo Supabase.
- Antes de abrir um PR, execute os testes unitários focados acima, `npm run lint` e `npm run build`. Para mudanças nos fluxos de acesso, rode também `npm run test:e2e` com ambiente de teste configurado. `npm run test:run` requer separar a descoberta dos specs Playwright da configuração Vitest.
