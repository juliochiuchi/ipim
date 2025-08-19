import { useEffect, useState, useRef } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { CardVideo } from '@/components/card-video/card-video'
import { PlayerVideo } from '@/components/player-video/player-video'
import { availableVideos } from '@/mock/card-video/card-video.mock'
import type { IPlayerVideoProps } from '@/global-types/player-video/player-video.types'

export const Route = createFileRoute('/_app/catalogo-acampamento')({
  component: CatalogoAcampamento,
})

function CatalogoAcampamento() {
  const [selectedVideo, setSelectedVideo] = useState<IPlayerVideoProps>()
  const myRef = useRef<HTMLDivElement>(null)
  const executeScroll = () => myRef.current?.scrollIntoView()

  const handleVideoSelect = (id: number) => {
    availableVideos.forEach((video) => {
      video.standBy = false
    })

    const video = availableVideos.find((video) => video.id === id)

    if (video) {
      video.standBy = true
      setSelectedVideo(video)
    } else {
      setSelectedVideo(undefined)
    }
  }

  useEffect(() => {
    handleVideoSelect(1)
  }, [])

  return (
    <>
      <div ref={myRef}>
        <div className="min-h-screen w-full bg-gradient-to-br from-ipimBgDark via-zinc-900 to-zinc-800">
          {/* Main Content */}
          <div className="mx-auto max-w-[1800px] p-6 phone:p-4 laptopLg:p-8 desktop:p-12">
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-700/30 shadow-2xl overflow-hidden">
              <div className="p-6 phone:p-4 laptopLg:p-8 desktop:p-12">
                <div className="flex w-full gap-6 phone:flex-col phone:gap-4 tablet:flex-col tablet:gap-6 laptopMd:flex-row laptopLg:gap-8 desktop:gap-12">
                  {/* Player Video Section */}
                  <div className="flex-1 rounded-2xl bg-gradient-to-br from-[#09090A] to-zinc-900 border border-zinc-700/30 shadow-xl overflow-hidden">
                    <div className="p-6 phone:p-4 laptopLg:p-8 desktop:p-10 phone:min-h-[300px] tablet:min-h-[400px] laptopMd:min-h-[500px] laptopLg:min-h-[600px] desktop:min-h-[700px]">
                      {selectedVideo !== undefined ? (
                        <PlayerVideo
                          id={selectedVideo.id}
                          title={selectedVideo.title}
                          description={selectedVideo.description}
                          urlVideo={selectedVideo.urlVideo}
                          imagePerson={selectedVideo.imagePerson}
                          namePerson={selectedVideo.namePerson}
                          role={selectedVideo.role}
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-center phone:min-h-[250px]">
                          <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-700/50 flex items-center justify-center phone:w-12 phone:h-12">
                              <svg className="w-8 h-8 text-zinc-400 phone:w-6 phone:h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </div>
                            <span className="text-lg text-zinc-400 font-source phone:text-sm tablet:text-base laptopLg:text-xl">
                              Selecione um vídeo para assistir
                            </span>
                            <p className="text-sm text-zinc-500 mt-2 font-source phone:text-xs">
                              Escolha uma transmissão da lista ao lado
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Video List Section */}
                  <div className="rounded-2xl bg-gradient-to-br from-[#121214] to-zinc-800 border border-zinc-700/30 shadow-xl phone:w-full tablet:w-full laptopMd:w-80 laptopLg:w-96 desktop:w-[420px]">
                    <div className="p-6 phone:p-4 laptopLg:p-6 desktop:p-8">
                      <div className="mb-6 phone:mb-4">
                        <h2 className="text-xl font-bold text-white font-poppins text-center phone:text-lg laptopLg:text-2xl desktop:text-3xl">
                          Transmissões
                        </h2>
                        <p className="text-sm text-zinc-400 text-center mt-2 font-source phone:text-xs laptopLg:text-base">
                          {availableVideos.length} vídeos disponíveis
                        </p>
                      </div>

                      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-6 phone:mb-4" />

                      <div className="max-h-[600px] overflow-y-auto phone:max-h-[400px] tablet:max-h-[500px] laptopLg:max-h-[700px] desktop:max-h-[800px] scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-600 hover:scrollbar-thumb-zinc-500 pr-2">
                        <div className="space-y-3 phone:space-y-2 px-1">
                          {availableVideos.map((cardVideo, index: number) => {
                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  handleVideoSelect(cardVideo.id)
                                  executeScroll()
                                }}
                                className="transform transition-all duration-200 hover:scale-[1.02] cursor-pointer origin-center"
                              >
                                <CardVideo
                                  dateVideo={cardVideo.dateVideo}
                                  detailVideo={cardVideo.detailVideo}
                                  liveVideo={cardVideo.liveVideo}
                                  messageName={cardVideo.messageName}
                                  standBy={cardVideo.standBy}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
