import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, ChartColumn, Mail, Send } from "lucide-react"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import logoDark from "@/assets/logo-ipim-branco.png"
import logoLight from "@/assets/logo-ipim-cinza.png"
import { authService } from "@/services/auth.service"
import { userService } from "@/services/user.service"
import { toast } from "sonner"

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

const formSchema = z.object({
  email: z.email({
    message: "Por favor, insira um e-mail válido.",
  }),
})

function LoginPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const { data: userMail, error: userMailError } = await userService.checkEmail(values.email)

      if (!userMail) {
        toast.error("E-mail não encontrado.", {
          description: <span className="text-black dark:text-white">A sua conta não está verificada.</span>,
        })
        return
      }

      if (userMailError) {
        toast.error("Erro ao verificar e-mail.")
        return
      }

      const { error } = await authService.signInWithOtp(
        values.email,
        `${window.location.origin}/dashboard`
      )

      if (error) {
        toast.error("Erro ao enviar link de login", {
          description: <span className="text-black dark:text-white">{error.message}</span>,
        })
        return
      }

      toast.success("Link enviado com sucesso!", {
        description: <span className="text-black dark:text-white">Verifique sua caixa de entrada para acessar o sistema.</span>,
      })
      form.reset()
    } catch (error) {
      toast.error("Ocorreu um erro inesperado.")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.14),_transparent_28%)] dark:bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.22),_transparent_34%),radial-gradient(circle_at_bottom,_rgba(56,189,248,0.16),_transparent_28%)]" />
      <div className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-200/60 blur-3xl dark:bg-indigo-500/20" />
      <div className="absolute bottom-8 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-200/50 blur-3xl dark:bg-cyan-400/15" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <Card className="w-full max-w-[720px] border-white/80 bg-white/88 shadow-[0_30px_100px_rgba(15,23,42,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/78 dark:shadow-[0_30px_100px_rgba(2,6,23,0.55)]">
          <CardHeader className="space-y-8 px-6 pb-0 pt-8 text-center sm:px-10 sm:pt-10 lg:px-14 lg:pt-14">
            <div className="flex justify-center">
              <div className="relative flex h-36 w-36 items-center justify-center rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.10)] ring-1 ring-slate-200/70 dark:bg-slate-950 dark:ring-white/10 sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                <div className="absolute inset-3 rounded-[1.6rem] bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_60%)] dark:bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.18),_transparent_60%)]" />
                <img
                  src={logoLight}
                  alt="Logo da Igreja Presbiteriana Independente de Macaubal"
                  className="relative h-24 w-auto dark:hidden sm:h-28 lg:h-32"
                />
                <img
                  src={logoDark}
                  alt="Logo da Igreja Presbiteriana Independente de Macaubal"
                  className="relative hidden h-24 w-auto dark:block sm:h-28 lg:h-32"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
                Área administrativa
              </p>
              <CardTitle className="text-3xl leading-tight sm:text-4xl lg:text-[2.8rem]">
                Entre na sua conta
              </CardTitle>
              <CardDescription className="mx-auto italic max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300">
                Use um e-mail autorizado.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 px-6 pb-8 pt-8 sm:px-10 sm:pb-10 lg:px-14 lg:pb-14">
            <div className="mx-auto w-full max-w-md">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-center">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-2">
                        <FormLabel className="block text-left text-sm font-medium text-slate-700 dark:text-slate-200">
                          E-mail
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                              type="email"
                              placeholder="voce@ipim.com.br"
                              className="h-12 rounded-xl border-slate-200 bg-white pl-11 shadow-none focus-visible:ring-2 dark:border-slate-800 dark:bg-slate-900"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3 pt-2">
                    <Button
                      type="submit"
                      className="h-12 w-full rounded-xl bg-slate-900 text-base font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                      disabled={isLoading}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {isLoading ? "Enviando link..." : "Receber link de acesso"}
                    </Button>

                    <Button
                      asChild
                      type="button"
                      variant="outline"
                      className="h-12 w-full rounded-xl border-slate-200 bg-white/70 text-base shadow-none dark:border-slate-800 dark:bg-slate-900/60"
                    >
                      <a
                        href="https://lumina-omega-one.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ChartColumn className="mr-2 h-4 w-4" />
                        Acessar Lumina
                      </a>
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 w-full rounded-xl border-slate-200 bg-transparent text-base shadow-none dark:border-slate-800 dark:bg-transparent"
                      onClick={() => navigate({ to: '/' })}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Voltar para a página inicial
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            <p className="mx-auto max-w-md text-center text-sm leading-6 text-slate-500 dark:text-slate-400">
              O link de acesso expira após um período curto. Caso não encontre o e-mail,
              verifique também a caixa de spam.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
