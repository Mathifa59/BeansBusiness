export type TipoDocumento = "DNI" | "CE" | "PASAPORTE";
export type TipoBienServicio = "PRODUCTO" | "SERVICIO";
export type TipoReclamacion = "RECLAMO" | "QUEJA";

export interface DatosConsumidor {
  nombreCompleto: string;
  tipoDocumento: TipoDocumento;
  numeroDocumento: string;
  telefono: string;
  email: string;
  direccion: string;
  esMenorDeEdad: boolean;
  nombreApoderado?: string;
  dniApoderado?: string;
}

export interface DatosBienServicio {
  tipo: TipoBienServicio;
  descripcion: string;
  montoReclamado?: number;
}

export interface DetalleReclamacion {
  tipo: TipoReclamacion;
  descripcion: string;
  pedido: string;
  declaracionVeracidad: boolean;
}

export interface ReclamacionFormData {
  consumidor: DatosConsumidor;
  bienServicio: DatosBienServicio;
  detalle: DetalleReclamacion;
}

export interface ReclamacionApiResponse {
  ok: boolean;
  codigo?: string;
  error?: string;
}

export interface CounterData {
  year: number;
  count: number;
}
