"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { CaptureVisual, ExtractVisual, CookVisual } from "./HowItWorksVisuals";

const stepKeys = ["capture", "extract", "cook"] as const;
const stepGradients = [
  "from-forest-400 to-forest-600",
  "from-primary to-forest-800",
  "from-forest-600 to-forest-900",
];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section
      id="how-it-works"
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-forest-950 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-forest-900 via-forest-950 to-forest-950" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 sm:mb-28"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-forest-800 text-forest-300 text-sm font-medium mb-6 border border-forest-700">
            {t("badge")}
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {t("headline")}{" "}
            <span className="text-forest-300 italic">{t("headlineHighlight")}</span>
          </h2>
          <p className="mt-6 text-xl text-forest-300 max-w-2xl mx-auto">
            {t("subheadline")}
          </p>
        </motion.div>

        {/* Steps with timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-0.5 bg-forest-800">
            <motion.div
              className="w-full bg-gradient-to-b from-forest-400 to-forest-600"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-24 lg:space-y-32">
            {stepKeys.map((key, index) => {
              const gradient = stepGradients[index];
              const features = t.raw(`steps.${key}.features`) as string[];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.8,
                    delay: 0.3 + index * 0.2,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className={`relative grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                    }`}
                >
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-8 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br ${gradient} ring-4 ring-forest-950`}
                  />

                  {/* Content */}
                  <div
                    className={`pl-20 lg:pl-0 ${index % 2 === 1 ? "lg:order-2 lg:pl-16" : "lg:pr-16 lg:text-right"
                      }`}
                  >
                    <div
                      className={`inline-flex items-center gap-3 mb-4 ${index % 2 === 0 ? "lg:flex-row-reverse" : ""
                        }`}
                    >
                      <span
                        className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white`}
                      >
                        {t(`steps.${key}.number`)}
                      </span>
                      <span className="text-sm text-forest-400 uppercase tracking-wider">
                        {t(`steps.${key}.subtitle`)}
                      </span>
                    </div>
                    <h3
                      className="text-3xl sm:text-4xl font-bold text-white mb-4"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {t(`steps.${key}.title`)}
                    </h3>
                    <p className="text-lg text-forest-300 leading-relaxed mb-6">
                      {t(`steps.${key}.description`)}
                    </p>

                    {/* Feature pills */}
                    <div
                      className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "lg:justify-end" : ""
                        }`}
                    >
                      {features.map((feature: string, i: number) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 rounded-full bg-forest-800/50 text-forest-300 text-sm border border-forest-700/50"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Visual placeholder */}
                  <div
                    className={`pl-20 lg:pl-0 ${index % 2 === 1 ? "lg:order-1 lg:pr-16" : "lg:pl-16"
                      }`}
                  >
                    <div className="relative">
                      {/* Phone frame */}
                      <div className="relative mx-auto w-64 sm:w-72">
                        <div className="aspect-[9/19] rounded-[2.5rem] bg-gradient-to-b from-forest-800 to-forest-900 p-2 shadow-dramatic">
                          <div className="w-full h-full rounded-[2rem] bg-forest-950 overflow-hidden relative">
                            {index === 0 && <CaptureVisual />}
                            {index === 1 && <ExtractVisual />}
                            {index === 2 && <CookVisual />}
                          </div>
                        </div>
                        {/* Glow effect */}
                        <div
                          className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${gradient} opacity-20 blur-2xl -z-10`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
