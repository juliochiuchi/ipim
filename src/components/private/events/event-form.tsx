import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import type { Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Clock, Loader2 } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { categoryService } from "@/services/category.service"
import { eventService } from "@/services/event.service"
import { toast } from "sonner"
import type { Event, EventCategory } from "@/types/events"

const formSchema = z.object({
  title: z.string().min(1, "O título é obrigatório").max(150, "Máximo de 150 caracteres"),
  description: z.string().optional(),
  category_id: z.string().optional(),
  start_date: z.date({
    message: "A data de início é obrigatória",
  }),
  end_date: z.date().optional(),
  start_time: z.string().optional(),
  end_time: z.string().optional(),
  location: z.string().max(150, "Máximo de 150 caracteres").optional(),
  is_active: z.boolean().default(true),
})

type FormValues = z.infer<typeof formSchema>

interface EventFormProps {
  initialData?: Event | null
  onSuccess: () => void
  onCancel: () => void
}

export function EventForm({ initialData, onSuccess, onCancel }: EventFormProps) {
  const [categories, setCategories] = useState<EventCategory[]>([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      title: "",
      description: "",
      category_id: undefined,
      start_date: undefined,
      end_date: undefined,
      start_time: "",
      end_time: "",
      location: "",
      is_active: true,
    },
  })

  useEffect(() => {
    async function fetchCategories() {
      setIsLoadingCategories(true)
      const { data, error } = await categoryService.getAll()

      if (error) {
        toast.error("Erro ao carregar categorias")
        console.error(error)
      } else {
        setCategories(data || [])
      }
      setIsLoadingCategories(false)
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (initialData && !isLoadingCategories) {
      form.reset({
        title: initialData.title,
        description: initialData.description || "",
        category_id: initialData.category_id ?? undefined,
        start_date: initialData.start_date ? new Date(initialData.start_date) : undefined,
        end_date: initialData.end_date ? new Date(initialData.end_date) : undefined,
        start_time: initialData.start_time || "",
        end_time: initialData.end_time || "",
        location: initialData.location || "",
        is_active: initialData.is_active,
      })
    }
  }, [initialData, form, isLoadingCategories])

  async function onSubmit(values: FormValues) {
    setIsSaving(true)
    try {
      const payload = {
        title: values.title,
        description: values.description || null,
        category_id: values.category_id || null,
        start_date: values.start_date.toISOString().split("T")[0], // Format as YYYY-MM-DD
        end_date: values.end_date ? values.end_date.toISOString().split("T")[0] : null,
        start_time: values.start_time || null,
        end_time: values.end_time || null,
        location: values.location || null,
        is_active: values.is_active,
      }

      if (initialData?.id) {
        const { error } = await eventService.update(initialData.id, {
          ...payload,
          updated_at: new Date().toISOString(),
        })

        if (error) throw error
        toast.success("Programação atualizada com sucesso")
      } else {
        const { error } = await eventService.create(payload)

        if (error) throw error
        toast.success("Programação criada com sucesso")
      }

      onSuccess()
    } catch (error) {
      console.error("Erro ao salvar:", error)
      toast.error("Erro ao salvar programação", {
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Culto de Domingo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 tablet:flex-row">
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? undefined}
                  disabled={isLoadingCategories}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={isLoadingCategories ? "Carregando..." : "Selecione uma categoria"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Local</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Templo Principal" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-4 tablet:flex-row">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Data de Início</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-1 flex-col">
                <FormLabel>Data de Término</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-4 tablet:flex-row">
          <FormField
            control={form.control}
            name="start_time"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Horário de Início</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="time"
                      className="appearance-none pr-10"
                      {...field}
                    />
                    <Clock className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_time"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Horário de Término</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="time"
                      className="appearance-none pr-10"
                      {...field}
                    />
                    <Clock className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detalhes sobre a programação..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Ativo</FormLabel>
                <FormDescription>
                  Define se esta programação está visível publicamente.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
