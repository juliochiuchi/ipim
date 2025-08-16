import { createFileRoute, Link } from '@tanstack/react-router'
import videoCapaAcamp from '../../assets/video-capa-acamp.mp4'

export const Route = createFileRoute('/_app/acampamento')({
  component: Acampamento,
})

function Acampamento() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Vídeo em loop ocupando toda a tela */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoCapaAcamp} type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
      
      {/* Overlay escuro para escurecer o vídeo */}
      <div className="absolute inset-0 bg-black bg-opacity-70" />
      
      {/* Conteúdo centralizado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 phone:px-3 tablet:px-6 laptopMd:px-8">
        {/* Título e subtítulo */}
        <h1 className="font-poppins text-6xl phone:text-3xl tablet:text-5xl laptopMd:text-6xl desktop:text-8xl font-bold mb-4 phone:mb-3 tablet:mb-4 text-shadow-lg leading-tight phone:leading-tight">
          Acampamento 25
        </h1>
        <h2 className="font-nunito text-2xl phone:text-lg tablet:text-xl laptopMd:text-2xl desktop:text-3xl font-light mb-12 phone:mb-8 tablet:mb-10 text-shadow-md max-w-4xl phone:max-w-xs tablet:max-w-2xl">
          Caminhando com Jesus
        </h2>
        
        {/* Botão para acessar catálogo */}
        <Link
          to="/catalogo-acampamento"
          className="font-inter bg-white text-black px-8 py-4 phone:px-6 phone:py-3 tablet:px-7 tablet:py-3.5 rounded-lg font-semibold text-lg phone:text-base tablet:text-lg hover:bg-gray-100 active:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 min-w-[200px] phone:min-w-[180px] tablet:min-w-[220px]"
        >
          Acessar Catálogo
        </Link>
        
        {/* Indicador de scroll (opcional para mobile) */}
        <div className="absolute bottom-8 phone:bottom-6 tablet:bottom-8 animate-bounce">
          <div className="w-6 h-10 phone:w-5 phone:h-8 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 phone:w-0.5 phone:h-2 bg-white rounded-full mt-2 phone:mt-1.5 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
