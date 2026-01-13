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
      <div className="min-h-screen bg-ipimWhiteSnow dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 py-8 px-4 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 text-center animate-in slide-in-from-top-4 duration-700 fade-in">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-2 transition-colors duration-300">
              Transmissão ao Vivo
            </h1>
            <p className="text-gray-600 dark:text-gray-300 font-source transition-colors duration-300">
              Acompanhe os cultos e eventos da IPIM em tempo real
            </p>
            <span className="text-xs text-gray-600 dark:text-gray-300 font-source">
              O vídeo estará disponível enquanto o canal estiver transmitindo
            </span>
          </div>

          {/* Live Player Container */}
          <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden transition-all duration-300 hover:shadow-3xl animate-in slide-in-from-bottom-4 fill-mode-backwards delay-100">
            <div className="p-6 phone:p-4">
              <VideoPlayerLive />
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center gap-8 animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards delay-200">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-source transition-colors duration-300 text-center max-w-md">
              Transmissão direta do YouTube &nbsp; • &nbsp; Qualidade ajustada automaticamente
            </p>

            <div className="flex flex-col flex-wrap gap-4 w-full sm:w-auto justify-center px-4">
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
        </div>
      </div>
    </>
  )
}
