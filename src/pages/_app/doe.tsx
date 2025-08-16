import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/doe')({
  component: Doe,
})

function Doe() {
  return (
    <>
      <div className="bg-ipimGray pb-20 text-[#161720]">
        <div className="tablet:flex-row tablet:px-0 tablet:pt-[80px] phone:flex-col phone:px-6 phone:pt-[30px] flex items-center justify-center gap-20">
          <div className="tablet:max-w-400px phone:max-w-auto tablet:w-[400px] phone:w-[250px]">
            <h2 className="tablet:text-[3rem] phone:text-[2rem] font-bold">
              Mais de 70% das pessoas utilizam o PIX
            </h2>
            <p className="text-4xl">como forma de dar seu dízimo e ofertas</p>
          </div>

          <div className="phone:max-w-auto tablet:w-[400px] tablet:max-w-[700px] phone:w-[250px]">
            <p>Chave PIX</p>
            <p className="tablet:text-4xl phone:text-[1.5rem]">
              51.848.240/0001-81
            </p>
          </div>
        </div>

        <div className="my-20 flex justify-center">
          <div
            className="from-0 to-100 flex w-[50%]
              items-center justify-between border-t-2 border-[#6873a6]
              from-[#6873a6] to-[#25306f]"
          />
        </div>

        <div className="tablet:flex-row tablet:gap-40 tablet:px-0 phone:flex-col phone:gap-10 phone:px-10 flex justify-center">
          <div>
            <h2 className="tablet:text-4xl phone:text-[1.5rem] font-semibold">
              TRANSFERÊNCIA
            </h2>
            <div className="ml-2">
              <p>
                <b>Banco:</b> Santander (033)
              </p>
              <p>
                <b>Ag:</b> 0395
              </p>
              <p>
                <b>C/C:</b> 13.00164-4
              </p>
              <p>
                <b>CPNJ:</b> 51.848.240/0001-81
              </p>

              <span>Igreja Presbiteriana Independente de Macaubal</span>
            </div>
          </div>

          <div className="w-[250px] max-w-[250px]">
            <h2 className="tablet:text-4xl phone:text-[1.5rem] font-semibold">
              CHEQUE
            </h2>
            <p>Nominal à Igreja Presbiteriana Independente de Macaubal</p>
          </div>

          <div className="w-[250px] max-w-[250px]">
            <h2 className="tablet:text-4xl phone:text-[1.5rem] font-semibold">
              CASH
            </h2>
            <p>
              Se preferir, doe em dinheiro presencialmente durante um de nossos
              encontros.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
