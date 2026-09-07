import { formatCodigo, getCurrentYear } from "@/lib/utils";

/**
 * En Vercel el filesystem del deployment es de solo lectura fuera de /tmp,
 * así que un correlativo persistido en un archivo JSON local (el enfoque
 * anterior) falla con EROFS en cada solicitud — confirmado en los logs de
 * producción, nunca llegó a funcionar ahí. Mientras no exista una base de
 * datos real (Supabase/Vercel KV) para un correlativo estrictamente
 * secuencial, se genera un código único no secuencial: no depende de
 * estado compartido entre invocaciones, así que nunca puede fallar por
 * este motivo.
 */
export async function generateCodigo(): Promise<string> {
  const year = getCurrentYear();
  const random = Math.floor(Math.random() * 1_000_000);
  return formatCodigo(year, random);
}
