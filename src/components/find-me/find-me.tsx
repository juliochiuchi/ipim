import { MapPin } from 'lucide-react'

export function FindMe() {
  return (
    <section className="mx-auto my-0 flex w-full items-center justify-center bg-white px-0 py-20 dark:bg-ipimBgDark phone:px-4 phone:py-16">
      <div className="flex flex-col items-center justify-center gap-10 rounded-2xl text-center phone:w-full laptopMd:w-[90%] laptopLg:w-[50%]">
        <div className="flex gap-10 phone:flex-col phone:flex-wrap laptopMd:mt-0 laptopMd:w-[50%] laptopMd:flex-row laptopMd:flex-nowrap laptopMd:items-center laptopMd:justify-between">
          <div className="phone:w-auto laptopMd:w-[50%]">
            <h2 className="text-[2em] font-bold text-ipimBgDark dark:text-white font-poppins">
              Viva o seu <br />
              <span className="italic underline decoration-indigo-500 underline-offset-4">
                chamado
              </span>
            </h2>
          </div>

          <div className="phone:w-auto phone:px-6 laptopMd:w-[50%] laptopMd:px-0">
            <span className="font-source italic text-ipimBgDark dark:text-white phone:text-[.9rem] laptopMd:text-[1.1rem]">
              Estamos te esperando! Se você ou alguém que você conhece estiver
              interessado em nos conhecer, adoraríamos te receber nesta casa!
            </span>
          </div>
        </div>

        <div className="laptopMd:w-[400px]">
          <a
            href="https://maps.app.goo.gl/64dCtoF9D114BzPn8"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-ipimIndigoLight to-ipimIndigoDark px-10 py-4 font-inter text-white shadow-xl shadow-ipimIndigoLight/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-ipimIndigoLight/60 active:scale-95 phone:text-[1.1rem]"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <MapPin className="h-[24px] w-[24px] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
            <span className="relative text-[1.2rem] font-bold tracking-wide">Onde nos encontrar?</span>
          </a>
        </div>
      </div>
    </section>
  )
}
