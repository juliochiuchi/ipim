import VideoPlayerLive from '@/components/video-player-live/video-player-live'
import { createFileRoute } from '@tanstack/react-router'

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
          <div className="mb-8 text-center">
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
          <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden transition-all duration-300 hover:shadow-3xl">
            <div className="p-6 phone:p-4">
              <VideoPlayerLive />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-source transition-colors duration-300">
              Transmissão direta do YouTube &nbsp; • &nbsp; Qualidade ajustada automaticamente
            </p>
            <div className="mt-4 flex justify-center gap-6 phone:gap-4 phone:flex-col phone:items-center phone:flex-row">
              <a
                href="https://youtube.com/ipimacaubal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ipimIndigoLight dark:text-ipimIndigoLight hover:text-ipimIndigoDark dark:hover:text-white transition-colors duration-200 font-inter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Visitar nosso canal
              </a>
              <a
                href="https://maps.app.goo.gl/64dCtoF9D114BzPn8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-ipimIndigoLight dark:text-ipimIndigoLight hover:text-ipimIndigoDark dark:hover:text-white transition-colors duration-200 font-inter"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Visitar presencialmente
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
