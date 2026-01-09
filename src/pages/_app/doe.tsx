import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import QRCodePixIPIM from '@/assets/qrcode-pix.png'

export const Route = createFileRoute('/_app/doe')({
  component: Doe,
})

function Doe() {
  const [copied, setCopied] = useState(false)
  const pixKey = '51.848.240/0001-81'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pixKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-ipimBgDark via-zinc-900 to-zinc-800 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-700">
        {/* Header Section */}
        <div className="w-full bg-gradient-to-r from-zinc-900/90 to-zinc-800/90 backdrop-blur-sm border-b border-zinc-700/50">
          <div className="mx-auto max-w-6xl px-6 py-12 phone:px-4 phone:py-8">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white font-poppins mb-4 phone:text-3xl phone:text-4xl laptop:text-6xl">
                Contribua com a IPIM
              </h1>
              <p className="text-xl text-zinc-300 font-source phone:text-lg phone:text-xl laptop:text-2xl max-w-3xl mx-auto">
                Sua contribuição nos ajuda a continuar nossa missão de levar a palavra de Deus e servir nossa comunidade
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl p-6 phone:p-4 laptop:p-8 desktop:p-12">
          <div className="grid gap-8 phone:gap-6 phone:gap-8 laptop:grid-cols-2 laptop:gap-12">

            {/* PIX Section */}
            <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-700/30 shadow-2xl overflow-hidden">
              <div className="p-8 phone:p-6 laptop:p-10">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-3 bg-ipimIndigoLight/10 px-6 py-3 rounded-full mb-6">
                    <div className="w-8 h-8 bg-ipimIndigoLight rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </div>
                    <span className="text-ipimIndigoLight font-semibold font-inter">PIX - Mais Rápido e Seguro</span>
                  </div>

                  <h2 className="text-3xl font-bold text-white font-poppins mb-4 phone:text-2xl">
                    Transferência PIX
                  </h2>
                  <p className="text-zinc-300 font-source phone:text-sm">
                    Escaneie o QR Code ou copie a chave PIX para fazer sua contribuição
                  </p>
                </div>

                {/* QR Code Placeholder */}
                <div className="flex justify-center mb-8">
                  <div className="bg-white p-6 rounded-2xl shadow-inner">
                    <div className="w-48 h-48 phone:w-40 phone:h-40 bg-gradient-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center border-2 border-dashed border-zinc-400">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 bg-zinc-300 rounded-lg flex items-center justify-center">
                          <img src={QRCodePixIPIM} alt="qrcode pix ipim" />
                        </div>
                        <span className="text-sm text-zinc-600 font-source">QR Code PIX</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-zinc-400 font-source text-sm mb-2">
                    1. Abra o app do seu banco
                  </p>
                  <p className="text-zinc-400 font-source text-sm mb-2">
                    2. Escolha a opção PIX
                  </p>
                  <p className="text-zinc-400 font-source text-sm">
                    3. Escaneie o QR Code acima
                  </p>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mb-6" />

                {/* Copy PIX Key Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white font-poppins text-center">
                    Ou copie a chave PIX:
                  </h3>

                  <div className="bg-zinc-900/50 border border-zinc-700/50 rounded-xl p-4 flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-zinc-400 font-source mb-1">Chave PIX (CNPJ)</p>
                      <p className="text-white font-mono text-lg phone:text-base font-medium">
                        {pixKey}
                      </p>
                    </div>
                    <button
                      onClick={copyToClipboard}
                      className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-all duration-200 flex items-center gap-2 ${copied
                        ? 'bg-green-600 text-white'
                        : 'bg-ipimIndigoLight hover:bg-ipimIndigoDark text-white'
                        }`}
                    >
                      {copied ? (
                        <>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                          Copiado!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                          </svg>
                          Copiar
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-blue-300 font-source text-sm font-medium mb-1">
                          Como usar a chave PIX:
                        </p>
                        <p className="text-blue-200 font-source text-xs leading-relaxed">
                          1. Copie a chave acima • 2. Abra seu app bancário • 3. Vá em PIX → Transferir • 4. Cole a chave copiada • 5. Confirme os dados da IPIM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Payment Methods */}
            <div className="space-y-6">
              {/* Bank Transfer */}
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-700/30 shadow-2xl overflow-hidden">
                <div className="p-6 phone:p-5 laptop:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-ipimGreen rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-poppins phone:text-xl">
                      Transferência Bancária
                    </h3>
                  </div>

                  <div className="space-y-3 text-zinc-300 font-source">
                    <div className="flex justify-between phone:flex-col phone:gap-1">
                      <span className="font-medium text-zinc-400">Banco:</span>
                      <span>Santander (033)</span>
                    </div>
                    <div className="flex justify-between phone:flex-col phone:gap-1">
                      <span className="font-medium text-zinc-400">Agência:</span>
                      <span>0395</span>
                    </div>
                    <div className="flex justify-between phone:flex-col phone:gap-1">
                      <span className="font-medium text-zinc-400">Conta Corrente:</span>
                      <span>13.00164-4</span>
                    </div>
                    <div className="flex justify-between phone:flex-col phone:gap-1">
                      <span className="font-medium text-zinc-400">CNPJ:</span>
                      <span>51.848.240/0001-81</span>
                    </div>
                    <div className="pt-2 border-t border-zinc-700/50">
                      <span className="text-white font-medium">Igreja Presbiteriana Independente de Macaubal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Check Payment */}
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-700/30 shadow-2xl overflow-hidden">
                <div className="p-6 phone:p-5 laptop:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-ipimYellow rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-zinc-800" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4 18H6v-2h4v2zm0-4H6v-2h4v2zm0-4H6V8h4v2zm6.5-5.5L15 8l-1.5-1.5L12 8l1.5 1.5L15 8l1.5-1.5z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-poppins phone:text-xl">
                      Cheque
                    </h3>
                  </div>

                  <p className="text-zinc-300 font-source">
                    Nominal à <span className="text-white font-medium">Igreja Presbiteriana Independente de Macaubal</span>
                  </p>
                </div>
              </div>

              {/* Cash Payment */}
              <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm rounded-3xl border border-zinc-700/30 shadow-2xl overflow-hidden">
                <div className="p-6 phone:p-5 laptop:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-poppins phone:text-xl">
                      Dinheiro
                    </h3>
                  </div>

                  <p className="text-zinc-300 font-source">
                    Contribua presencialmente durante nossos cultos e encontros na igreja.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center phone:mt-8">
            <div className="bg-gradient-to-r from-zinc-800/30 to-zinc-700/30 backdrop-blur-sm rounded-2xl border border-zinc-700/30 p-6 phone:p-4">
              <p className="text-zinc-300 font-source mb-2 phone:text-sm">
                Sua contribuição é fundamental para continuarmos nossa missão de servir a Deus e nossa comunidade.
              </p>
              <p className="text-zinc-400 font-source text-sm">
                Todas as doações são utilizadas para manutenção da igreja, projetos sociais e evangelização.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
