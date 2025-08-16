import type { IPlayerVideoProps } from '../../global-types/player-video/player-video.types'
import IPIBImage from '../../assets/IPIB-icon.png'

export const PlayerVideo = ({
  id,
  title,
  description,
  imagePerson,
  namePerson,
  role,
  urlVideo,
}: IPlayerVideoProps) => {
  console.log(id)

  return (
    <>
      <div className="w-full">
        <iframe
          className="w-full rounded-lg phone:h-[200px] tablet:h-[300px] laptopMd:h-[400px] desktop:h-[470px]"
          src={urlVideo}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <div className="flex gap-3 px-3 py-4 phone:flex-col phone:gap-4 tablet:flex-col tablet:gap-4 laptopMd:flex-row">
        <div className="flex-1 phone:w-full">
          <h1 className="text-xl font-bold text-white phone:text-lg tablet:text-xl font-poppins">{title}</h1>
          <p className="text-sm text-white phone:text-xs tablet:text-sm mt-2 font-source">{description}</p>
        </div>

        <div className="flex gap-3 phone:flex-col phone:w-full tablet:flex-row tablet:justify-center laptopMd:flex-col laptopMd:w-auto">
          <button className="rounded-md bg-[#00875f] p-3 text-center text-sm text-white phone:text-xs phone:p-2 tablet:flex-1 laptopMd:flex-none hover:bg-[#00b37e] transition-colors font-inter">
            Acessar Comunidade
          </button>
          <a
            href="https://youtube.com/ipimacaubal"
            target="_blank"
            className="rounded-md border border-[#81D8F7] p-3 text-center text-sm text-[#81D8F7] phone:text-xs phone:p-2 tablet:flex-1 laptopMd:flex-none hover:bg-[#81D8F7] hover:text-white transition-colors font-inter"
          >
            Acessar nosso canal
          </a>
        </div>
      </div>

      <div className="flex cursor-pointer items-center gap-3 px-3 py-4 phone:gap-2 hover:bg-[#1a1a1c] transition-colors rounded-lg">
        <div className="relative block">
          <img
            className="h-16 w-16 rounded-full phone:h-12 phone:w-12 tablet:h-14 tablet:w-14 object-cover"
            src={imagePerson || IPIBImage}
            alt={`Foto de ${namePerson}`}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-base text-white phone:text-sm tablet:text-base font-nunito font-medium">{namePerson}</span>
          <span className="text-xs text-gray-300 phone:text-xs tablet:text-sm font-source">{role}</span>
        </div>
      </div>
    </>
  )
}
