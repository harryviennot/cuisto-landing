"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { Scroll, ImageSquare, Browsers, ChatCircleDots } from "@phosphor-icons/react";

const painPointIcons = [Scroll, ImageSquare, Browsers, ChatCircleDots];
const painPointKeys = ["scrollOfDoom", "screenshotRoulette", "tabPurgatory", "sendMeThatVoid"] as const;

export default function Problem() {
  const t = useTranslations("problem");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-surface">
      <div ref={containerRef} className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Bridge line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center text-lg text-text-muted mb-16"
        >
          {t("bridgeLine")}
        </motion.p>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-stone-100 text-stone-600 text-sm font-medium mb-6">
            {t("badge")}
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-heading leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("headline")}{" "}
            <span className="italic text-stone-500">{t("headlineHighlight")}</span>
          </h2>
          <p className="mt-6 text-xl text-text-body max-w-2xl mx-auto">
            {t("subheadline")}
          </p>
        </motion.div>

        {/* Pain points grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {painPointKeys.map((key, index) => {
            const Icon = painPointIcons[index];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.2 + index * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <div className="group relative h-full p-8 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-stone-50 flex items-center justify-center text-stone-900 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon size={24} weight="duotone" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-text-heading mb-3">
                        {t(`painPoints.${key}.title`)}
                      </h3>
                      <p className="text-text-body leading-relaxed">
                        {t(`painPoints.${key}.description`)}
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

