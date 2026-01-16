import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { authService } from '@/services/auth.service'
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoadingPage } from '@/components/loading/global-loading'
import { AdminLayout } from '@/components/private/admin-layout'

export const Route = createFileRoute('/_private/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await authService.getUser()
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
      toast.success("Logout realizado com sucesso")
      navigate({ to: '/login' })
    } catch (error) {
      toast.error("Erro ao fazer logout")
      console.error(error)
    }
  }

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <AdminLayout title="Dashboard" userEmail={userEmail} onLogout={handleLogout}>
      <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
        <Card className="animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards">
          <CardHeader>
            <CardTitle>Bem-vindo</CardTitle>
            <CardDescription>Você está logado no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Usuário: <span className="font-medium text-foreground">{userEmail}</span>
            </p>
          </CardContent>
        </Card>

        <Card className="animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards delay-150">
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Informações da conta</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-sm">Ativo</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
