"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { User, EnvelopeSimple } from "@phosphor-icons/react";

export default function Founder() {
  const t = useTranslations("founder");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="story" className="relative py-24 sm:py-32 bg-stone-50 overflow-hidden">
      <div ref={containerRef} className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Photo Column */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-200 shadow-xl">
              {/* Placeholder for Founder Image */}
              <div className="absolute inset-0 flex items-center justify-center bg-stone-300 text-stone-500">
                <User size={64} weight="duotone" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-white font-bold text-lg">{t("name")}</p>
                <p className="text-stone-300 text-sm">{t("role")}</p>
              </div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            className="md:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2
              className="text-3xl sm:text-4xl font-bold text-text-heading mb-8"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("headline")}
            </h2>

            <div className="space-y-6 text-lg text-text-body leading-relaxed">
              <p>{t("story.paragraph1")}</p>
              <p>{t("story.paragraph2")}</p>
              <p>{t("story.paragraph3")}</p>
            </div>

            <div className="mt-10 pt-8 border-t border-stone-200">
              <p className="font-medium text-text-heading mb-4">
                {t("contact")}
              </p>
              <a
                href="mailto:hello@cuistudio.app"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors"
              >
                <EnvelopeSimple size={20} weight="bold" />
                <span>hello@cuistudio.app</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

