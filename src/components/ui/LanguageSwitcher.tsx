"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { useTransition } from "react";
import { Globe } from "@phosphor-icons/react";

export default function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: "en" | "fr") => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const otherLocale = locale === "en" ? "fr" : "en";

  return (
    <button
      onClick={() => switchLocale(otherLocale)}
      disabled={isPending}
      className={`
        flex items-center gap-1.5 px-3 py-1.5
        rounded-full text-sm font-medium
        bg-surface-elevated border border-border
        hover:border-primary/30 hover:bg-surface
        transition-all duration-200
        ${isPending ? "opacity-50 cursor-wait" : ""}
      `}
      title={t(otherLocale)}
    >
      <Globe size={16} weight="duotone" className="text-text-muted" />
      <span className="uppercase text-text-body">{otherLocale}</span>
    </button>
  );
}
