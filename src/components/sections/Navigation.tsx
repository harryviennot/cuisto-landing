"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setIsScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToFinalCTA = () => {
    document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
        `}
      >
        <div className="mx-4 sm:mx-6 lg:mx-8 mt-4">
          <div
            className={`
              max-w-5xl mx-auto px-6 sm:px-8
              rounded-2xl
              transition-all duration-500 ease-out
              ${isScrolled
                ? "bg-surface-elevated/80 backdrop-blur-xl shadow-elevated border border-border/50 py-3"
                : "bg-transparent py-4"
              }
            `}
          >
            <div className="flex items-center justify-between">
              {/* Logo */}
              <motion.a
                href="/"
                className="flex items-center gap-3 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft group-hover:shadow-medium transition-shadow duration-300">
                    <span
                      className="text-white font-bold text-lg"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      C
                    </span>
                  </div>
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                </div>
                <span
                  className="text-xl font-semibold text-text-heading tracking-tight hidden sm:block"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Cuistudio
                </span>
              </motion.a>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center gap-8">
                {["How it works", "Features", "Story"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const id = item.toLowerCase().replace(/\s+/g, "-");
                      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm font-medium text-text-body hover:text-primary transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                variant="primary"
                size="sm"
                onClick={scrollToFinalCTA}
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                }
                iconPosition="right"
              >
                Get Early Access
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  );
}
