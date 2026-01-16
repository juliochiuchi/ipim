import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const Route = createFileRoute('/_private/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="grid gap-4 tablet:grid-cols-2 laptop:grid-cols-3">
      <Card className="animate-in slide-in-from-bottom-4 duration-700 fill-mode-backwards">
        <CardHeader>
          <CardTitle>Bem-vindo à área administrativa</CardTitle>
          <CardDescription>
            Gerencie eventos e outras configurações do site da IPIM.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Use o menu lateral para navegar pelas seções da dashboard.
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
  )
}
