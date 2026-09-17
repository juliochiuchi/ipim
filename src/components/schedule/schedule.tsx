import { Video } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import Paper from '../paper/paper'
import { PageContainer } from '@/components/page-container/page-container'

export default function Schedule() {
  return (
    <section className="bg-ipimBgSectionNextStep text-zinc-800 py-12 tablet:py-20 dark:bg-zinc-900 dark:text-zinc-100">
      <PageContainer>
        <div className="flex flex-wrap items-start justify-center laptop:justify-between gap-10 laptop:gap-16">

          <div className="w-full max-w-xl flex flex-col gap-8 items-center text-center justify-start font-poppins laptop:items-start laptop:text-left">
            <div className="flex items-start gap-3 w-full justify-center laptop:justify-start">
              <div className="hidden laptop:flex items-center justify-center w-14 h-14 rounded-2xl bg-ipimGreen/10 text-ipimGreen shrink-0">
                <Video size={36} strokeWidth={1.75} />
              </div>

              <div className="flex flex-col gap-6 items-center text-center laptop:items-start laptop:text-left font-poppins">
                <div className="flex items-center gap-3">
                  <div className="flex laptop:hidden items-center justify-center w-12 h-12 rounded-2xl bg-ipimGreen/10 text-ipimGreen shrink-0">
                    <Video size={32} strokeWidth={1.75} />
                  </div>

                  <h2 className="text-2xl tablet:text-3xl font-bold text-ipimNavy dark:text-white leading-tight">Com você em qualquer lugar</h2>
                </div>

                <p className="font-source text-base tablet:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Confira nossa agenda presencial e também acompanhe as transmissões ao vivo de onde estiver usando a internet. Veja a programação a seguir:
                </p>

                <Link
                  to="/live"
                  className="inline-flex items-center justify-center bg-ipimNavy text-white px-8 py-3.5 rounded-xl font-poppins font-semibold text-sm shadow-lg shadow-ipimNavy/15 hover:bg-ipimNavyLight hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 active:translate-y-0"
                >
                  Ver transmissões ao vivo
                </Link>
              </div>
            </div>
          </div>

          <div className="flex-1 font-poppins flex justify-center w-full mt-6 laptop:mt-0 laptop:w-auto min-w-0">
            <div className="w-full max-w-lg">
              <Paper />
            </div>
          </div>

        </div>
      </PageContainer>
    </section>
  )
}
