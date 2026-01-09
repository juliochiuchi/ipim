import { Video } from 'lucide-react'
import Paper from '../paper/paper'

export default function Schedule() {
  return (
    <section className="bg-[#f6f6f6] text-[#333] w-full py-10 px-4 laptopMd:py-20 laptopMd:pl-24">
      <div className="flex flex-wrap items-start justify-center gap-10 w-full">

        <div className="w-[35rem] flex flex-col gap-10 text-left justify-start font-poppins">
          <div className="flex items-start gap-3">
            <div>
              <Video size={44} />
            </div>

            <div className="flex flex-col gap-10 text-left justify-start font-poppins mt-1.5">
              <h2 className="text-2xl font-bold">Com você em qualquer lugar</h2>

              <p>
                Confira nossa agenda presencial e também acompanhe as transmissões ao vivo de onde estiver usando a internet. Veja a programação a seguir:
              </p>

              <a href="/live" className="bg-black text-white px-4 py-2 rounded-md w-80 text-sm font-bold text-center">
                Ver transmissões ao vivo
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1 font-poppins flex justify-center">
          <Paper />
        </div>

      </div>
    </section>
  )
}