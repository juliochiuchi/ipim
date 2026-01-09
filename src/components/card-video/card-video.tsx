import type { ICardVideoProps } from '../../global-types/card-video/card-video.types'

export const CardVideo = ({
  dateVideo,
  detailVideo,
  liveVideo = false,
  messageName,
  standBy = false,
}: ICardVideoProps) => {
  return (
    <>
      <div className="my-2 flex flex-col gap-3 phone:gap-2">
        <span className="text-xs text-[#8D8D99] phone:text-xs phone:text-sm font-source">{dateVideo}</span>

        <div
          className={`${standBy ? 'border-[#00875f] bg-[#00875f]' : 'border-[#323238]'
            } cursor-pointer rounded-md border p-3 phone:p-2 phone:p-3 hover:border-[#00875f] transition-all duration-200`}
        >
          <div className="flex flex-row items-center justify-between phone:flex-col phone:items-start phone:gap-2 phone:flex-row phone:items-center">
            <span
              className={`${standBy ? 'text-white' : 'text-[#81D8F7]'
                } text-xs phone:text-xs phone:text-sm font-source`}
            >
              {detailVideo}
            </span>

            <span
              className={`${standBy
                  ? 'border-white text-white'
                  : 'border-[#00b37e] text-[#00b37e]'
                } rounded-md border p-2 text-xs phone:text-xs phone:px-2 phone:py-1 phone:text-sm font-inter`}
            >
              {liveVideo ? 'Ao vivo' : 'Transmitido'}
            </span>
          </div>

          <div className="mt-3 phone:mt-2">
            <span
              className={`${standBy ? 'text-white' : 'text-[#c4c4cc]'
                } text-sm font-bold phone:text-xs phone:text-sm font-nunito`}
            >
              {messageName}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
