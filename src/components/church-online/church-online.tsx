import { LinkIndigo } from '../link/LinkIndigo'
import { LinkSnow } from '../link/LinkSnow'
import { PageContainer } from '@/components/page-container/page-container'

export default function ChurchOnline() {
  return (
    <section className="flex h-auto w-full items-center bg-[#1f1f25] dark:bg-zinc-900 py-16 tablet:py-20 laptop:py-24">
      <PageContainer size="wide">
        <div className="grid laptop:grid-cols-[auto_1fr_auto] items-center gap-10 laptop:gap-12 text-center laptop:text-left">
          <div className="hidden laptop:flex items-center justify-center relative">
            <div className="opacity-40 -mr-6 -mt-24 relative">
              <img
                className="h-[180px] w-auto"
                src="https://novaigreja.com/wp-content/uploads/2021/10/globo_outline_White-21.png"
                alt="Globo Outline"
                loading="lazy"
              />
            </div>
          </div>

          <div className="text-center">
            <div className="laptop:hidden mb-6 flex items-center justify-center">
              <img
                className="h-[130px] w-auto opacity-60"
                src="https://novaigreja.com/wp-content/uploads/2021/10/globo_outline_White-21.png"
                alt="Globo Outline"
                loading="lazy"
              />
            </div>

            <h2 className="font-poppins font-medium text-ipimWhiteSnowTwo text-3xl tablet:text-4xl laptop:text-[2.75rem] leading-[1.1]">
              A <span className="font-bold text-white">IPIM</span> está <br className="hidden phone:block" />
              <span className="mt-1 font-bold text-ipimYellow block text-4xl tablet:text-5xl laptop:text-6xl tracking-[0.15em]">
                ONLINE
              </span>
            </h2>

            <p className="font-source font-light text-ipimWhiteSnowTwo/90 mt-6 text-base tablet:text-lg leading-relaxed max-w-2xl mx-auto laptop:mx-0">
              A IPIM Online é uma comunidade de pessoas ao redor do mundo que se conectam
              para experimentar uma vida cristã abundante, um relacionamento pleno com
              Deus e se conectar com outras pessoas.
            </p>

            <div className="mt-10 flex flex-col tablet:flex-row items-center justify-center laptop:justify-start gap-4 w-full">
              <LinkIndigo
                url="https://youtube.com/ipimacaubal"
                newTab={true}
                classLink="w-full tablet:w-auto inline-flex items-center justify-center text-base px-8 py-4 font-poppins font-semibold"
                text="Ir para a Igreja Online"
              />

              <LinkSnow
                url="https://maps.app.goo.gl/64dCtoF9D114BzPn8"
                newTab={true}
                classLink="w-full tablet:w-auto inline-flex items-center justify-center text-base px-8 py-4 font-poppins font-semibold"
                text="Achar um local perto de mim"
              />
            </div>
          </div>

          <div className="hidden laptop:flex items-center justify-center">
            <div className="opacity-40 -ml-6 relative">
              <img
                className="h-[200px] w-auto"
                src="https://novaigreja.com/wp-content/uploads/2021/10/webwindow_Outline_White-17.png"
                alt="Janela Web Outline"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  )
}
