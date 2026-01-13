import { Video } from 'lucide-react'
import Paper from '../paper/paper'

export default function Schedule() {
  return (
    <section className="bg-[#f6f6f6] text-[#333] py-10 px-4 phone:px-12 tablet:py-20 tablet:px-20 desktop:px-72">
      <div className="flex flex-wrap items-start justify-center tablet:justify-between gap-10">

        <div className="w-full max-w-[35rem] flex flex-col gap-10 items-center text-center justify-start font-poppins tablet:items-start tablet:text-left">
          <div className="flex items-start gap-3 w-full justify-center tablet:justify-start">
            <div className="hidden tablet:flex">
              <Video size={44} />
            </div>

            <div className="flex flex-col gap-10 items-center text-center tablet:items-start tablet:text-left font-poppins mt-1.5">
              <div className="flex items-center gap-2">
                <div className="flex tablet:hidden">
                  <Video size={44} />
                </div>

                <h2 className="text-2xl font-bold">Com você em qualquer lugar</h2>
              </div>


              <p>
                Confira nossa agenda presencial e também acompanhe as transmissões ao vivo de onde estiver usando a internet. Veja a programação a seguir:
              </p>

              <a href="/live" className="bg-black text-white w-[90%] tablet:w-80 px-4 py-2 rounded-md text-sm font-bold text-center">
                Ver transmissões ao vivo
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 font-poppins flex justify-center w-full mt-10 tablet:mt-0 tablet:w-auto">
          <Paper />
        </div>

      </div>
    </section>
  )
}
