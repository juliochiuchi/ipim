import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { AgeRange } from "@/types/church-attendance"

type AttendanceBarLabelChartProps = {
  ageRanges: AgeRange[]
  colorsByAgeRange: Record<string, string>
  data: Array<Record<string, string | number>>
  selectedYear: string
}

export function AttendanceBarLabelChart({
  ageRanges,
  colorsByAgeRange,
  data,
  selectedYear,
}: AttendanceBarLabelChartProps) {
  const hasData = data.some((item) =>
    ageRanges.some((ageRange) => Number(item[ageRange.id] ?? 0) > 0),
  )

  return (
    <Card className="border-border/70 bg-card/70 dark:border-white/10 dark:bg-[#111214]/70">
      <CardHeader>
        <CardTitle>Panorama anual por faixa etária</CardTitle>
        <CardDescription>
          Evolução mês a mês das quantidades registradas em {selectedYear}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {ageRanges.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/70 px-4 py-10 text-center text-sm text-muted-foreground dark:border-white/10">
            Cadastre faixas etárias para visualizar o comparativo anual.
          </div>
        ) : (
          <div className="h-[360px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 24, right: 16, left: 0, bottom: 0 }} barGap={8}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value: string | number | readonly (string | number)[] | undefined, name: string | number | undefined) => {
                    const parsedValue = Array.isArray(value) ? value[0] : value
                    const quantity = Number(parsedValue) || 0

                    return [`${quantity} pessoas registradas`, String(name ?? "Faixa etária")]
                  }}
                  labelFormatter={(label) => `Mês de referência: ${String(label)} / ${selectedYear}`}
                  cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
                  contentStyle={{
                    borderRadius: 18,
                    borderColor: "rgba(148, 163, 184, 0.18)",
                    backgroundColor: "rgba(15, 16, 18, 0.95)",
                    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.24)",
                    padding: "10px 12px",
                  }}
                  labelStyle={{
                    color: "rgba(255,255,255,0.62)",
                    marginBottom: 4,
                    fontWeight: 500,
                    fontSize: 11,
                    lineHeight: 1.2,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  itemStyle={{
                    color: "#f8fafc",
                    padding: 0,
                    fontWeight: 600,
                    fontSize: 13,
                    lineHeight: 1.35,
                    fontFamily: "Poppins, sans-serif",
                  }}
                  separator=": "
                />
                <Legend />
                {ageRanges.map((ageRange) => (
                  <Bar
                    key={ageRange.id}
                    dataKey={ageRange.id}
                    name={ageRange.description}
                    fill={colorsByAgeRange[ageRange.id]}
                    radius={[10, 10, 0, 0]}
                    maxBarSize={42}
                  >
                    <LabelList
                      dataKey={ageRange.id}
                      position="top"
                      formatter={(value) => {
                        const parsedValue = Number(value) || 0
                        return parsedValue > 0 ? parsedValue : ""
                      }}
                      className="fill-muted-foreground text-[11px]"
                    />
                  </Bar>
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {!hasData && ageRanges.length > 0 && (
          <div className="mt-4 rounded-2xl border border-dashed border-border/70 px-4 py-3 text-sm text-muted-foreground dark:border-white/10">
            Nenhum lançamento encontrado para o ano selecionado. O gráfico permanece visível para facilitar novas consultas.
          </div>
        )}
      </CardContent>
    </Card>
  )
}
