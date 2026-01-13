import {
  FiPhone,
  FiMail,
  FiNavigation,
  FiFacebook,
  FiInstagram,
  FiYoutube,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

import IPIBIcon from '../../assets/IPIB-icon.png'

export function Footer() {
  return (
    <footer className="bg-ipimBgLightFooter shadow-[0px_0px_10px_0px_rgba(0,0,0,0.5)] dark:bg-ipimBgDark dark:text-white">
      <div className="flex flex-col">

        <div className="justify-center px-6 pt-12 phone:flex-col phone:px-6 laptop:flex-row laptop:px-20 desktop:px-[30rem]">
          <div className="flex phone:items-center phone:justify-center laptop:items-start laptop:justify-start -ml-2">
            <img
              src={IPIBIcon}
              alt="IPIB ICON"
              className="h-[46px] w-[46px]"
            />
          </div>

          <div
            className="from-0 to-100 flex w-full gap-8 pb-10 phone:w-full
              phone:flex-col phone:items-center phone:justify-center laptop:flex-row laptop:justify-between"
          >
            <div className="max-w-[300px] text-[1rem] phone:text-center laptop:text-left">
              <p className="font-bold text-ipimTitleFooter dark:text-ipimBgLightFooter">
                Igreja Presbiteriana
              </p>
              <p className="font-bold text-ipimTitleFooter dark:text-ipimBgLightFooter">
                Independente de Macaubal
              </p>
              <p className="font-source text-ipimTextFooter dark:text-ipimBgLightFooter">
                é uma igreja local com o objetivo de levar a todos as pessoas o
                amor e a salvação que existem em Jesus Cristo.
              </p>
              <br />
              <h2 className="text-[1.2rem] text-ipimTitleFooter dark:text-ipimBgLightFooter">
                I P I M
              </h2>
              <p className="font-source text-[.9rem] font-extralight">
                Todos na mesma casa
              </p>
            </div>

            <div className="phone:flex phone:flex-col phone:items-center phone:text-center laptop:items-start laptop:text-left">
              <div className="phone:text-center laptop:text-left">
                <p className="text-[22px] font-bold text-ipimTitleFooter dark:text-ipimBgLightFooter">
                  Links Úteis
                </p>

                <div className="flex flex-col gap-2 text-[1rem] text-ipimTextFooter dark:text-ipimBgLightFooter phone:items-center phone:justify-center laptop:items-start laptop:justify-start">
                  <a
                    href="https://ipib.org/educacaocontinuada/"
                    className="font-source mt-1"
                  >
                    Congresso
                  </a>
                  <a href="https://www.ipiconecta.app.br/" className="font-source">IPI Conecta</a>
                  <a href="https://drive.google.com/file/d/1XOFkIBKvjzwzcsUKm5sCMA1WR0NrVfeR/view" className="font-source">
                    O Estardarte
                  </a>
                  <a href="https://www.ctmonline.com.br/" className="font-source">CTM Online</a>
                  <a href="https://www.fatipi.edu.br/" className="font-source">FATIPI</a>
                </div>
              </div>
            </div>

            <div className="phone:flex phone:flex-col phone:items-center phone:text-center laptop:items-start laptop:text-left">
              <div className="phone:text-center laptop:text-left">
                <p className="text-[22px] font-bold text-ipimTitleFooter dark:text-ipimBgLightFooter">
                  Nos Encontre
                </p>

                <div className="flex flex-col gap-4 text-ipimTextFooter dark:text-ipimBgLightFooter phone:items-center phone:justify-center laptop:items-start laptop:justify-start">
                  <div className="mt-1 flex phone:flex-col phone:items-center phone:gap-1 phone:text-center laptop:flex-row laptop:gap-2 laptop:text-left">
                    <div className="phone:flex phone:justify-center">
                      <FiNavigation className="mt-[5px] text-[#008785] hover:text-ipimTextFooter" />
                    </div>
                    <a
                      className="max-w-[250px] text-[1rem] text-ipimTitleFooter dark:text-ipimBgLightFooter"
                      href="https://maps.app.goo.gl/64dCtoF9D114BzPn8"
                      target="_blank"
                    >
                      R Jeronimo Narciso Ramos, 889, Centro, Macaubal/SP,
                      15500-330 - Brasil
                    </a>
                  </div>

                  <div className="mt-1 flex items-center gap-2 phone:flex-col phone:gap-1 laptop:flex-row">
                    <div className="phone:flex phone:justify-center">
                      <FiMail className="mt-1 text-[#008785] hover:text-ipimTextFooter" />
                    </div>
                    <a
                      className="text-ipimTitleFooter dark:text-ipimBgLightFooter"
                      href="mailto:macaubalipi@gmail.com"
                    >
                      macaubalipi@gmail.com
                    </a>
                  </div>

                  <div className="mt-1 flex items-center gap-2 phone:flex-col phone:gap-1 laptop:flex-row">
                    <div className="phone:flex phone:justify-center">
                      <FiPhone className="text-[#008785] hover:text-ipimTextFooter" />
                    </div>
                    <a
                      className="text-ipimTitleFooter dark:text-ipimBgLightFooter"
                      href="https://wa.me/5517997147817"
                      target="_blank"
                    >
                      +55 (17) 9 9714 7817
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="phone:flex phone:flex-col phone:items-center phone:text-center laptop:items-start laptop:text-left">
              <div className="phone:text-center laptop:text-left">
                <p className="text-[22px] font-bold text-ipimTitleFooter dark:text-ipimBgLightFooter">
                  Conecte-se
                </p>

                <div className="flex flex-col gap-2 text-[1rem] text-ipimTextFooter dark:text-ipimBgLightFooter phone:items-center laptop:items-start">
                  <a href="#" className="font-source mt-1">
                    Quem Somos
                  </a>
                  <a href="#" className="font-source">Voluntarie-se</a>
                  <a href="/live" className="font-source">Culto Online</a>
                </div>

                <p className="mt-6 text-[22px] font-bold text-ipimTitleFooter dark:text-ipimBgLightFooter">
                  Redes Sociais
                </p>

                <div className="flex flex-row gap-3 text-[1rem] text-ipimTextFooter phone:items-center phone:justify-center laptop:items-start laptop:justify-start">
                  <a href="#" className="mt-1">
                    <FiFacebook className="h-[22px] w-[22px] text-[#008785] hover:text-ipimTextFooter" />
                  </a>

                  <a href="#" className="mt-1">
                    <FiYoutube className="h-[22px] w-[22px] text-[#008785] hover:text-ipimTextFooter" />
                  </a>

                  <a href="#" className="mt-1">
                    <FiInstagram className="h-[22px] w-[22px] text-[#008785] hover:text-ipimTextFooter" />
                  </a>

                  <a href="#" className="mt-1">
                    <FaXTwitter className="h-[22px] w-[22px] text-[#008785] hover:text-ipimTextFooter" />
                  </a>

                  <a href="#" className="mt-1">
                    <FaWhatsapp className="h-[22px] w-[22px] text-[#008785] hover:text-ipimTextFooter" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-ipimIndigoLight py-2 text-white phone:flex-col phone:justify-center phone:px-6 laptop:flex-row laptop:justify-between laptop:px-20 desktop:px-[30rem]">
          <div className="flex flex-col py-3 text-[13px] phone:items-center phone:justify-center phone:text-center laptop:items-start laptop:justify-start laptop:text-left">
            <p className="font-source">Igreja Presbiteriana Independente de Macaubal • IPIM</p>
            <p className="font-source italic">
              Todos os direitos reservados. Copyright ©{' '}
              {new Date().getFullYear()}.
            </p>
          </div>

          <div className="phone:mt-1 laptop:mt-0">
            <a
              href="https://myspace-julio-chiuchi.vercel.app"
              className="text-[13px] font-bold"
              target="_blank"
            >
              Desenvolvido por Otherside
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
