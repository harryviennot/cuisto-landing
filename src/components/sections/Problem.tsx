"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Scroll, ImageSquare, Browsers, ChatCircleDots } from "@phosphor-icons/react";

const painPoints = [
  {
    icon: Scroll,
    title: "The Scroll of Doom",
    description: "You saw it on TikTok at 2am. You saved it. Now it's gone forever, buried under 500 other videos.",
  },
  {
    icon: ImageSquare,
    title: "Screenshot Roulette",
    description: "Your camera roll is a mess of recipes, memes, and receipts. Good luck finding that lasagna.",
  },
  {
    icon: Browsers,
    title: "Tab Purgatory",
    description: "15 tabs open. 3 different apps. And you still can't remember where you saw that chicken recipe.",
  },
  {
    icon: ChatCircleDots,
    title: "The 'Send Me That' Void",
    description: "Your friend sent it on Instagram. Or was it iMessage? You'll never find it again.",
  },
];

export default function Problem() {
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
          But first, let's talk about why you need this...
        </motion.p>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-stone-100 text-stone-600 text-sm font-medium mb-6">
            Sound familiar?
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text-heading leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Your recipes are{" "}
            <span className="italic text-stone-500">everywhere.</span>
          </h2>
          <p className="mt-6 text-xl text-text-body max-w-2xl mx-auto">
            You've saved hundreds of amazing recipes. But when you're hungry and ready to cook, you can't find a single one.
          </p>
        </motion.div>

        {/* Pain points grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
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
                      <point.icon size={24} weight="duotone" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-text-heading mb-3">
                      {point.title}
                    </h3>
                    <p className="text-text-body leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

