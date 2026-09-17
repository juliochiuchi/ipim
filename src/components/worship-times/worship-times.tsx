import { PageContainer } from '@/components/page-container/page-container'

export default function WorshipTimes() {
  return (
    <section className="bg-ipimBgSectionNextStep pt-14 pb-20 dark:bg-zinc-900">
      <PageContainer className="text-center">
        <h1 className="pt-4 text-3xl tablet:text-4xl laptop:text-5xl font-bold text-ipimNavy dark:text-gray-100 font-poppins leading-tight">
          Horários dos &nbsp;
          <span className="italic underline decoration-ipimGreen decoration-2 underline-offset-[10px] text-ipimGreen dark:text-ipimGreenLight">
            cultos
          </span>
        </h1>

        <div className="domingos mt-16">
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 mb-10">
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-ipimGreen/40" />
            <div>
              <p className="text-sm font-bold text-ipimGreen uppercase tracking-[0.2em]">Domingos</p>
            </div>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-ipimGreen/40" />
          </div>

          <div className="flex justify-center gap-5 phone:flex-col phone:items-center laptop:flex-row laptop:items-stretch">
            <div className="flex min-h-[240px] w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl bg-white dark:bg-zinc-900/60 p-7 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-ipimGreen/10 flex items-center justify-center mb-1">
                <span className="font-poppins text-2xl font-bold text-ipimGreen dark:text-ipimGreenLight">9h</span>
              </div>
              <p className="font-poppins text-lg font-bold text-ipimNavy dark:text-white">Escola Bíblica Dominical</p>
              <p className="font-source font-normal text-sm text-zinc-600 dark:text-gray-400">Templo</p>
              <p className="text-[12px] font-light text-zinc-500 dark:text-gray-500 leading-snug max-w-[280px]">
                R Jeronimo Narciso Ramos, 889
              </p>
            </div>
            <div className="flex min-h-[240px] w-full max-w-md flex-col items-center justify-center gap-3 rounded-2xl bg-white dark:bg-zinc-900/60 p-7 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="w-14 h-14 rounded-2xl bg-ipimGreen/10 flex items-center justify-center mb-1">
                <span className="font-poppins text-2xl font-bold text-ipimGreen dark:text-ipimGreenLight">19h30</span>
              </div>
              <p className="font-poppins text-lg font-bold text-ipimNavy dark:text-white">Culto de Celebração</p>
              <p className="font-source font-normal text-sm text-zinc-600 dark:text-gray-400">Templo</p>
              <p className="text-[12px] font-light text-zinc-500 dark:text-gray-500 leading-snug max-w-[280px]">
                R Jeronimo Narciso Ramos, 889
              </p>
            </div>
          </div>
        </div>

        <div className="quartas-e-sabados mt-16">
          <div className="flex justify-center gap-5 phone:flex-col phone:items-center laptop:flex-row laptop:items-stretch">
            <div className="flex min-h-[260px] w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl bg-white dark:bg-zinc-900/60 p-7 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-row flex-wrap items-center justify-center gap-3 mb-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-ipimGreen/40" />
                <div>
                  <p className="text-sm font-bold text-ipimGreen uppercase tracking-[0.2em]">
                    Quartas
                  </p>
                </div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-ipimGreen/40" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-ipimGreen/10 flex items-center justify-center mb-1">
                <span className="font-poppins text-2xl font-bold text-ipimGreen dark:text-ipimGreenLight">19h30</span>
              </div>
              <p className="font-poppins text-lg font-bold text-ipimNavy dark:text-white">Culto de Oração</p>
              <p className="font-source font-normal text-sm text-zinc-600 dark:text-gray-400">Templo</p>
              <p className="text-[12px] font-light text-zinc-500 dark:text-gray-500 leading-snug max-w-[280px]">
                R Jeronimo Narciso Ramos, 889
              </p>
            </div>

            <div className="flex min-h-[260px] w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl bg-white dark:bg-zinc-900/60 p-7 shadow-sm border border-zinc-100 dark:border-zinc-800 transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="flex flex-row flex-wrap items-center justify-center gap-3 mb-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-ipimGreen/40" />
                <div>
                  <p className="text-sm font-bold text-ipimGreen uppercase tracking-[0.2em]">
                    Sábados
                  </p>
                </div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-ipimGreen/40" />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-ipimGreen/10 flex items-center justify-center mb-1">
                <span className="font-poppins text-2xl font-bold text-ipimGreen dark:text-ipimGreenLight">19h30</span>
              </div>
              <p className="font-poppins text-lg font-bold text-ipimNavy dark:text-white leading-tight text-center">
                Sociedade de Adultos
                <span className="block text-xs font-medium mt-1 text-zinc-500 dark:text-gray-400 normal-case tracking-normal">
                  1º sábado de cada mês
                </span>
              </p>
              <p className="font-source font-normal text-sm text-zinc-600 dark:text-gray-400">Templo</p>
              <p className="text-[12px] font-light text-zinc-500 dark:text-gray-500 leading-snug max-w-[280px]">
                R Jeronimo Narciso Ramos, 889
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
