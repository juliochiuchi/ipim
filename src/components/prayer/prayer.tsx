import Speak from '../../assets/conte.png'

export default function Prayer() {
  return (
    <section className="flex items-center justify-center gap-20 py-24 dark:bg-[#1f1f25] phone:flex-wrap phone:gap-12 phone:py-20 laptopMd:flex-nowrap laptopMd:gap-20">
      <div className="text-right phone:text-center laptopMd:text-right">
        <div>
          <h2 className="font-poppins text-[2.5rem] font-bold dark:text-ipimBgLightFooter phone:text-[2rem] tablet:text-[2.2rem]">
            Tem algum <br /> pedido de <br /> oração?
          </h2>
          <p className="font-source dark:text-ipimTextDark mt-2">Conta com a gente.</p>
        </div>

        <div className="mt-8">
          <a
            href="https://wa.me/5517997147817"
            target="_blank"
            className="font-inter rounded-xl border border-ipimIndigoLight bg-white px-8 py-3 text-[1.1rem] font-light text-ipimIndigoLight hover:bg-transparent dark:border-ipimIndigoDark dark:bg-ipimIndigoDark dark:text-white dark:hover:bg-ipimIndigoLight dark:hover:border-white transition-all duration-200 phone:px-6 phone:py-2 phone:text-[1rem]"
          >
            Fazer pedido de oração
          </a>
        </div>
      </div>

      <div className="phone:hidden phone:max-w-[270px] laptopMd:flex laptopMd:max-w-[330px]">
        <img src={Speak} alt="conte" width={1998} height={941} className="w-full h-auto" />
      </div>

      <div className="phone:text-center laptopMd:text-left">
        <div>
          <h2 className="font-poppins text-[2.5rem] font-bold dark:text-ipimBgLightFooter phone:text-[2rem] tablet:text-[2.2rem]">
            Deus fez algo <br /> maravilhoso?
          </h2>
          <p className="font-source dark:text-ipimTextDark mt-2">Conta pra gente!</p>
        </div>

        <div className="mt-8">
          <a
            href="https://wa.me/5517997147817"
            target="_blank"
            className="font-inter rounded-xl border border-ipimIndigoLight bg-white px-8 py-3 text-[1.1rem] font-light text-ipimIndigoLight hover:bg-transparent dark:border-ipimIndigoDark dark:bg-ipimIndigoDark dark:text-white dark:hover:bg-ipimIndigoLight dark:hover:border-white transition-all duration-200 phone:px-6 phone:py-2 phone:text-[1rem]"
          >
            Contar testemunho
          </a>
        </div>
      </div>
    </section>
  )
}
