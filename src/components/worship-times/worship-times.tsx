export default function WorshipTimes() {
  return (
    <section className="bg-ipimBgSectionNextStep pt-14 pb-24 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 -mt-[70px] text-center">
        <h1 className="pt-[90px] text-[3rem] font-bold dark:text-gray-200">
          Horários dos &nbsp;
          <span className="italic underline decoration-indigo-500 underline-offset-4">
            cultos
          </span>
        </h1>

        <div className="domingos">
          <div className="mt-10 flex flex-row flex-wrap items-center justify-center gap-3">
            <div>
              <hr className="w-[70px]" />
            </div>
            <div>
              <p className="text-[1rem] font-bold text-ipimGreen">DOMINGOS</p>
            </div>
            <div>
              <hr className="w-[70px]" />
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-6 phone:flex-col phone:items-center laptop:flex-row laptop:items-stretch">
            <div className="flex h-[250px] w-full max-w-[450px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-4 shadow-lg dark:bg-[#1e1e23]">
              <p className="font-bold">9h</p>
              <p className="font-bold">Escola Bíblica Dominical</p>
              <p className="font-normal">Templo</p>
              <p className="text-[.8rem] font-light">
                R Jeronimo Narciso Ramos, 889
              </p>
            </div>
            <div className="flex h-[250px] w-full max-w-[450px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-4 shadow-lg dark:bg-[#1e1e23]">
              <p className="font-bold">19h30</p>
              <p className="font-bold">Culto Clássico</p>
              <p className="font-normal">Templo</p>
              <p className="text-[.8rem] font-light">
                R Jeronimo Narciso Ramos, 889
              </p>
            </div>
          </div>
        </div>

        <div className="quartas-e-sabados">
          <div className="mt-10 flex justify-center gap-6 phone:flex-col phone:items-center laptop:flex-row laptop:items-stretch">
            <div className="flex h-[250px] w-full max-w-[450px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-4 shadow-lg dark:bg-[#1e1e23]">
              <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                <div>
                  <hr className="w-[70px]" />
                </div>
                <div>
                  <p className="text-[1rem] font-bold text-ipimGreen">
                    QUARTAS
                  </p>
                </div>
                <div>
                  <hr className="w-[70px]" />
                </div>
              </div>
              <p className="font-bold">19h30</p>
              <p className="font-bold">Culto Tradicional</p>
              <p className="font-normal">Templo</p>
              <p className="text-[.8rem] font-light">
                R Jeronimo Narciso Ramos, 889
              </p>
            </div>

            <div className="flex h-[250px] w-full max-w-[450px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-4 shadow-lg dark:bg-[#1e1e23]">
              <div className="flex flex-row flex-wrap items-center justify-center gap-3">
                <div>
                  <hr className="w-[70px]" />
                </div>
                <div>
                  <p className="text-[1rem] font-bold text-ipimGreen">
                    SÁBADOS
                  </p>
                </div>
                <div>
                  <hr className="w-[70px]" />
                </div>
              </div>
              <p className="font-bold">19h30</p>
              <p className="font-bold flex flex-col gap-1">
                <span>Culto Sociedade de Adultos</span>
                <span className="text-[.7rem]">Primeiro sábado do mês</span>
              </p>
              <p className="font-normal">Templo</p>
              <p className="text-[.8rem] font-light">
                R Jeronimo Narciso Ramos, 889
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
