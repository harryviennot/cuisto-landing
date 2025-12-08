"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  LinkedinLogoIcon
} from "@phosphor-icons/react";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/in/harry-viennot/",
      icon: (
        <LinkedinLogoIcon className="w-5 h-5" />
      ),
    },
    // {
    //   name: "Instagram",
    //   href: "https://instagram.com/cuistudio",
    //   icon: (
    //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    //     </svg>
    //   ),
    // },
    // {
    //   name: "TikTok",
    //   href: "https://tiktok.com/@cuistudio",
    //   icon: (
    //     <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    //       <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    //     </svg>
    //   ),
    // },
  ];

  return (
    <footer className="relative bg-forest-950 text-white overflow-hidden">
      {/* Gradient overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-500/50 to-transparent" />

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-terracotta-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Main footer content */}
        <div className="py-16 sm:py-20">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-forest-600 flex items-center justify-center shadow-lg p-2">
                  <img
                    src="/images/cuisto-logo.png"
                    alt="Cuisto"
                    className="w-full h-full object-contain brightness-0 invert"
                  />
                </div>
                <span
                  className="text-2xl font-semibold text-white"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Cuisto
                </span>
              </div>
              <p className="text-forest-300 max-w-xs">
                {t("tagline")}
                <br />
                {t("tagline2")}
              </p>
            </motion.div>

            {/* Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap items-center justify-center gap-8"
            >
              <Link
                href="/recipes"
                className="text-forest-300 hover:text-white transition-colors duration-300"
              >
                {t("recipes")}
              </Link>
              <Link
                href="/blog"
                className="text-forest-300 hover:text-white transition-colors duration-300"
              >
                {t("blog")}
              </Link>
              <a
                href="mailto:harry@cuisto.app"
                className="text-forest-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
              >
                <svg
                  className="w-4 h-4 transition-transform group-hover:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {t("contact")}
              </a>
              <Link
                href="/privacy"
                className="text-forest-300 hover:text-white transition-colors duration-300"
              >
                {t("privacy")}
              </Link>
              <Link
                href="/terms"
                className="text-forest-300 hover:text-white transition-colors duration-300"
              >
                {t("terms")}
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-11 h-11 rounded-full bg-forest-900/50 hover:bg-forest-800 flex items-center justify-center text-forest-400 hover:text-white transition-all duration-300 border border-forest-800 hover:border-forest-700"
                  aria-label={social.name}
                >
                  <span className="transition-transform group-hover:scale-110">
                    {social.icon}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-forest-800/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-forest-400"
            >
              {currentYear} {t("copyright")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-forest-500 flex items-center gap-2"
            >
              {t("builtWith")}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                className="text-terracotta-400"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </motion.span>
              {t("by")}{" "}
              <span className="text-forest-300 font-medium">Harry Viennot</span>
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
