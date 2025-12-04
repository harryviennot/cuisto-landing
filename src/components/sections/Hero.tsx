"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import WaitlistForm from "../ui/WaitlistForm";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  const t = useTranslations("hero");
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Disable parallax effects on mobile
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, isMobile ? 1 : 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-surface"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Gradient blur */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px]" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(51,77,67,1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(51,77,67,1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="w-full pt-28 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Mobile: Flex column with custom order | Desktop: 2-column grid */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Text Content - Top section (Badge, Headline, Subheadline) */}
            <div className="text-center lg:text-left order-1">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center lg:justify-start mb-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated border border-border shadow-soft">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-sm font-medium text-text-body">
                    {t("badge")}
                  </span>
                </div>
              </motion.div>

              {/* Main headline */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl font-bold text-text-heading leading-[0.95] tracking-tight"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  <span className="block">{t("headline1")}</span>
                  <span className="block mt-2">
                    {t("headline2")}{" "}
                    <span className="relative inline-block">
                      <span className="relative z-10 italic text-primary">{t("headline2Highlight")}</span>
                      <motion.span
                        className="absolute -bottom-2 left-0 right-0 h-3 bg-forest-100 -z-0 rounded-sm"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                        style={{ originX: 0 }}
                      />
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-8 text-xl text-text-body leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                {t("subheadline")}{" "}
                <span className="text-text-heading font-medium">{t("subheadlineHighlight")}</span>.
              </motion.p>

              {/* Desktop only: Waitlist form and trust indicators */}
              <div className="hidden lg:block">
                {/* Waitlist form */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  id="waitlist"
                  className="mt-10 max-w-md"
                >
                  <WaitlistForm source="hero" buttonText={t("buttonText")} />
                </motion.div>

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mt-12 flex items-center gap-4"
                >
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 border-surface bg-gradient-to-br from-forest-100 to-forest-200 flex items-center justify-center"
                      >
                        <span className="text-[10px] font-medium text-primary">
                          {String.fromCharCode(64 + i)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-text-muted">
                    <span className="font-medium text-text-heading">{t("earlyTesters")}</span> {t("joinedThisWeek")}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Visual Content - Shows after subheadline on mobile, side-by-side on desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="order-2 relative z-10"
            >
              <div className="relative">
                {/* Decorative blob behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-surface-texture-medium/50 to-surface-texture-light/50 rounded-full blur-3xl -z-10" />
                <HeroVisual />
              </div>
            </motion.div>

            {/* Mobile only: Waitlist form and trust indicators (after visual) */}
            <div className="order-3 lg:hidden text-center w-full">
              {/* Waitlist form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                id="waitlist-mobile"
                className="mt-2 max-w-md mx-auto"
              >
                <WaitlistForm source="hero" buttonText={t("buttonText")} />
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="mt-12 flex items-center justify-center gap-4"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-surface bg-gradient-to-br from-forest-100 to-forest-200 flex items-center justify-center"
                    >
                      <span className="text-[10px] font-medium text-primary">
                        {String.fromCharCode(64 + i)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-text-muted">
                  <span className="font-medium text-text-heading">100+ early testers</span> joined this week
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* Scroll indicator - hidden on mobile where content extends beyond viewport */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-text-muted"
        >
          <span className="text-xs tracking-widest uppercase">{t("discover")}</span>
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
