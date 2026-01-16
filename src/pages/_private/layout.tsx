import { useEffect, useState } from 'react'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { requireAuth } from '@/utils/auth'
import { AdminLayout } from '@/components/private/admin-layout'
import { authService } from '@/services/auth.service'
import { toast } from 'sonner'
import { LoadingPage } from '@/components/loading/global-loading'

export const Route = createFileRoute('/_private')({
  component: RouteComponent,
  beforeLoad: requireAuth,
})

function RouteComponent() {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await authService.getUser()
        setUserEmail(user?.email || null)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    try {
      await authService.signOut()
      toast.success('Logout realizado com sucesso')
      navigate({ to: '/login' })
    } catch (error) {
      toast.error('Erro ao fazer logout')
      console.error(error)
    }
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <AdminLayout userEmail={userEmail} onLogout={handleLogout}>
      <Outlet />
    </AdminLayout>
  )
}
