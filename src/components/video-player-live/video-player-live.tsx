import { cn } from '@/lib/utils'

const DEFAULT_STREAM_URL = import.meta.env.VITE_LIVE_STREAM_KEY_URL_IPIM

type VideoPlayerLiveProps = {
  src?: string
  title?: string
  className?: string
}

export default function VideoPlayerLive({
  src = DEFAULT_STREAM_URL,
  title = 'IPIM - Transmissão ao Vivo',
  className,
}: VideoPlayerLiveProps) {
  return (
    <div className={cn('group relative', className)}>
      <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-b from-ipimGreen/20 via-ipimIndigoLight/10 to-transparent opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100 tablet:-inset-6" />

      <div className="relative overflow-hidden rounded-2xl bg-zinc-950 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] ring-1 ring-black/5 tablet:rounded-3xl">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />

          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />

          <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="font-poppins text-[10px] font-semibold uppercase tracking-[0.18em] text-white tablet:text-[11px]">
              Ao vivo
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
