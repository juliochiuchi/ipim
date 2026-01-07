import { createFileRoute } from '@tanstack/react-router'
import { Banner } from '../../components/banner/banner'
import ChurchOnline from '../../components/church-online/church-online'
import { FindMe } from '../../components/find-me/find-me'
import ChurchOperation from '@/components/church-operation/church-operation'
// import Prayer from '../../components/prayer/prayer'
// import WorshipTimes from '../../components/worship-times/worship-times'

export const Route = createFileRoute('/_app/')({
  component: Index,
})

function Index() {
  return (
    <>
      <Banner />
      <ChurchOnline />
      <FindMe />
      {/* <Prayer /> */}
      {/* <WorshipTimes /> */}
      <ChurchOperation />
    </>
  )
}
