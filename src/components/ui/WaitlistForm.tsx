"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Button from "./Button";

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
}

interface WaitlistFormProps {
  className?: string;
  buttonText?: string;
  source?: string;
  variant?: "default" | "minimal";
}

export default function WaitlistForm({
  className = "",
  buttonText,
  source = "landing",
  variant = "default",
}: WaitlistFormProps) {
  const t = useTranslations("waitlistForm");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [utmParams, setUtmParams] = useState<UTMParams>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const displayButtonText = buttonText || t("defaultButton");

  // Capture UTM parameters from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get("utm_source") || undefined,
      utm_medium: params.get("utm_medium") || undefined,
      utm_campaign: params.get("utm_campaign") || undefined,
      referrer: document.referrer || undefined,
    });
  }, []);

  // Trigger confetti animation on success
  useEffect(() => {
    if (status === "success") {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage(t("errorInvalidEmail"));
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, ...utmParams }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || t("successMessage"));
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || t("errorGeneric"));
      }
    } catch {
      setStatus("error");
      setMessage(t("errorGeneric"));
    }
  };

  // Confetti particle component
  const ConfettiParticle = ({ delay, x }: { delay: number; x: number }) => (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        background: ["#334D43", "#D4A574", "#E8DED1", "#8B9D83"][Math.floor(Math.random() * 4)],
        left: `${x}%`,
        top: "50%",
      }}
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{
        opacity: [1, 1, 0],
        y: [0, -60 - Math.random() * 40],
        x: [(Math.random() - 0.5) * 80],
        scale: [1, 0.8, 0.4],
        rotate: [0, Math.random() * 360],
      }}
      transition={{
        duration: 1.2,
        delay,
        ease: "easeOut",
      }}
    />
  );

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            {/* Confetti particles */}
            {showConfetti && (
              <div className="absolute inset-0 overflow-visible pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <ConfettiParticle key={i} delay={i * 0.05} x={20 + (i * 5)} />
                ))}
              </div>
            )}

            {/* Success container - same styling as the form container */}
            <div className="relative rounded-2xl bg-surface-elevated border border-primary/30 shadow-[0_0_0_4px_rgba(51,77,67,0.08)] p-2 overflow-hidden">
              {/* Subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-forest-50/50 to-transparent pointer-events-none" />

              <div className="relative flex flex-col sm:flex-row items-center gap-4 px-4 py-3">
                {/* Animated checkmark circle */}
                <motion.div
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.1
                  }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <motion.path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    />
                  </svg>
                </motion.div>

                {/* Text content */}
                <div className="flex-1 text-center sm:text-left">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg font-bold text-text-heading"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {t("successTitle")}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-sm text-text-body mt-0.5"
                  >
                    {message}
                  </motion.p>
                </div>

                {/* Decorative element */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="hidden sm:flex items-center gap-1 text-primary"
                >
                  <span className="text-2xl">🎉</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {/* Input container with premium styling */}
            <div
              className={`
                relative flex flex-col sm:flex-row sm:items-center gap-3 p-2
                rounded-2xl bg-surface-elevated
                border transition-all duration-500 ease-out
                ${isFocused
                  ? "border-primary shadow-[0_0_0_4px_rgba(51,77,67,0.1),0_8px_32px_-8px_rgba(51,77,67,0.2)]"
                  : "border-border shadow-medium"
                }
              `}
            >
              {/* Email input */}
              <div className="relative flex-1 min-w-0">
                <input
                  type="email"
                  placeholder={t("placeholder")}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="
                    w-full px-4 py-4 sm:py-3
                    bg-transparent
                    text-text-heading placeholder:text-text-muted
                    text-base leading-normal
                    focus:outline-none
                    rounded-xl
                    truncate
                  "
                />
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={status === "loading"}
                className="sm:w-auto w-full whitespace-nowrap"
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
                {displayButtonText}
              </Button>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 text-sm text-terracotta-500 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
