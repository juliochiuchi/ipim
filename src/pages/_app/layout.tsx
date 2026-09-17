import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Footer } from '../../components/footer/footer'
import { Header } from '@/components/header/header'
import { CommandPalette } from '@/components/command-palette/command-palette'

export const Route = createFileRoute('/_app')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <CommandPalette />
    </>
  )
}
