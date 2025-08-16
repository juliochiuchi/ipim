import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/calendar')({
  component: Calendar,
})

function Calendar() {
  return (
    <>
      <div className="min-h-screen bg-ipimWhiteSnow dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 py-8 px-4 transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-poppins mb-2 transition-colors duration-300">
              Calendário IPIM
            </h1>
            <p className="text-gray-600 dark:text-gray-300 font-source transition-colors duration-300">
              Acompanhe todos os eventos e atividades da igreja
            </p>
          </div>

          {/* Calendar Container */}
          <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden transition-all duration-300 hover:shadow-3xl">
            <div className="p-6 phone:p-4">
              <iframe
                className="w-full rounded-2xl border-0 shadow-inner transition-all duration-300
                          phone:h-[500px] 
                          tablet:h-[600px] 
                          laptopMd:h-[700px] 
                          desktop:h-[800px]
                          dark:opacity-90 dark:contrast-110 dark:brightness-90"
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FSao_Paulo&bgcolor=%23ffffff&hl=pt_BR&title=IPIM%20Calendar&showTabs=0&showPrint=0&showTitle=0&src=bWFjYXViYWxpcGlAZ21haWwuY29t&src=NjA2NzM4M2NmOWVlN2M0NDk2MzU4NDQyOTRjZjhlOGVmNjVkNmUyNjQzMWViNDA0NmFhZjAyYWI4ZmE3ZjY2MUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NWZiYzZiZGYwODFjYjY1NWViMzlhNzYyMWU2OWI3YWE4ZmRlYWIyNTQ3YzAyNTZhZGZiMmEzOTFjMzJlZTRlNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MTM0OGNiZjYwNmZjMmRmMzcxM2RhZjA5MGM5NTMwMmNhY2U2ZjdkZDYxYTY2MjRkNTY0NmIxMWQwN2QyOTg0YkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZTlkYjAzODFmNjgxMzRiNWUwODBkNWVkNDRlNWUxNzVmYmI2MmFiMDZlMWUzM2I1MTI1YmY3OTk5YzczNTMwMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MGNmYzg4MzI0Y2EwN2EyZGNhN2ZlZTQ5MThmZjFlNTA5YjcyMjEzNzQ1YjNmZGMyMDQ5OTk4ZTRkNzg2MTE2ZkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YmFmYzBmNDc0NTc3MjBlMTczN2QxZWNhOGFiOGYwMTA0ODBiMGQyYzQwM2NkZDVlYmY0NThiZGVkN2Q2NzE0OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=NWRmMTdmNzJhMGZhZDkzMjE4MTdhYzc4OWM0NDBiZTg5ZmQ3OWZmYTYxMWJhODE3Yzg4NjVkMWViZDE4NGJjNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=MGFkZDBlNjJhN2IyYTM0ZTExOGI1MTc3NGE4OTY5ZTZmMjU2ZTI3MjhiYTQyYzk0MjMzZGFmMjU4MjAwN2MyNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OTBiNGQ0NGEwOTRmYmVjYTk5MGI5MzdmMTY1ZWJkNzM1ODgxYjFkM2VkNmUxYmQ0YjUxYzA0NDZiZGRkM2MzNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZTViMjE1NjRjYzQwNGJjZWEzMjFkNzE4ZjNlNDk4MjdhYmU5Y2YzY2RjODJlMzJmNmI5NjQ1NjVkMGZhZjZmY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YTJmZGVkNGE2ZWFiNTk5YmM2MDM3Y2Q0YTAzZDEwMTAwZThkOWMyOWYzZjhjYmI4ODNjMTM5MDNmYTdmNTYzOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=N2YwNWJlMDY2NGYxYWM2YjU2ZTQzMTRlNDE0M2UxZmFkYmM4OWQ5ZjgwNDVjYTM1ZWRkOWEwMGU4NDBlZjE2OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZGMwMTMwMGRlNDJmMDgwNTAyZThjYjI0OWJkYTU2MDM2MmNlNzExMzQ5NWQyNWViZTllYzNhOTkyZmM0MmY4NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=cHQtYnIuYnJhemlsaWFuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23795548&color=%23E4C441&color=%23616161&color=%23F6BF26&color=%23c9cc00&color=%23cc0092&color=%23F4511E&color=%234285F4&color=%23E4C441&color=%23F09300&color=%23009688&color=%239E69AF&color=%23B39DDB&color=%2333B679&color=%230B8043"
                title="Calendário IPIM"
                loading="lazy"
              />
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 font-source transition-colors duration-300">
              Calendário atualizado em tempo real • Todos os horários em GMT-3 (Brasília)
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
