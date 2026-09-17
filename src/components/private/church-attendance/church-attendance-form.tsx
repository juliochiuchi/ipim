import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { CalendarIcon, Loader2 } from "lucide-react"
import { parseISO } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import type { AgeRange, ChurchAttendance } from "@/types/church-attendance"

const formSchema = z.object({
  date: z.date({
    message: "Selecione uma data",
  }),
  age_range: z.string().min(1, "Selecione a faixa etária"),
  quantity: z.coerce
    .number({ message: "Informe uma quantidade válida" })
    .int("A quantidade precisa ser inteira")
    .min(1, "A quantidade deve ser maior que zero"),
})

type FormValues = z.infer<typeof formSchema>

type ChurchAttendanceFormProps = {
  ageRanges: AgeRange[]
  initialData?: ChurchAttendance | null
  isSaving: boolean
  onCancel: () => void
  onSubmit: (values: FormValues) => Promise<void>
}

export function ChurchAttendanceForm({
  ageRanges,
  initialData,
  isSaving,
  onCancel,
  onSubmit,
}: ChurchAttendanceFormProps) {
  const fieldClassName =
    "bg-muted/25 border-border/70 shadow-none focus-visible:ring-1 focus-visible:ring-ipimGreen/30 dark:bg-white/[0.06] dark:border-white/10 dark:hover:bg-white/[0.08]"
  const fieldButtonClassName =
    "bg-muted/25 border-border/70 shadow-none hover:bg-muted/35 dark:bg-white/[0.06] dark:border-white/10 dark:hover:bg-white/[0.09]"

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as Resolver<FormValues>,
    defaultValues: {
      date: undefined,
      age_range: "",
      quantity: 1,
    },
  })

  useEffect(() => {
    if (!initialData) {
      form.reset({
        date: undefined,
        age_range: "",
        quantity: 1,
      })
      return
    }

    form.reset({
      date: parseISO(initialData.date),
      age_range: initialData.age_range,
      quantity: initialData.quantity,
    })
  }, [form, initialData])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between pl-3 text-left font-normal",
                        fieldButtonClassName,
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? field.value.toLocaleDateString("pt-BR") : "Selecione a data"}
                      <CalendarIcon className="h-4 w-4 opacity-50" />
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
          name="age_range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faixa etária</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className={fieldClassName}>
                    <SelectValue placeholder="Selecione uma faixa etária" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ageRanges.map((ageRange) => (
                    <SelectItem key={ageRange.id} value={ageRange.id}>
                      {ageRange.description}
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
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  min={1}
                  placeholder="Ex: 32"
                  className={fieldClassName}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" disabled={isSaving} className="bg-ipimGreen text-white hover:bg-ipimGreenHover">
            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Salvar alterações" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
