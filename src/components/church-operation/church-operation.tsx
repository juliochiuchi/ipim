import { Link } from '@tanstack/react-router'
import { PageContainer } from '@/components/page-container/page-container'

export default function ChurchOperation() {
  return (
    <section className="bg-ipimBgSectionNextStep pt-14 pb-0 dark:bg-zinc-900">
      <PageContainer className="pb-10">
        <div className="mb-10 text-center laptop:text-left">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-zinc-200/70 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700 shadow-sm backdrop-blur dark:mx-0 dark:border-zinc-800/60 dark:bg-zinc-950/30 dark:text-zinc-200">
            <span className="h-1.5 w-1.5 rounded-full bg-ipimGreen" />
            Como funciona
          </div>
          <h2 className="mt-5 font-poppins text-3xl font-bold leading-tight tracking-tight text-zinc-900 dark:text-white tablet:text-4xl">
            Na prática, como vivemos a fé
          </h2>
          <p className="mx-auto mt-3 max-w-2xl font-source text-base leading-relaxed text-zinc-600 dark:text-zinc-300 tablet:text-lg laptop:mx-0">
            Três pilares simples que sustentam nossa caminhada como igreja: adoração, aprendizado e serviço.
          </p>
        </div>

        <div className="grid gap-5 tablet:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30">
            <h3 className="font-poppins text-xl font-bold tracking-tight text-ipimGreen">Cultos</h3>
            <p className="mt-3 font-source text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Momentos de comunhão, adoração e ensino da Palavra. Um tempo separado para buscar a Deus e fortalecer a fé juntos.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30">
            <h3 className="font-poppins text-xl font-bold tracking-tight text-ipimGreen">EBD</h3>
            <p className="mt-3 font-source text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Um espaço de aprendizado e crescimento espiritual. Estudo bíblico para viver o evangelho com profundidade no dia a dia.
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30">
            <h3 className="font-poppins text-xl font-bold tracking-tight text-ipimGreen">Serviço</h3>
            <p className="mt-3 font-source text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
              Servir é responder ao amor de Deus com dedicação. Abençoamos pessoas, participamos da obra do Senhor e encontramos propósito.
            </p>
          </div>
        </div>

        <div className="mt-12 grid items-start gap-8 laptop:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/60 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-950/20">
            <img
              src="https://static.wixstatic.com/media/609d6f_307957701c8e450f87cefc4e69d6dae1~mv2.png/v1/fill/w_1534,h_1224,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/609d6f_307957701c8e450f87cefc4e69d6dae1~mv2.png"
              width={900}
              height={700}
              alt="Igreja"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
          </div>

          <div className="rounded-3xl border border-zinc-200/60 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/30 tablet:p-8">
            <h3 className="font-poppins text-2xl font-bold tracking-tight text-zinc-900 dark:text-white tablet:text-3xl">
              Estamos te esperando
            </h3>
            <p className="mt-3 font-source text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
              Venha nos visitar e participar dos nossos encontros. A IPIM Macaubal fica na Rua Jeronimo Narciso Ramos, 889.
            </p>

            <div className="mt-6 grid gap-3 rounded-2xl border border-zinc-200/60 bg-white/60 p-4 dark:border-zinc-800/60 dark:bg-zinc-950/20">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  Quarta
                </span>
                <span className="font-poppins text-sm font-semibold text-zinc-900 dark:text-zinc-100">19h30</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                  Domingo
                </span>
                <span className="font-poppins text-sm font-semibold text-zinc-900 dark:text-zinc-100">9h (EBD) • 19h30</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://maps.app.goo.gl/64dCtoF9D114BzPn8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200/70 bg-white/70 px-5 py-3 font-poppins text-sm font-semibold text-zinc-900 shadow-sm transition-all hover:translate-y-[-1px] hover:bg-white dark:border-zinc-800/60 dark:bg-zinc-950/20 dark:text-zinc-100 dark:hover:bg-zinc-950/30"
              >
                Como chegar
              </a>

              <Link
                to="/doe"
                className="inline-flex items-center justify-center rounded-xl bg-ipimGreen px-5 py-3 font-poppins text-sm font-semibold text-white shadow-sm shadow-ipimGreen/20 transition-all hover:translate-y-[-1px] hover:bg-ipimGreenHover"
              >
                Ofertar agora
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>

      <div className="bg-ipimGreen py-12">
        <PageContainer className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-3 items-center text-center laptop:items-start laptop:text-left">
            <p className="font-poppins text-3xl tablet:text-4xl font-bold underline text-white underline-offset-4 decoration-ipimGoldLight decoration-2">Doações</p>
            <p className="font-poppins text-sm text-white/90 max-w-md">Generosidade é um privilégio diante de um Deus generoso.</p>
          </div>

          <Link
            to="/doe"
            className="inline-flex items-center bg-transparent border-2 border-white text-white px-7 py-3 rounded-full font-poppins font-bold tracking-widest text-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:text-ipimGreen hover:shadow-xl active:scale-[0.98]">
            OFERTAR AGORA
          </Link>
        </PageContainer>
      </div>

      <div className="bg-ipimBlack py-12">
        <PageContainer className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-3 max-w-xl items-center text-center laptop:items-start laptop:text-left">
            <p className="font-poppins text-xl tablet:text-2xl font-bold underline text-ipimGreenLight underline-offset-4 decoration-ipimGold/40">Quer conversar?</p>
            <p className="font-poppins text-sm text-white/85 leading-relaxed">
              Nós estamos muito interessados no que você tem a dizer, criamos este espaço especialmente para você fazer seus comentários ou sugestões.
            </p>
          </div>

          <a
            href="https://wa.me/5517997147817"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-ipimGreen text-white text-sm px-7 py-3 rounded-full font-poppins font-bold tracking-widest border-2 border-transparent transition-all duration-300 hover:scale-[1.02] hover:bg-white hover:text-ipimGreen hover:border-ipimGreen hover:shadow-xl active:scale-[0.98]">
            CLIQUE AQUI
          </a>
        </PageContainer>
      </div>
    </section>
  )
}
