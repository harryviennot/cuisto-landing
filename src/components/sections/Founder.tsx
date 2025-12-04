"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, EnvelopeSimple } from "@phosphor-icons/react";

export default function Founder() {
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
                <p className="text-white font-bold text-lg">Harry Viennot</p>
                <p className="text-stone-300 text-sm">Founder & Developer</p>
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
              Why I'm building Cuistudio
            </h2>

            <div className="space-y-6 text-lg text-text-body leading-relaxed">
              <p>
                Like you, I've saved hundreds of recipes. TikToks, Instagram Reels, random screenshots, and browser tabs I'll never find again.
              </p>
              <p>
                One night, I spent 30 minutes scrolling through my camera roll looking for a specific pasta recipe. I knew I had it. I just couldn't find it.
              </p>
              <p>
                That was the moment Cuistudio was born. I wanted to build one beautiful place for all recipes — organized, searchable, and actually usable when you're standing in the kitchen with messy hands.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-stone-200">
              <p className="font-medium text-text-heading mb-4">
                Have a feature request or just want to say hi?
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

