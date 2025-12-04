"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  MagicWand,
  CookingPot,
  Playlist,
  SlidersHorizontal,
} from "@phosphor-icons/react";

const features = [
  {
    icon: MagicWand,
    title: "Universal Import",
    description: "TikToks, Reels, screenshots, or grandma's handwritten notes. If it's a recipe, we can read it.",
    className: "md:col-span-2 bg-stone-900 text-white",
    iconBg: "bg-white/10",
    iconColor: "text-white",
    descriptionColor: "text-stone-300",
  },
  {
    icon: CookingPot,
    title: "Cooking Mode",
    description: "No more unlocking your phone with floury hands. Screen stays on, timers are built-in.",
    className: "md:col-span-1 bg-white border border-stone-200",
    iconBg: "bg-stone-100",
    iconColor: "text-stone-700",
    descriptionColor: "text-stone-600",
  },
  {
    icon: Playlist,
    title: "The Spotify of Food",
    description: "Organize recipes into collections. 'Weeknight Dinners', 'Date Night', 'Sunday Prep'.",
    className: "md:col-span-1 bg-[#E8E6E1]",
    iconBg: "bg-stone-900/5",
    iconColor: "text-stone-600",
    descriptionColor: "text-stone-600",
  },
  {
    icon: SlidersHorizontal,
    title: "Make It Yours",
    description: "Scale ingredients, swap substitutes, and add your own notes. It's your cookbook now.",
    className: "md:col-span-2 bg-primary text-white",
    iconBg: "bg-white/10",
    iconColor: "text-white",
    descriptionColor: "text-white/70",
  },
];

export default function Features() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="features" className="relative py-24 sm:py-32 bg-surface">
      <div ref={containerRef} className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold text-text-heading leading-tight mb-6"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Built for the <br />
            <span className="text-primary italic">modern home cook.</span>
          </h2>
          <p className="text-xl text-text-body max-w-xl">
            We stripped away the clutter, the ads, and the life stories.
            Just powerful tools to help you cook better.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-3xl p-8 flex flex-col justify-between min-h-[240px] ${feature.className}`}
            >
              <div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 ${feature.iconBg}`}>
                  <feature.icon size={24} weight="duotone" className={feature.iconColor} />
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className={`text-lg leading-relaxed ${feature.descriptionColor}`}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
