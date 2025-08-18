import Dots from '../../assets/dots.png'
import { LinkIndigo } from '../link/LinkIndigo'
import { LinkSnow } from '../link/LinkSnow'

export default function ChurchOnline() {
  return (
    <section className="flex h-auto w-full items-center bg-[#1f1f25] pt-24 pb-16 phone:flex-wrap phone:justify-start phone:gap-5 laptopMd:flex-nowrap laptopMd:justify-around">
      <div
        className="flex 
      phone:mb-12 phone:w-full phone:justify-center 
      laptopMd:mb-0 laptopMd:w-[25%] laptopMd:justify-end"
      >
        <img
          src={Dots}
          alt="dots"
          className="laptopMod:w-[150px] absolute mr-14 mt-[-70px] phone:h-[170px] phone:w-[100px] laptopMd:h-[220px]"
        />

        <span>
          <img
            className="relative phone:max-w-[150px] laptopMd:max-w-[280px]"
            loading="lazy"
            decoding="async"
            width="890"
            height="885"
            src="https://novaigreja.com/wp-content/uploads/2021/10/globo_outline_White-21.png"
            alt="web browser"
            sizes="(max-width: 910px) 100vw, 910px"
            aria-label="globo_outline_White-21"
          />
        </span>
      </div>

      <div className="text-center phone:w-full laptopMd:w-[50%]">
        <span className="font-medium text-ipimWhiteSnowTwo phone:text-[2.3rem] laptopMd:text-[3rem] font-poppins">
          A <span className="font-bold">IPIM</span> está <br />
          <span className="mt-0 font-bold text-ipimYellow phone:text-[3.5rem] laptopMd:text-[5rem] laptopLg:text-[7rem]">
            O N L I N E
          </span>
        </span>

        <p
          className="font-source font-light text-ipimWhiteSnowTwo 
        phone:mt-6 phone:px-6 
        phone:text-[1.2rem] laptopMd:mt-0 laptopMd:px-0
        laptopMd:text-[1rem]"
        >
          A IPIM Online é uma comunidade de pessoas ao redor do mundo, que{' '}
          <br />
          se conectam online para experimentar uma vida cristã abundante, um{' '}
          <br />
          relacionamento pleno com Deus e conectar-se com outras pessoas.
        </p>

        <div
          className="mt-10 flex items-center justify-center gap-5 phone:mx-4
        phone:flex-wrap tablet:flex-nowrap laptopMd:mx-0
        laptopMd:flex-nowrap"
        >
          <LinkIndigo
            url="https://youtube.com/ipimacaubal"
            newTab={true}
            classLink="text-[1rem] px-14 py-4 mt-5 mx-3 
            phone:w-full tablet:w-auto laptopMd:w-auto font-inter"
            text="Ir para a Igreja Online"
          />

          <LinkSnow
            url="https://maps.app.goo.gl/64dCtoF9D114BzPn8"
            newTab={true}
            classLink="text-[1rem] px-14 py-4 mt-5 mx-3 
            phone:flex phone:items-center phone:justify-center phone:w-full tablet:w-auto laptopMd:w-auto font-inter"
            text="Achar um local perto de mim"
          />
        </div>
      </div>

      <div
        className="flex 
      phone:mt-16 phone:w-full phone:justify-center 
      laptopMd:mt-0 laptopMd:w-[25%] laptopMd:justify-start"
      >
        <span>
          <img
            className="max-w-[280px]"
            loading="lazy"
            decoding="async"
            width="2553"
            height="1310"
            src="https://novaigreja.com/wp-content/uploads/2021/10/webwindow_Outline_White-17.png"
            alt="web browser"
            sizes="(max-width: 2553px) 100vw, 2553px"
            aria-label="webwindow_Outline_White-17"
          />
        </span>
      </div>
    </section>
  )
}
