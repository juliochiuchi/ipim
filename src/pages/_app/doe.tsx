import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Banknote, FileText, Landmark } from 'lucide-react'
import { toast } from 'sonner'

import QRCodePixIPIM from '@/assets/qrcode-pix.png'
import PixDonationCard from '@/components/doe/pix-donation-card'
import StripeOfferCard from '@/components/doe/stripe-offer-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const Route = createFileRoute('/_app/doe')({
  component: Doe,
})

function Doe() {
  const navigate = useNavigate()
  const pixKey = '51.848.240/0001-81'

  useEffect(() => {
    const checkout = new URLSearchParams(window.location.search).get('checkout')
    if (!checkout) return

    if (checkout === 'success') toast.success('Pagamento confirmado')
    if (checkout === 'cancel') toast.message('Checkout cancelado')

    navigate({ to: '/doe', replace: true })
  }, [navigate])

  const bankDetails = [
    { label: 'Banco', value: 'Santander (033)' },
    { label: 'Agência', value: '0395' },
    { label: 'Conta Corrente', value: '13.00164-4' },
    { label: 'CNPJ', value: pixKey },
  ]

  return (
    <div className="min-h-screen w-full bg-ipimBgSectionNextStep/30 dark:bg-[#1a1a20] transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-6 py-10 phone:px-4 tablet:py-12">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-poppins text-4xl font-bold tracking-tight text-zinc-900 dark:text-white phone:text-3xl tablet:text-5xl">
            Contribua com a IPIM
          </h1>
          <p className="mt-3 font-source text-lg text-zinc-600 dark:text-zinc-300 phone:text-base">
            Sua contribuição nos ajuda a continuar nossa missão de levar a Palavra de Deus e servir nossa comunidade.
          </p>
        </header>

        <div className="mt-8 grid gap-5 tablet:grid-cols-2 tablet:items-stretch">
          <StripeOfferCard />
          <PixDonationCard pixKey={pixKey} qrCodeSrc={QRCodePixIPIM} />
        </div>

        <hr className="my-10 border-zinc-200/70 dark:border-zinc-800/60" />

        <div className="grid gap-5 tablet:grid-cols-2 tablet:items-start">
          <Card className="border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30">
            <CardHeader className="space-y-1.5 pb-4">
              <CardTitle className="flex items-center gap-2 font-poppins text-2xl">
                <Landmark className="text-ipimGreen" />
                Transferência Bancária
              </CardTitle>
              <CardDescription className="font-source">
                Para transferências e depósitos diretamente na conta da igreja.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-xl border border-zinc-200/70 bg-white/60 p-4 dark:border-zinc-800/60 dark:bg-zinc-950/20">
                {bankDetails.map((item) => (
                  <div key={item.label} className="min-w-0 space-y-1">
                    <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      {item.label}
                    </dt>
                    <dd className="truncate whitespace-nowrap font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="rounded-xl border border-zinc-200/70 bg-white/60 p-4 text-center text-sm text-zinc-700 dark:border-zinc-800/60 dark:bg-zinc-950/20 dark:text-zinc-200">
                Igreja Presbiteriana Independente de Macaubal
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-5">
            <Card className="border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30">
              <CardHeader className="space-y-1.5">
                <CardTitle className="flex items-center gap-2 font-poppins text-xl">
                  <FileText className="text-ipimYellow" />
                  Cheque
                </CardTitle>
                <CardDescription className="font-source">
                  Nominal à Igreja Presbiteriana Independente de Macaubal.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30">
              <CardHeader className="space-y-1.5">
                <CardTitle className="flex items-center gap-2 font-poppins text-xl">
                  <Banknote className="text-ipimGreen" />
                  Dinheiro
                </CardTitle>
                <CardDescription className="font-source">
                  Contribua presencialmente durante nossos cultos e encontros.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        <Card className="mx-auto mt-6 max-w-4xl border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30">
          <CardContent className="space-y-1 p-5 text-center font-source text-sm text-zinc-600 dark:text-zinc-300">
            <p>Sua contribuição é fundamental para continuarmos nossa missão de servir a Deus e nossa comunidade.</p>
            <p>As doações são utilizadas para manutenção da igreja, projetos sociais e evangelização.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
