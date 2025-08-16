import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Footer } from '../../components/footer/footer'
import { Header } from '@/components/header/header'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
