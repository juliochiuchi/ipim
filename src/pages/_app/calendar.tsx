import Plan from '@/components/plan/plan'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/calendar')({
  component: Calendar,
})

function Calendar() {
  return (
    <>
      <div className="min-h-screen w-full bg-ipimBgSectionNextStep/30 dark:bg-[#1a1a20] pt-12 tablet:py-16 transition-colors duration-300">
        <div className="px-6 tablet:px-28">
          <div className="flex flex-col tablet:flex-row justify-between items-start tablet:items-end gap-6 mb-10 animate-in slide-in-from-top-4 duration-700 fade-in">
            <div>
              <h2 className="text-ipimGreen font-semibold tracking-wide uppercase text-sm mb-2">
                Agenda & Eventos
              </h2>
              <h1 className="text-4xl tablet:text-5xl font-bold text-ipimBlack dark:text-white tracking-tight">
                Programação
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-3 max-w-md text-lg">
                Fique por dentro de todas as atividades, cultos e eventos especiais da nossa comunidade.
              </p>
            </div>
          </div>

          <div>
            <Plan />
          </div>

          {/* <div className="mt-8 flex justify-center text-center animate-in slide-in-from-bottom-4 duration-700 delay-300 fade-in">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-source transition-colors duration-300">
              Calendário atualizado • IPIM
            </p>
          </div> */}
        </div>
      </div>
    </>
  )
}
