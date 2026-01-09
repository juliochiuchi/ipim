export default function ChurchOperation() {
  return (
    <section className="bg-ipimBgSectionNextStep pt-14 dark:bg-zinc-900">
      <div className="flex justify-center laptop:justify-between flex-wrap gap-3 px-6">
        <div className="w-full max-w-[400px] text-center">
          <p className="flex flex-col gap-2 items-center justify-center text-5xl font-bold font-poppins font-stretch-extra-expanded leading-tight">
            <span>MAS COMO TUDO ISSO</span>
            <span className="text-[#008785]">FUNCIONA</span>
            <span className="text-[55px]">NA PRÁTICA?</span>
          </p>
        </div>

        <div className="w-full max-w-[300px] flex flex-col gap-9 items-center text-center mt-10 laptop:mt-0 laptop:items-start laptop:text-left">
          <p className="text-[#008785] text-6xl font-bold font-poppins font-stretch-extra-expanded">
            CULTOS
          </p>

          <p className="text-sm font-poppins font-stretch-extra-expanded">
            Nossos cultos são momentos de comunhão, adoração e ensino da Palavra. Um tempo separado para buscar a Deus, fortalecer a fé e viver a presença dEle juntos como igreja.
          </p>
        </div>

        <div className="w-full max-w-[300px] flex flex-col gap-9 items-center text-center mt-10 laptop:mt-0 laptop:items-start laptop:text-left">
          <p className="text-[#008785] text-6xl font-bold font-poppins font-stretch-extra-expanded">
            EBDS
          </p>

          <p className="text-sm font-poppins font-stretch-extra-expanded">
            A Escola Dominical é um espaço de aprendizado e crescimento espiritual. Por meio do estudo bíblico, somos edificados, fortalecidos na fé e preparados para viver o evangelho no dia a dia.
          </p>
        </div>

        <div className="w-full max-w-[300px] flex flex-col gap-9 items-center text-center mt-10 laptop:mt-0 laptop:items-start laptop:text-left">
          <p className="text-[#008785] text-6xl font-bold font-poppins font-stretch-extra-expanded">
            SERVIÇO
          </p>

          <p className="text-sm font-poppins font-stretch-extra-expanded">
            Servir a Deus é responder ao Seu amor com dedicação e obediência. Quando servimos, participamos da obra do Senhor, abençoamos pessoas e descobrimos nosso propósito no corpo de Cristo.
          </p>
        </div>
      </div>

      <div className="mt-10 flex items-start justify-center laptop:justify-start flex-wrap gap-3 px-6">
        <div className="rounded-3xl border overflow-hidden">
          <img
            src="https://static.wixstatic.com/media/609d6f_307957701c8e450f87cefc4e69d6dae1~mv2.png/v1/fill/w_1534,h_1224,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/609d6f_307957701c8e450f87cefc4e69d6dae1~mv2.png"
            width={700}
            height={600}
            alt="Church"
          />
        </div>

        <div className="flex flex-col gap-10 flex-1 text-center">
          <p className="text-5xl laptop:text-7xl font-poppins font-stretch-extra-expanded font-extrabold">
            Estamos te esperando!
          </p>

          <div className="flex flex-col gap-3">
            <p className="text-3xl laptop:text-5xl font-poppins font-stretch-extra-expanded font-bold">IPI</p>
            <p className="text-2xl laptop:text-4xl font-poppins font-stretch-extra-expanded font-bold">MACAUBAL</p>
          </div>

          <p className="text-lg laptop:text-2xl font-poppins font-stretch-extra-expanded underline">
            Rua Jeronimo Narciso Ramos 889
          </p>

          <div className="flex flex-col gap-3">
            <p className="text-xl laptop:text-3xl font-poppins font-stretch-extra-expanded font-bold">
              QUARTA 19h30
            </p>

            <p className="text-xl laptop:text-3xl font-poppins font-stretch-extra-expanded font-bold">
              DOMINGO 9h
            </p>

            <p className="text-xl laptop:text-3xl font-poppins font-stretch-extra-expanded font-bold">
              DOMINGO 19h30
            </p>
          </div>

        </div>
      </div>

      <div className="bg-[#008785] color-white py-14 flex flex-wrap items-center justify-around mt-10 gap-6 px-6">
        <div className="flex flex-col gap-3 items-center text-center laptop:items-start laptop:text-left">
          <p className="font-poppins text-4xl font-bold underline text-white">Doações</p>
          <p className="font-poppins text-sm text-white">Generosidade é um privilégio diante de um Deus generoso.</p>
        </div>

        <div>
          <a
            href="/doe"
            className="inline-block bg-transparent border border-white text-white px-6 py-3 rounded-full font-bold tracking-widest transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#008785] hover:shadow-lg active:scale-95">
            OFERTAR AGORA
          </a>
        </div>
      </div>

      <div className="bg-[#000] color-white py-14 flex flex-wrap items-center justify-center gap-6 px-6">
        <div className="flex flex-col gap-3 max-w-[600px] items-center text-center laptop:items-start laptop:text-left">
          <p className="font-poppins text-xl font-bold underline text-[#008785]">Quer conversar?</p>
          <p className="font-poppins text-sm text-white">
            Nós estamos muito interessados no que você tem a dizer, criamos este espaço especialmente para você fazer seus comentários ou sugestões.
          </p>
        </div>

        <div>
          <a
            href="https://wa.me/5517997147817"
            target="_blank" className="inline-block bg-[#008785] text-white text-base px-6 py-3 rounded-full font-bold tracking-widest border border-transparent transition-all duration-300 hover:scale-105 hover:bg-white hover:text-[#008785] hover:border-[#008785] hover:shadow-lg active:scale-95">
            CLIQUE AQUI
          </a>
        </div>
      </div>
    </section>
  )
}