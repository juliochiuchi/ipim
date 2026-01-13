import { createFileRoute } from '@tanstack/react-router'
import { Banner } from '../../components/banner/banner'
import { VisitUs } from '../../components/visit-us/visit-us'
import ChurchOperation from '@/components/church-operation/church-operation'
import Schedule from '@/components/schedule/schedule'

export const Route = createFileRoute('/_app/')({
  component: Index,
})

function Index() {
  return (
    <>
      <div className="animate-in slide-in-from-top-4 duration-700 fade-in">
        <Banner />
      </div>
      <div className="animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards delay-100">
        <Schedule />
      </div>
      <div className="animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards delay-200">
        <VisitUs />
      </div>
      <div className="animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards delay-300">
        <ChurchOperation />
      </div>
    </>
  )
}
