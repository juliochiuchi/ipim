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
      <div className="min-h-screen w-full bg-ipimBgDark">
        <div className="mx-auto max-w-7xl p-4 phone:p-2">
          <div className="rounded-xl bg-ipimBgDark p-4 phone:p-2">
            <div className="flex w-full gap-4 phone:flex-col phone:gap-3 tablet:flex-col tablet:gap-4 laptopMd:flex-row">
              {/* Player Video Section */}
              <div className="flex-1 rounded-xl bg-[#09090A] p-4 phone:p-2 phone:min-h-[300px] tablet:min-h-[400px] laptopMd:min-h-[500px]">
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
                    <span className="text-center text-sm phone:text-xs text-gray-400 font-source">
                      Selecione um vídeo para assistir
                    </span>
                  </div>
                )}
              </div>

              {/* Video List Section */}
              <div className="flex justify-center rounded-xl bg-[#121214] phone:w-full tablet:w-full laptopMd:w-80 laptopLg:w-96">
                <div className="m-3 flex w-full flex-col gap-3 py-2 phone:m-2">
                  <div>
                    <p className="text-center text-base font-bold text-white phone:text-sm font-poppins">
                      Transmissões
                    </p>
                  </div>

                  <div className="w-full border-t-[1px] border-[#323238]" />

                  <div className="max-h-[600px] overflow-y-auto phone:max-h-[400px] tablet:max-h-[500px] scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
                    {availableVideos.map((cardVideo, index: number) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            handleVideoSelect(cardVideo.id)
                            executeScroll()
                          }}
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
    </>
  )
}
