import { useTranslations } from "next-intl";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/layout/SocialIcons";

export function ContactInfo() {
  const t = useTranslations("contact.info");

  const items = [
    { icon: MapPin, label: t("location") },
    { icon: Phone, label: t("phone") },
    { icon: MessageCircle, label: t("whatsapp") },
  ];

  const socials = [
    { icon: FacebookIcon, label: t("facebook") },
    { icon: InstagramIcon, label: t("instagram") },
  ];

  return (
    <div className="rounded-2xl bg-dark p-8 text-white lg:sticky lg:top-28">
      <h2 className="text-xl font-bold">{t("title")}</h2>

      <ul className="mt-8 space-y-6">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/20">
              <Icon className="h-5 w-5 text-primary-light" />
            </div>
            <p className="text-sm text-white/85">{label}</p>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
        {socials.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-sm text-white/70">
            <Icon className="h-4 w-4 text-primary-light" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <a
        href="https://wa.me/51920833371"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        <MessageCircle className="h-4 w-4" />
        {t("whatsappCta")}
      </a>
    </div>
  );
}
