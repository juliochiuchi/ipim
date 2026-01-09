import { Video } from 'lucide-react'
import Paper from '../paper/paper'

export default function Schedule() {
  return (
    <section className="bg-[#f6f6f6] text-[#333] py-10 px-4 tablet:px-12 tablet:py-20 laptop:px-20 desktop:px-72">
      <div className="flex flex-wrap items-start justify-center laptop:justify-between gap-10">

        <div className="w-full max-w-[35rem] flex flex-col gap-10 items-center text-center justify-start font-poppins laptop:items-start laptop:text-left">
          <div className="flex items-start gap-3 w-full justify-center laptop:justify-start">
            <div className="hidden laptop:flex">
              <Video size={44} />
            </div>

            <div className="flex flex-col gap-10 items-center text-center laptop:items-start laptop:text-left font-poppins mt-1.5">
              <div className="flex items-center gap-2">
                <div className="flex laptop:hidden">
                  <Video size={44} />
                </div>

                <h2 className="text-2xl font-bold">Com você em qualquer lugar</h2>
              </div>


              <p>
                Confira nossa agenda presencial e também acompanhe as transmissões ao vivo de onde estiver usando a internet. Veja a programação a seguir:
              </p>

              <a href="/live" className="bg-black text-white w-[90%] laptop:w-80 px-4 py-2 rounded-md text-sm font-bold text-center">
                Ver transmissões ao vivo
              </a>
            </div>
          </div>
        </div>

        <div className="font-poppins flex justify-center w-full mt-10 laptop:mt-0 laptop:w-auto">
          <Paper />
        </div>

      </div>
    </section>
  )
}
