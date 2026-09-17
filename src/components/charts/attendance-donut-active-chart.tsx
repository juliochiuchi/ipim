import { useEffect, useMemo, useState } from "react"
import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type DonutChartDatum = {
  id: string
  name: string
  value: number
  fill: string
}

type AttendanceDonutActiveChartProps = {
  data: DonutChartDatum[]
  title?: string
  description?: string
}

type ActiveShapeProps = {
  cx?: number
  cy?: number
  innerRadius?: number
  outerRadius?: number
  startAngle?: number
  endAngle?: number
  fill?: string
  index?: number
}

export function AttendanceDonutActiveChart({
  data,
  title = "Distribuição por faixa etária",
  description,
}: AttendanceDonutActiveChartProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const total = useMemo(
    () => data.reduce((accumulator, item) => accumulator + item.value, 0),
    [data],
  )

  useEffect(() => {
    setActiveIndex((currentIndex) => {
      if (data.length === 0) {
        return 0
      }

      return Math.min(currentIndex, data.length - 1)
    })
  }, [data])

  if (data.length === 0) {
    return (
      <Card className="border-border/70 bg-card/70 dark:border-white/10 dark:bg-[#111214]/70">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description ?? "Nenhum dado disponível para o gráfico."}</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="border-border/70 bg-card/70 dark:border-white/10 dark:bg-[#111214]/70">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description ?? "Quantidade consolidada por faixa etária."}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 laptop:grid-cols-[minmax(0,1fr)_280px]">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                formatter={(value: string | number | readonly (string | number)[] | undefined, name: string | number | undefined) => {
                  const parsedValue = Array.isArray(value) ? value[0] : value
                  const quantity = Number(parsedValue) || 0
                  const percentage = total > 0 ? Math.round((quantity / total) * 100) : 0

                  return [`${quantity} pessoas (${percentage}%)`, String(name ?? "Faixa etária")]
                }}
                labelFormatter={() => "Faixa etária selecionada"}
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
              <Pie
                shape={(props: ActiveShapeProps) => (
                  <Sector
                    {...props}
                    outerRadius={(props.outerRadius ?? 0) + (props.index === activeIndex ? 10 : 0)}
                    cornerRadius={12}
                  />
                )}
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={76}
                outerRadius={112}
                strokeWidth={0}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              />
              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground text-3xl font-semibold"
              >
                {total}
              </text>
              <text
                x="50%"
                y="56%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground text-sm"
              >
                total
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => setActiveIndex(index)}
              className="flex w-full items-center justify-between rounded-2xl border border-border/60 bg-background/55 px-4 py-3 text-left transition hover:border-ipimGreen/35 hover:bg-background dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3.5 w-3.5 rounded-full"
                  style={{ backgroundColor: item.fill }}
                />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {total > 0 ? `${Math.round((item.value / total) * 100)}% do total` : "0% do total"}
                  </p>
                </div>
              </div>
              <span className="text-sm font-semibold">{item.value}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
