import { useState } from 'react'
import { CreditCard, HandCoins, Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { OfferActionCard } from '@/components/doe/offer-action-card'
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
    <Card className="flex h-full flex-col border-zinc-200/80 bg-ipimBgSectionNextStep shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30">
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

      <CardFooter className="flex flex-col items-stretch gap-4 pt-0 tablet:flex-row">
        <OfferActionCard
          type="button"
          onClick={handleCheckout}
          disabled={loading}
          title="Doar valor fixo"
          description={loading ? 'Abrindo checkout...' : 'Oferta de R$ 100,00'}
          icon={loading ? <Loader2 className="animate-spin" /> : <CreditCard />}
        />

        <OfferActionCard
          as="a"
          href="https://donate.stripe.com/7sY4gs0bv4wA0sv3mNdQQ00"
          target="_blank"
          rel="noreferrer"
          variant="indigo"
          title="Escolha um valor"
          description="Contribua com o valor que desejar."
          icon={<HandCoins />}
        />
      </CardFooter>

      <CardContent className="pt-4 text-[.82rem] font-light italic text-left leading-relaxed text-zinc-500 dark:text-zinc-400">
        <p>Pagamento processado em ambiente seguro.</p>
      </CardContent>
    </Card>
  )
}
