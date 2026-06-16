import { createOfferCheckoutSessionUrl } from "./create-offer-checkout-session.js"

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
  let stage = "method-check"

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    stage = "origin"
    const origin = getOrigin(req)

    stage = "checkout-session"
    const url = await createOfferCheckoutSessionUrl(origin)

    res.setHeader("x-checkout-stage", "success")
    return res.status(200).json({ url })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create checkout session"
    res.setHeader("x-checkout-stage", stage)
    return res.status(500).json({ error: message, stage })
  }
}
