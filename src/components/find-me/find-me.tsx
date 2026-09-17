import { MapPin } from 'lucide-react'
import { PageContainer } from '@/components/page-container/page-container'

export function FindMe() {
  return (
    <section className="bg-white py-14 tablet:py-20 dark:bg-ipimBgDark">
      <PageContainer>
        <div className="flex flex-col items-center justify-center gap-10 text-center">
          <div className="flex flex-col tablet:flex-row gap-8 w-full items-center justify-between max-w-5xl">
            <div className="w-full tablet:w-auto tablet:flex-1">
              <h2 className="text-2xl tablet:text-3xl laptop:text-4xl font-bold text-ipimNavy dark:text-white font-poppins leading-tight">
                Viva o seu{' '}
                <span className="italic underline decoration-ipimIndigoLight decoration-2 underline-offset-[6px] text-ipimGreen dark:text-ipimGreenLight">
                  chamado
                </span>
              </h2>
            </div>

            <div className="w-full tablet:w-auto tablet:flex-1">
              <span className="font-source italic text-base tablet:text-lg text-zinc-700 dark:text-white/90 leading-relaxed">
                Estamos te esperando! Se você ou alguém que você conhece estiver
                interessado em nos conhecer, adoraríamos te receber nesta casa!
              </span>
            </div>
          </div>

          <div>
            <a
              href="https://maps.app.goo.gl/64dCtoF9D114BzPn8"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-ipimGreen to-ipimGreenDark px-10 py-4.5 font-poppins font-semibold text-white shadow-xl shadow-ipimGreen/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-ipimGreen/35 active:scale-[0.98] tablet:text-lg"
            >
              <div className="absolute inset-0 bg-white/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <MapPin className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
              <span className="relative tracking-wide">Onde nos encontrar?</span>
            </a>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
