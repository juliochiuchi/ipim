type RequestLike = {
  method?: string
  headers?: Record<string, string | string[] | undefined>
}

type ResponseLike = {
  setHeader: (name: string, value: string) => void
  status: (code: number) => ResponseLike
  json: (body: unknown) => void
}

function getHeader(req: RequestLike, name: string) {
  const value = req.headers?.[name]
  return Array.isArray(value) ? value[0] : value
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const host = getHeader(req, "x-forwarded-host") ?? getHeader(req, "host") ?? null
  const proto = getHeader(req, "x-forwarded-proto") ?? "https"

  res.setHeader("Cache-Control", "no-store")

  return res.status(200).json({
    ok: true,
    runtime: "nodejs",
    nodeEnv: process.env.NODE_ENV ?? null,
    hasStripeSecretKey: Boolean(process.env.STRIPE_SECRET_KEY),
    hasViteStripeSecretKey: Boolean(process.env.VITE_STRIPE_SECRET_KEY),
    host,
    proto,
  })
}
