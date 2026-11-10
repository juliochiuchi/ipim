import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"

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
import { tagService } from "@/services/tag.service"
import { toast } from "sonner"
import type { Tag } from "@/types/events"

const formSchema = z.object({
  tag_name: z.string().min(1, "O nome da tag é obrigatório").max(60, "Máximo de 60 caracteres"),
})

type FormValues = z.infer<typeof formSchema>

interface TagFormProps {
  initialData?: Tag | null
  onSuccess: () => void
  onCancel: () => void
}

export function TagForm({ initialData, onSuccess, onCancel }: TagFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const fieldClassName =
    "bg-muted/25 border-border/70 shadow-none focus-visible:ring-1 focus-visible:ring-ipimGreen/30 dark:bg-white/[0.06] dark:border-white/10 dark:hover:bg-white/[0.08]"

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      tag_name: "",
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        tag_name: initialData.tag_name,
      })
    }
  }, [initialData, form])

  async function onSubmit(values: FormValues) {
    setIsSaving(true)
    try {
      const payload = {
        tag_name: values.tag_name.trim(),
      }

      if (initialData?.id) {
        const { error } = await tagService.update(initialData.id, payload)

        if (error) throw error
        toast.success("Tag atualizada com sucesso")
      } else {
        const { error } = await tagService.create(payload)

        if (error) throw error
        toast.success("Tag criada com sucesso")
      }

      onSuccess()
    } catch (error) {
      console.error("Erro ao salvar:", error)
      toast.error("Erro ao salvar tag", {
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tag_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da tag</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Culto" className={fieldClassName} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSaving} className="bg-ipimGreen hover:bg-ipimGreenHover text-white">
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
