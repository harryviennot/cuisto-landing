"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

interface WaitlistFormProps {
  className?: string;
  buttonText?: string;
  source?: string;
  variant?: "default" | "minimal";
}

export default function WaitlistForm({
  className = "",
  buttonText = "Get Early Access",
  source = "landing",
  variant = "default",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={className}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-50 to-forest-100 p-8 text-center">
          {/* Celebratory background */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-primary"
                initial={{
                  x: "50%",
                  y: "50%",
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="relative"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
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
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </svg>
            </div>
            <h3
              className="text-2xl font-bold text-text-heading mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              You're in!
            </h3>
            <p className="text-text-body">{message}</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* Input container with premium styling */}
      <div
        className={`
          relative flex flex-col sm:flex-row gap-3 p-2
          rounded-2xl bg-surface-elevated
          border transition-all duration-500 ease-out
          ${isFocused
            ? "border-primary shadow-[0_0_0_4px_rgba(51,77,67,0.1),0_8px_32px_-8px_rgba(51,77,67,0.2)]"
            : "border-border shadow-medium"
          }
        `}
      >
        {/* Email input */}
        <div className="relative flex-1">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="
              w-full px-5 py-4 sm:py-3
              bg-transparent
              text-text-heading placeholder:text-text-muted
              text-base
              focus:outline-none
              rounded-xl
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
          {buttonText}
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

    </form>
  );
}
