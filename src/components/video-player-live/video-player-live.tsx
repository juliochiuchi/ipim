export default function VideoPlayerLive() {
  return (
    <div className="w-full">
      <div className="relative w-full rounded-2xl overflow-hidden shadow-inner bg-zinc-900">
        <iframe
          className="w-full border-0 transition-all duration-300
                    phone:h-[250px] 
                    phone:h-[400px] 
                    laptop:h-[500px] 
                    desktop:h-[600px]"
          src="https://www.youtube.com/embed/live_stream?channel=UCKhKw97cqyvDtaXrljUcL0A&autoplay=0&mute=0"
          title="IPIM - Transmissão ao Vivo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>

      {/* Status indicator */}
      <div className="mt-4 flex items-center justify-center gap-2 flex-col">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600 dark:text-gray-300 font-source">
            Ao vivo no YouTube
          </span>
        </div>
      </div>
    </div>
  )
}
