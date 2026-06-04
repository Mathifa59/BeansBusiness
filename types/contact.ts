export interface ContactFormData {
  nombre: string;
  empresa: string;
  email: string;
  telefono?: string;
  mensaje: string;
}

export interface ContactApiResponse {
  ok: boolean;
  error?: string;
}
