import { PageContainer } from '@/components/page-container/page-container'
import Plan from '@/components/plan/plan'
import { PageHero } from '@/components/page-hero/page-hero'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/calendar')({
  component: Calendar,
})

function Calendar() {
  return (
    <>
      <div className="min-h-screen w-full bg-ipimBgSectionNextStep/30 dark:bg-[#1a1a20] pt-12 tablet:py-16 transition-colors duration-300">
        <PageContainer>
          <div className="mb-8 animate-in slide-in-from-top-4 duration-700 fade-in">
            <PageHero
              eyebrow="Agenda & Eventos"
              title="Programação"
              description="Fique por dentro de todas as atividades, cultos e eventos especiais da nossa comunidade."
            />
          </div>

          <div>
            <Plan />
          </div>

          {/* <div className="mt-8 flex justify-center text-center animate-in slide-in-from-bottom-4 duration-700 delay-300 fade-in">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-source transition-colors duration-300">
              Calendário atualizado • IPIM
            </p>
          </div> */}
        </PageContainer>
      </div>
    </>
  )
}
