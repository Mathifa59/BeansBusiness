export interface ContactFormData {
  participante: string;
  nombre: string;
  empresa: string;
  pais: string;
  email: string;
  telefono?: string;
  producto?: string;
  mensaje: string;
}

export interface ContactApiResponse {
  ok: boolean;
  error?: string;
}
