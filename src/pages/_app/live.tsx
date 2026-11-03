import { PageContainer } from '@/components/page-container/page-container'
import VideoPlayerLive from '@/components/video-player-live/video-player-live'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { MapPin, Radio, Youtube } from 'lucide-react'

export const Route = createFileRoute('/_app/live')({
  component: Live,
})

const LIVE_LINKS = {
  youtube: 'https://youtube.com/ipimacaubal',
  location: 'https://maps.app.goo.gl/64dCtoF9D114BzPn8',
}

function Live() {
  return (
    <div className="min-h-screen bg-ipimWhiteSnow py-10 transition-colors duration-300 dark:bg-gradient-to-br dark:from-zinc-950 dark:to-zinc-900 tablet:py-14">
      <PageContainer className="max-w-5xl">
        {/* Cabeçalho enxuto — substitui o banner antigo */}
        <header className="flex flex-col items-center gap-4 text-center animate-in slide-in-from-top-4 duration-700 fade-in">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30 dark:text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-ipimGreen" />
            Ao Vivo
          </span>

          <h1 className="font-poppins text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white tablet:text-5xl">
            Culto Online
          </h1>

          <p className="max-w-2xl font-source text-base leading-relaxed text-zinc-600 dark:text-zinc-300 tablet:text-lg">
            Acompanhe os cultos e eventos da IPIM em tempo real, de onde você estiver.
          </p>
        </header>

        <div className="mt-8 animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards delay-100 tablet:mt-10">
          <VideoPlayerLive />
        </div>

        {/* Barra de informações e ações */}
        <div className="mt-5 flex flex-col gap-5 rounded-3xl border border-zinc-200/60 bg-white/70 p-5 shadow-sm backdrop-blur transition-colors duration-300 animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards delay-200 dark:border-zinc-800/60 dark:bg-zinc-950/30 tablet:mt-6 tablet:flex-row tablet:items-center tablet:justify-between tablet:p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-ipimGreen/10 text-ipimGreen dark:bg-ipimGreen/15 dark:text-ipimGreenLight">
              <Radio className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="font-poppins font-semibold text-zinc-900 dark:text-white">
                Transmissão ao Vivo
              </p>
              <p className="font-source text-sm text-zinc-500 dark:text-zinc-400">
                YouTube IPIM Macaubal • qualidade adaptativa
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 tablet:flex-row">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-xl border-0 bg-gradient-to-r from-ipimIndigoLight to-ipimIndigoDark px-6 font-poppins text-white shadow-lg shadow-ipimIndigoLight/25 transition-all duration-300 hover:scale-[1.02]"
            >
              <a href={LIVE_LINKS.youtube} target="_blank" rel="noopener noreferrer">
                <Youtube className="h-4 w-4" />
                Canal no YouTube
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-xl border-2 border-ipimGreen bg-transparent px-6 font-poppins text-ipimGreen shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-ipimGreen hover:text-white dark:text-ipimGreenLight dark:hover:text-white"
            >
              <a href={LIVE_LINKS.location} target="_blank" rel="noopener noreferrer">
                <MapPin className="h-4 w-4" />
                Visitar presencialmente
              </a>
            </Button>
          </div>
        </div>
      </PageContainer>
    </div>
  )
}
