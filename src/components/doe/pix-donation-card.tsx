import { useState } from 'react'
import { Check, Copy, QrCode, ShieldCheck } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type PixDonationCardProps = {
  pixKey: string
  qrCodeSrc: string
}

export default function PixDonationCard({ pixKey, qrCodeSrc }: PixDonationCardProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(pixKey)
      setCopied(true)
      toast.success('Chave PIX copiada')
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Não foi possível copiar a chave PIX')
    }
  }

  return (
    <Card className="flex h-full flex-col border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30">
      <CardHeader className="space-y-2 pb-4">
        <div className="flex items-start justify-between gap-3">
          <CardTitle className="flex items-center gap-2 font-poppins text-2xl">
            <QrCode className="text-ipimIndigoLight" />
            PIX
          </CardTitle>
          <div className="inline-flex items-center gap-2 rounded-full bg-ipimIndigoLight/10 px-3 py-1 text-xs font-semibold text-ipimIndigoLight">
            <ShieldCheck className="h-4 w-4" />
            Rápido e seguro
          </div>
        </div>
        <CardDescription className="font-source">
          Escaneie o QR Code ou copie a chave para contribuir em segundos.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-5">
        <div className="grid gap-5 tablet:grid-cols-[200px_1fr] tablet:items-center">
          <div className="mx-auto w-fit rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200/70 dark:ring-zinc-800/60">
            <img
              src={qrCodeSrc}
              alt="QR Code PIX da IPIM"
              className="h-40 w-40 rounded-xl object-contain"
              loading="lazy"
            />
          </div>

          <div className="space-y-2.5">
            <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-300">
              <p className="font-source">
                1. Abra o app do seu banco
              </p>
              <p className="font-source">
                2. Vá em PIX
              </p>
              <p className="font-source">
                3. Escaneie o QR Code e confirme
              </p>
            </div>

            <div className="rounded-xl border border-zinc-200/70 bg-white/70 p-4 dark:border-zinc-800/60 dark:bg-zinc-950/20">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Chave PIX (CNPJ)</p>
              <div className="mt-2 flex items-center justify-between gap-3 phone:flex-col phone:items-stretch">
                <span className="truncate rounded-md bg-zinc-100 px-3 py-2 font-mono text-sm text-zinc-900 dark:bg-zinc-900/60 dark:text-zinc-100">
                  {pixKey}
                </span>
                <Button
                  type="button"
                  onClick={handleCopy}
                  className="bg-ipimIndigoLight text-white hover:bg-ipimIndigoDark phone:w-full"
                >
                  {copied ? <Check /> : <Copy />}
                  {copied ? 'Copiado' : 'Copiar'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
