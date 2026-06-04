"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reclamacionSchema, type ReclamacionSchema } from "@/lib/validations/reclamacionSchema";
import { submitReclamacion } from "@/lib/services/reclamacionService";

type Status = "idle" | "loading" | "success" | "error";

export function useReclamacionForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [codigo, setCodigo] = useState<string>("");

  const form = useForm<ReclamacionSchema>({
    resolver: zodResolver(reclamacionSchema),
    defaultValues: {
      consumidor: {
        nombreCompleto: "",
        tipoDocumento: "DNI",
        numeroDocumento: "",
        telefono: "",
        email: "",
        direccion: "",
        esMenorDeEdad: false,
        nombreApoderado: "",
        dniApoderado: "",
      },
      bienServicio: {
        tipo: "PRODUCTO",
        descripcion: "",
        montoReclamado: undefined,
      },
      detalle: {
        tipo: "RECLAMO",
        descripcion: "",
        pedido: "",
        declaracionVeracidad: true,
      },
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus("loading");
    const result = await submitReclamacion(data);
    if (result.ok && result.codigo) {
      setCodigo(result.codigo);
      setStatus("success");
    } else {
      setStatus("error");
    }
  });

  const reset = () => {
    form.reset();
    setStatus("idle");
    setCodigo("");
  };

  return { form, status, codigo, onSubmit, reset };
}
