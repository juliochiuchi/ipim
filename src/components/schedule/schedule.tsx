import { Video } from 'lucide-react'
import Paper from '../paper/paper'

export default function Schedule() {
  return (
    <section className="bg-[#f6f6f6] text-[#333] py-10 px-4 tablet:px-12 desktop:px-72 laptopMd:py-20 laptopMd:px-20">
      <div className="flex flex-wrap items-start justify-center tablet:justify-between gap-10">

        <div className="w-full max-w-[35rem] flex flex-col gap-10 text-left justify-start font-poppins">
          <div className="flex items-start gap-3">
            <div className="phone:hidden laptopMd:flex">
              <Video size={44} />
            </div>

            <div className="flex flex-col gap-10 items-center phone:text-center laptopMd:items-start laptopMd:text-left font-poppins mt-1.5">
              <div className="flex items-start">
                <div className="phone:flex laptopMd:hidden">
                  <Video size={44} />
                </div>

                <h2 className="text-2xl font-bold">Com você em qualquer lugar</h2>
              </div>


              <p>
                Confira nossa agenda presencial e também acompanhe as transmissões ao vivo de onde estiver usando a internet. Veja a programação a seguir:
              </p>

              <a href="/live" className="bg-black text-white w-[90%] laptopMd:w-80 px-4 py-2 rounded-md text-sm font-bold text-center">
                Ver transmissões ao vivo
              </a>
            </div>
          </div>
        </div>

        <div className="font-poppins flex justify-center w-full laptopMd:w-auto phone:mt-10 laptopMd:mt-0">
          <Paper />
        </div>

      </div>
    </section>
  )
}