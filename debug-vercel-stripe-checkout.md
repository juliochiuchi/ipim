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
| A | `STRIPE_SECRET_KEY` nao esta configurada em producao e o handler lanca erro antes de criar a sessao | High | Low | Pending |
| B | O endpoint de oferta nao esta exportado/encaminhado corretamente no runtime da Vercel e falha ao invocar a funcao | Med | Med | Pending |
| C | O uso de `VITE_STRIPE_SECRET_KEY` como fallback mascara configuracao incorreta entre cliente e servidor | Med | Low | Pending |
| D | O objeto enviado ao Stripe para a oferta falha apenas em producao por validacao de conta/moeda/origem | Low | Med | Pending |
| E | O `origin` recebido no handler esta invalido em producao e causa excecao ao montar URLs de retorno | Low | Low | Pending |

## Log Evidence
[Aguardando coleta]

## Verification Conclusion
[Aguardando comparacao pre-fix vs post-fix]
