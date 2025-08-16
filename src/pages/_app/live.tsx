import VideoPlayerLive from '@/components/video-player-live/video-player-live'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/live')({
  component: Live,
})

function Live() {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center bg-zinc-900 pb-11 pt-10 phone:m-0 phone:px-6 laptopMd:px-0">
        <VideoPlayerLive />
      </div>
    </>
  )
}
