# Debug Session: vercel-stripe-checkout
- **Status**: [OPEN]
- **Issue**: Erro `FUNCTION_INVOCATION_FAILED` na Vercel ao clicar no pagamento com valor fixo no card de oferta
- **Debug Server**: Pending
- **Log File**: .dbg/trae-debug-log-vercel-stripe-checkout.ndjson

## Reproduction Steps
1. Acessar a pagina com o card de oferta em producao.
2. Clicar no botao de pagamento com valor fixo.
3. Observar falha serverless na Vercel antes do redirecionamento ao Stripe Checkout.

## Hypotheses & Verification
| ID | Hypothesis | Likelihood | Effort | Evidence |
|----|------------|------------|--------|----------|
| A | `STRIPE_SECRET_KEY` nao esta configurada em producao e o handler lanca erro antes de criar a sessao | High | Low | Partially confirmed: usuario informou que Production usa apenas `VITE_*`; codigo foi ajustado para exigir `STRIPE_SECRET_KEY` em producao |
| B | O endpoint de oferta nao esta exportado/encaminhado corretamente no runtime da Vercel e falha ao invocar a funcao | Med | Med | Rejected: rota local `POST /api/stripe/create-checkout-session` respondeu `200` com URL do checkout |
| C | O uso de `VITE_STRIPE_SECRET_KEY` como fallback mascara configuracao incorreta entre cliente e servidor | Med | Low | Confirmed: ambiente local funcionava via fallback; isso escondia divergencia entre dev e runtime serverless |
| D | O objeto enviado ao Stripe para a oferta falha apenas em producao por validacao de conta/moeda/origem | Low | Med | Rejected: mesma criacao de sessao funcionou localmente com o fluxo atual |
| E | O `origin` recebido no handler esta invalido em producao e causa excecao ao montar URLs de retorno | Low | Low | Rejected: nenhum indicio local; erro mais provavel esta na configuracao da chave server-side |
| F | O `vercel.json` esta roteando a SPA, mas nao preserva explicitamente `/api/*`, causando comportamento inconsistente nas Functions | High | Low | Pending: reescrito para usar `rewrites` explicitos e `functions` para `api/**/*.ts` |

## Log Evidence
- `curl -X POST http://127.0.0.1:5173/api/stripe/create-checkout-session` retornou `200 OK` com `url` do Stripe Checkout.
- `.env` local continha apenas variaveis `VITE_STRIPE_*`, o que funcionava no dev middleware do Vite.
- Usuario confirmou que a Vercel Production tambem estava configurada apenas com `VITE_*`.
- Build local `npm run build` passou apos a correcao.
- O erro persistiu mesmo apos criar `STRIPE_SECRET_KEY` em Production, aumentando a probabilidade de problema de roteamento/runtime da Function na Vercel.
- Instrumentacao adicionada no handler de checkout com `stage` e endpoint `GET /api/stripe/health`.
- `vercel.json` foi ajustado para `outputDirectory`, `functions` e `rewrites` explicitos para `/api/:path*`.

## Verification Conclusion
- Causa raiz mais provavel: configuracao de chave secreta do Stripe acoplada a `VITE_*`, adequada ao dev local mas inadequada para o runtime server-side da Vercel.
- Causa secundaria agora investigada: configuracao de deploy/roteamento da Vercel pode estar impedindo ou quebrando a invocacao confiavel da Function.
- Correcoes aplicadas: `api/stripe/create-offer-checkout-session.ts` exige `STRIPE_SECRET_KEY` em producao, `api/stripe/create-checkout-session.ts` reporta `stage` em erros, `api/stripe/health.ts` permite verificar runtime/env, e `vercel.json` preserva `/api/*` explicitamente.
- Acao pendente para verificacao final: redeployar e testar `GET /api/stripe/health` e depois `POST /api/stripe/create-checkout-session`.
