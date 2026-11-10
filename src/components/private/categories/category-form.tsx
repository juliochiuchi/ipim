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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { categoryService } from "@/services/category.service"
import { toast } from "sonner"
import type { EventCategory } from "@/types/events"

const DEFAULT_COLOR = "#009683"

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório").max(80, "Máximo de 80 caracteres"),
  description: z.string().max(255, "Máximo de 255 caracteres").optional(),
  color: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^#[0-9a-fA-F]{6}$/.test(value),
      "Informe uma cor no formato hexadecimal (ex: #009683)"
    ),
})

type FormValues = z.infer<typeof formSchema>

interface CategoryFormProps {
  initialData?: EventCategory | null
  onSuccess: () => void
  onCancel: () => void
}

export function CategoryForm({ initialData, onSuccess, onCancel }: CategoryFormProps) {
  const [isSaving, setIsSaving] = useState(false)
  const fieldClassName =
    "bg-muted/25 border-border/70 shadow-none focus-visible:ring-1 focus-visible:ring-ipimGreen/30 dark:bg-white/[0.06] dark:border-white/10 dark:hover:bg-white/[0.08]"

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      name: "",
      description: "",
      color: DEFAULT_COLOR,
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description || "",
        color: initialData.color || DEFAULT_COLOR,
      })
    }
  }, [initialData, form])

  async function onSubmit(values: FormValues) {
    setIsSaving(true)
    try {
      const payload = {
        name: values.name.trim(),
        description: values.description?.trim() || null,
        color: values.color || null,
      }

      if (initialData?.id) {
        const { error } = await categoryService.update(initialData.id, payload)

        if (error) throw error
        toast.success("Categoria atualizada com sucesso")
      } else {
        const { error } = await categoryService.create(payload)

        if (error) throw error
        toast.success("Categoria criada com sucesso")
      }

      onSuccess()
    } catch (error) {
      console.error("Erro ao salvar:", error)
      toast.error("Erro ao salvar categoria", {
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Culto" className={fieldClassName} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Breve descrição da categoria..."
                  className={cn("resize-none", fieldClassName)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cor</FormLabel>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  aria-label="Selecionar cor"
                  value={field.value || DEFAULT_COLOR}
                  onChange={(event) => field.onChange(event.target.value)}
                  className="h-10 w-14 shrink-0 cursor-pointer rounded-md border border-border/70 bg-transparent p-1 dark:border-white/10"
                />
                <FormControl>
                  <Input
                    placeholder="#009683"
                    className={cn("flex-1 uppercase", fieldClassName)}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    name={field.name}
                  />
                </FormControl>
              </div>
              <FormDescription>
                Usada para destacar os eventos desta categoria no site.
              </FormDescription>
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
