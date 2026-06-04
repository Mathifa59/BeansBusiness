import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { COMPANY_INFO } from "@/lib/constants/company";

export function ContactInfo() {
  const t = useTranslations("contacto.info");

  const items = [
    { icon: MapPin, label: t("address"), value: COMPANY_INFO.direccion },
    { icon: Phone, label: t("phone"), value: COMPANY_INFO.telefono },
    { icon: Mail, label: t("email"), value: COMPANY_INFO.email },
    { icon: Clock, label: t("hours"), value: t("hoursValue") },
  ];

  return (
    <div className="rounded-2xl bg-[oklch(0.20_0.06_148)] p-8 text-white">
      <h2 className="text-xl font-bold">{t("title")}</h2>

      <ul className="mt-8 space-y-6">
        {items.map(({ icon: Icon, label, value }) => (
          <li key={label} className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.48_0.14_148)]/30">
              <Icon className="h-5 w-5 text-[oklch(0.72_0.12_148)]" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                {label}
              </p>
              <p className="mt-1 text-sm text-white/85">{value}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Map placeholder */}
      <div className="mt-8 flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5">
        <span className="text-sm text-white/30">Mapa — próximamente</span>
      </div>
    </div>
  );
}
