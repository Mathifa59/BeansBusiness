"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactSchema } from "@/lib/validations/contactSchema";
import { sendContactEmail } from "@/lib/services/contactService";

type Status = "idle" | "loading" | "success" | "error";

export function useContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: "",
      empresa: "",
      email: "",
      telefono: "",
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
