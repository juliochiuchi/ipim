import { createFileRoute, Link } from '@tanstack/react-router'
import videoCapaAcamp from '../../assets/video-capa-acamp.mp4'

export const Route = createFileRoute('/_app/acampamento')({
  component: Acampamento,
})

function Acampamento() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
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

      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-white phone:px-4">
        <div className="w-full max-w-2xl animate-in slide-in-from-top-4 duration-700 fade-in">
          <div className="mx-auto w-fit rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
            Acampamento
          </div>

          <h1 className="mt-5 text-center font-poppins text-4xl font-bold leading-[1.05] tracking-tight phone:text-3xl tablet:text-6xl desktop:text-7xl">
            <span className="text-white/90">Acampamento</span>{' '}
            <span className="text-ipimGreen">25</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-center font-source text-base leading-relaxed text-white/80 phone:text-sm tablet:text-lg">
            Caminhando com Jesus
          </p>

          <div className="mt-10 flex justify-center animate-in slide-in-from-bottom-4 duration-700 fade-in delay-200">
            <Link
              to="/catalogo-acampamento"
              className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-poppins text-base font-semibold text-zinc-950 shadow-lg shadow-black/20 transition-all duration-300 hover:translate-y-[-1px] hover:bg-white/90 active:translate-y-0 phone:px-7 phone:py-3"
            >
              Acessar catálogo
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 flex flex-col items-center gap-2 text-white/70 phone:bottom-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">Role</span>
          <div className="h-10 w-6 rounded-full border border-white/30 p-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-white/80" />
          </div>
        </div>
      </div>
    </div>
  )
}
