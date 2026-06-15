import { useState } from 'react'
import { ArrowUpRight, CreditCard, HandCoins, Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { stripeService } from '@/services/stripe.service'

export default function StripeOfferCard() {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const url = await stripeService.createOfferCheckoutSession()
      window.location.assign(url)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro inesperado ao iniciar o checkout'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="flex h-full flex-col border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30">
      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-center justify-between gap-4 phone:flex-col phone:items-start">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 font-poppins text-2xl">
              <Sparkles className="text-ipimIndigoLight" />
              Oferta
            </CardTitle>
            <CardDescription className="font-source">
              Ajude com uma contribuição rápida via cartão.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardFooter className="flex items-stretch gap-4 pt-0">
        <a
          href="https://donate.stripe.com/test_14A4gs9M98U2bAn9Ird7q00"
          target="_blank"
          rel="noreferrer"
          className="group flex min-h-[10rem] min-w-0 flex-1 flex-col justify-between rounded-2xl border border-zinc-200/70 bg-white/60 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ipimIndigoLight/40 dark:border-zinc-800/60 dark:bg-zinc-950/20 dark:hover:bg-zinc-950/30"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ipimIndigoLight/10 text-ipimIndigoLight">
              <HandCoins />
            </div>
            <ArrowUpRight className="text-zinc-400 transition group-hover:text-zinc-700 dark:group-hover:text-zinc-200" />
          </div>
          <div className="space-y-1">
            <div className="font-poppins text-base font-semibold text-zinc-900 dark:text-white">
              Escolha um valor
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              Contribua com o valor que desejar.
            </div>
          </div>
        </a>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          className="group flex min-h-[10rem] min-w-0 flex-1 flex-col justify-between rounded-2xl border border-ipimIndigoLight/30 bg-ipimIndigoLight/5 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-ipimIndigoLight/10 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ipimIndigoLight/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ipimIndigoLight text-white">
              {loading ? <Loader2 className="animate-spin" /> : <CreditCard />}
            </div>
            <ArrowUpRight className="text-zinc-400 transition group-hover:text-zinc-700 dark:group-hover:text-zinc-200" />
          </div>
          <div className="space-y-1">
            <div className="font-poppins text-base font-semibold text-zinc-900 dark:text-white">
              Doar valor fixo
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              {loading ? 'Abrindo checkout...' : 'Oferta de R$ 10,00'}
            </div>
          </div>
        </button>
      </CardFooter>

      <CardContent className="pt-4 text-[.9rem] italic text-left leading-relaxed text-zinc-600 dark:text-zinc-300">
        <p>Pagamento processado em ambiente seguro pela Stripe.</p>
      </CardContent>
    </Card>
  )
}
