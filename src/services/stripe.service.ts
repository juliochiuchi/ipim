type CreateCheckoutSessionResponse = {
  url: string;
};

type ErrorResponse = {
  error?: string;
};

async function readErrorMessage(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const data = (await response.json().catch(() => null)) as ErrorResponse | null;
    return data?.error;
  }

  const text = await response.text().catch(() => "");
  return text || undefined;
}

export const stripeService = {
  async createOfferCheckoutSession() {
    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
    });

    if (!response.ok) {
      const message = await readErrorMessage(response);
      throw new Error(message ?? "Não foi possível iniciar o checkout");
    }

    const data = (await response.json()) as Partial<CreateCheckoutSessionResponse>;
    if (!data.url) {
      throw new Error("URL inválida do Stripe");
    }

    return data.url;
  },
};
