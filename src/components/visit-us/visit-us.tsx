import { Navigation, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function VisitUs() {
  return (
    <section className="mx-auto w-full px-4 py-20 laptopMd:w-[90%] laptopLg:w-[80%]">
      {/* Container com Borda Gradiente */}
      <div className="group relative rounded-3xl bg-gradient-to-r from-ipimIndigoLight to-ipimIndigoDark p-[2px] shadow-2xl transition-all hover:shadow-ipimIndigoLight/20">
        <div className="relative h-full w-full overflow-hidden rounded-[calc(1.5rem-2px)] bg-white p-8 dark:bg-ipimBgDark laptopMd:p-16">

          {/* Subtle decorative gradient glow behind content */}
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-ipimIndigoLight/5 blur-3xl transition-all group-hover:bg-ipimIndigoLight/10" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-ipimGreen/5 blur-3xl transition-all group-hover:bg-ipimGreen/10" />

          <div className="relative z-10 grid gap-12 laptopMd:grid-cols-2 laptopMd:items-center">

            {/* Coluna da Esquerda: Texto e Chamada */}
            <div className="flex flex-col gap-6 text-center laptopMd:text-left">

              {/* Badge "Viva o seu chamado" estilizado */}
              <div className="mx-auto inline-flex w-fit items-center rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 laptopMd:mx-0">
                <span className="mr-2 h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
                Viva o seu chamado
              </div>

              <div className="space-y-4">
                <h2 className="font-poppins text-3xl font-bold leading-tight text-ipimBgDark dark:text-white laptopMd:text-5xl">
                  Sua jornada começa aqui
                </h2>
                <p className="font-source text-lg text-gray-600 dark:text-gray-300 laptopMd:text-xl max-w-xl">
                  Estamos te esperando! Se você ou alguém que você conhece estiver interessado em nos conhecer, adoraríamos te receber nesta casa!
                </p>
              </div>

              {/* Botão visível apenas em telas maiores aqui (opcional, ou manter apenas no card) */}
              <div className="hidden laptopMd:block pt-2">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 italic">
                  "A alegria do Senhor é a nossa força."
                </p>
              </div>
            </div>

            {/* Coluna da Direita: Card de Informações */}
            <div className="relative rounded-2xl bg-gray-50/80 p-6 backdrop-blur-sm dark:bg-zinc-900/50 border border-gray-100 dark:border-zinc-800 transition-all hover:border-indigo-100 dark:hover:border-indigo-900/50">
              <div className="space-y-8">
                {/* Endereço */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-ipimBgDark dark:text-white">Onde estamos</h3>
                    <p className="font-source text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                      Rua Jeronimo Narciso Ramos, 889<br />
                      Macaubal - SP
                    </p>
                  </div>
                </div>

                {/* Horários */}
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-lg text-ipimBgDark dark:text-white">Nossos Horários</h3>
                    <ul className="font-source text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                      <li><strong className="font-medium text-ipimIndigoDark dark:text-ipimIndigoLight">Domingo:</strong> 9h (EBD) e 19h30</li>
                      <li><strong className="font-medium text-ipimIndigoDark dark:text-ipimIndigoLight">Quarta:</strong> 19h30</li>
                    </ul>
                  </div>
                </div>

                {/* Botão de Ação Principal */}
                <div className="pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="w-full group/btn h-auto rounded-xl bg-gradient-to-r from-ipimIndigoLight to-ipimIndigoDark px-8 py-4 text-lg font-bold text-white shadow-lg shadow-ipimIndigoLight/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-ipimIndigoLight/40"
                  >
                    <a
                      href="https://maps.app.goo.gl/64dCtoF9D114BzPn8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3"
                    >
                      <Navigation className="h-5 w-5 transition-transform duration-300 group-hover/btn:-translate-y-1" />
                      Traçar rota
                    </a>
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
