import { PageContainer } from '@/components/page-container/page-container'
import { PageHero } from '@/components/page-hero/page-hero'
import VideoPlayerLive from '@/components/video-player-live/video-player-live'
import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { MapPin, Youtube } from 'lucide-react'

export const Route = createFileRoute('/_app/live')({
  // loader: async () => {
  //   const { data: test } = await supabase.from('test').select('*')
  //   return { test }
  // },
  component: Live,
})

function Live() {
  // const { test } = Route.useLoaderData()
  // console.log('response test ->', test)

  return (
    <>
      <div className="min-h-screen bg-ipimWhiteSnow dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 py-8 transition-colors duration-300">
        <PageContainer>
          {/* Header */}
          <div className="mb-8 animate-in slide-in-from-top-4 duration-700 fade-in">
            <PageHero
              eyebrow="Ao Vivo"
              title="Transmissão ao Vivo"
              description={
                <>
                  Acompanhe os cultos e eventos da IPIM em tempo real.
                  <span className="mt-2 block text-xs text-gray-600 dark:text-gray-300">
                    O vídeo estará disponível enquanto o canal estiver transmitindo.
                  </span>
                </>
              }
            />
          </div>

          {/* Live Player Container */}
          <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden transition-all duration-300 hover:shadow-3xl animate-in slide-in-from-bottom-4 fill-mode-backwards delay-100">
            <div className="phone:p-4 tablet:p-6">
              <VideoPlayerLive />
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-8 animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards delay-200">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-source transition-colors duration-300 text-center max-w-md">
                Transmissão direta do YouTube &nbsp; • &nbsp; Qualidade ajustada automaticamente
              </p>
            </div>

            <div className="flex flex-wrap gap-4 w-full justify-center px-4 phone:flex-col tablet:flex-row tablet:w-auto">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-ipimIndigoLight to-ipimIndigoDark hover:scale-[1.02] text-white shadow-lg shadow-ipimIndigoLight/30 transition-all duration-300 w-auto h-12 px-8 rounded-xl font-poppins border-0"
              >
                <a
                  href="https://youtube.com/ipimacaubal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Youtube className="mr-2 h-5 w-5" />
                  Visitar nosso canal
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-ipimGreen text-ipimGreen dark:text-ipimGreen hover:scale-[1.02] dark:hover:text-white shadow-sm transition-all duration-300 w-auto h-12 px-8 rounded-xl font-poppins bg-transparent"
              >
                <a
                  href="https://maps.app.goo.gl/64dCtoF9D114BzPn8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Visitar presencialmente
                </a>
              </Button>
            </div>
          </div>
        </PageContainer>
      </div>
    </>
  )
}
