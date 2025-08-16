export default function VideoPlayerLive() {
  return (
    <div className="m-0 rounded-2xl bg-zinc-700 p-1 w-[85vw] max-w-[1200px]">
      <iframe
        className="rounded-2xl w-full h-[50vh] laptopMd:h-[60vh] desktop:h-[70vh]"
        src="https://www.youtube.com/embed/live_stream?channel=UCKhKw97cqyvDtaXrljUcL0A"
        allowFullScreen
      />
    </div>
  )
}
