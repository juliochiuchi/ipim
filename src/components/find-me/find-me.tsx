import { SewingPinFilledIcon } from '@radix-ui/react-icons'

export function FindMe() {
  return (
    <section className="mx-auto my-0 flex w-full items-center justify-center bg-white px-0 py-20 dark:bg-ipimBgDark phone:px-4 phone:py-16">
      <div className="flex flex-col items-center justify-center gap-10 rounded-2xl text-center phone:w-full laptopMd:w-[90%] laptopLg:w-[50%]">
        <div className="flex gap-10 phone:flex-col phone:flex-wrap laptopMd:mt-0 laptopMd:w-[50%] laptopMd:flex-row laptopMd:flex-nowrap laptopMd:items-center laptopMd:justify-between">
          <div className="phone:w-auto laptopMd:w-[50%]">
            <h2 className="text-[2em] font-bold text-ipimBgDark dark:text-white font-poppins">
              Viva seu <br />
              <span className="italic underline decoration-indigo-500 underline-offset-4">
                chamado, <br />
              </span>
              não só sua carreira.
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
            className="flex items-center justify-center gap-2 rounded-xl bg-ipimSnowButton px-7 py-3 text-ipimIndigoLight hover:bg-ipimSnowButtonHover hover:text-ipimIndigoDark phone:text-[1rem] font-inter transition-colors duration-200"
          >
            <SewingPinFilledIcon className="h-[26px] w-[26px]" />
            <span className="text-[1.2rem]">Onde nos encontrar?</span>
          </a>
        </div>
      </div>
    </section>
  )
}
