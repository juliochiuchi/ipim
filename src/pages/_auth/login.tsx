import { createFileRoute } from '@tanstack/react-router'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from 'react'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { supabase } from '@/utils/supabase'
import { toast } from "sonner"

export const Route = createFileRoute('/_auth/login')({
  component: LoginPage,
})

const formSchema = z.object({
  email: z.string().email({
    message: "Por favor, insira um e-mail válido.",
  }),
})

function LoginPage() {
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
      const { data: userMail, error: userMailError } = await supabase.from('users_mails').select("email").eq("email", values.email).single()

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

      const { error } = await supabase.auth.signInWithOtp({
        email: values.email,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

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
    <Card className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-700 fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Acesso Restrito</CardTitle>
        <CardDescription className="text-center">
          Digite seu e-mail para receber um link de acesso mágico.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Link de Acesso"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
