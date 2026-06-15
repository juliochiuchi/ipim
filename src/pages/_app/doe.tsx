import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { Banknote, FileText, HeartHandshake, Landmark, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

import QRCodePixIPIM from '@/assets/qrcode-pix.png'
import { PageContainer } from '@/components/page-container/page-container'
import PixDonationCard from '@/components/doe/pix-donation-card'
import StripeOfferCard from '@/components/doe/stripe-offer-card'
import { PageHero } from '@/components/page-hero/page-hero'
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
      <PageContainer className="py-10 tablet:py-12">
        <div className="animate-in slide-in-from-top-4 duration-700 fade-in">
          <PageHero
            eyebrow="Doações"
            title="Contribua com a IPIM"
            description="Sua contribuição nos ajuda a continuar nossa missão de levar a Palavra de Deus e servir nossa comunidade."
          />
        </div>

        <div className="mt-6 grid gap-5 tablet:mt-8 tablet:grid-cols-2 tablet:items-stretch animate-in slide-in-from-bottom-4 duration-700 delay-100 fade-in fill-mode-backwards">
          <StripeOfferCard />
          <PixDonationCard pixKey={pixKey} qrCodeSrc={QRCodePixIPIM} />
        </div>

        <hr className="my-10 border-zinc-200/70 transition-colors dark:border-zinc-800/60 animate-in fade-in duration-700 delay-150 fill-mode-backwards" />

        <div className="grid gap-5 tablet:grid-cols-2 tablet:items-start animate-in slide-in-from-bottom-4 duration-700 delay-200 fade-in fill-mode-backwards">
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

        <Card className="mt-6 w-full overflow-hidden border-zinc-200/60 bg-white/75 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30 animate-in slide-in-from-bottom-4 duration-700 delay-300 fade-in fill-mode-backwards">
          <div className="h-1 w-full bg-gradient-to-r from-ipimGreen via-ipimIndigoLight to-ipimYellow" />
          <CardContent className="relative p-6 tablet:p-7">
            <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-ipimGreen/10 blur-3xl dark:bg-ipimGreen/15" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-28 w-28 rounded-full bg-ipimIndigoLight/10 blur-3xl dark:bg-ipimIndigoLight/15" />

            <div className="relative space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-ipimGreen/20 bg-ipimGreen/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ipimGreen dark:border-ipimGreen/30 dark:bg-ipimGreen/15">
                  <HeartHandshake className="h-3.5 w-3.5" />
                  Impacto da sua contribuição
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 dark:border-zinc-800/60 dark:bg-zinc-950/20 dark:text-zinc-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-ipimIndigoLight" />
                  Transparência e cuidado
                </span>
              </div>

              <div className="max-w-2xl space-y-2">
                <h3 className="font-poppins text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                  Sua generosidade fortalece a missão da IPIM
                </h3>
                <p className="font-source text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 tablet:text-base">
                  Cada contribuição ajuda a igreja a servir pessoas com constância, responsabilidade e presença real na comunidade.
                </p>
              </div>

              <div className="grid gap-4 tablet:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-950/20">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    Por que sua doação importa
                  </p>
                  <p className="mt-2 font-source text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                    Sua contribuição é fundamental para continuarmos nossa missão de servir a Deus e nossa comunidade.
                  </p>
                </div>

                <div className="rounded-2xl border border-zinc-200/70 bg-white/70 p-4 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-950/20">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                    Como os recursos são aplicados
                  </p>
                  <p className="mt-2 font-source text-sm leading-relaxed text-zinc-700 dark:text-zinc-200">
                    As doações são utilizadas para manutenção da igreja, projetos sociais e ações de evangelização.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </PageContainer>
    </div>
  )
}
