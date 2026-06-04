import type { ContactSchema } from "@/lib/validations/contactSchema";
import type { ContactApiResponse } from "@/types/contact";

export async function sendContactEmail(data: ContactSchema): Promise<ContactApiResponse> {
  try {
    const res = await fetch("/api/contacto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return (await res.json()) as ContactApiResponse;
  } catch {
    return { ok: false, error: "network_error" };
  }
}
