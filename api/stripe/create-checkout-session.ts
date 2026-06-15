import { createOfferCheckoutSessionUrl } from "./create-offer-checkout-session"

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

function getOrigin(req: RequestLike) {
  const origin = getHeader(req, "origin")
  if (origin) return origin

  const proto = getHeader(req, "x-forwarded-proto") ?? "https"
  const host = getHeader(req, "x-forwarded-host") ?? getHeader(req, "host")

  if (!host) return "http://localhost:5173"
  return `${proto}://${host}`
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const origin = getOrigin(req)
    const url = await createOfferCheckoutSessionUrl(origin)
    return res.status(200).json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create checkout session"
    return res.status(500).json({ error: message })
  }
}
