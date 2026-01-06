import { createFileRoute, Outlet } from '@tanstack/react-router'
import { requireAuth } from '@/utils/auth'

export const Route = createFileRoute('/_private')({
  component: RouteComponent,
  beforeLoad: requireAuth,
})

function RouteComponent() {
  return (
    <Outlet />
  )
}
