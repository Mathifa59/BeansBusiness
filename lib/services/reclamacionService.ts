import type { ReclamacionSchema } from "@/lib/validations/reclamacionSchema";
import type { ReclamacionApiResponse } from "@/types/reclamacion";

export async function submitReclamacion(
  data: ReclamacionSchema
): Promise<ReclamacionApiResponse> {
  try {
    const res = await fetch("/api/reclamaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return (await res.json()) as ReclamacionApiResponse;
  } catch {
    return { ok: false, error: "network_error" };
  }
}
