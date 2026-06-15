export interface ContactFormData {
  participante: string;
  nombre: string;
  empresa: string;
  pais: string;
  email: string;
  telefono?: string;
  productos?: string[];
  mensaje: string;
}

export interface ContactApiResponse {
  ok: boolean;
  error?: string;
}
