"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSchema,
  type ContactSchema,
  PRODUCT_OPTIONS,
} from "@/lib/validations/contactSchema";
import { sendContactEmail } from "@/lib/services/contactService";

type Status = "idle" | "loading" | "success" | "error";

export function useContactForm(initialProduct?: string) {
  const [status, setStatus] = useState<Status>("idle");

  const producto = PRODUCT_OPTIONS.includes(
    initialProduct as (typeof PRODUCT_OPTIONS)[number]
  )
    ? (initialProduct as (typeof PRODUCT_OPTIONS)[number])
    : undefined;

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      participante: "importer",
      nombre: "",
      empresa: "",
      pais: "",
      email: "",
      telefono: "",
      producto,
      mensaje: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setStatus("loading");
    const result = await sendContactEmail(data);
    setStatus(result.ok ? "success" : "error");
  });

  return { form, status, onSubmit };
}
