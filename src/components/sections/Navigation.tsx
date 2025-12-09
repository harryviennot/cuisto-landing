"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { List, X } from "@phosphor-icons/react";
import Button from "../ui/Button";
import LanguageSwitcher from "../ui/LanguageSwitcher";

export default function Navigation() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = pathname === "/" || pathname === "";

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToFinalCTA = () => {
    scrollToSection("final-cta");
  };

  const navItems = [
    { label: t("howItWorks"), id: "how-it-works" },
    { label: t("features"), id: "features" },
    { label: t("story"), id: "story" },
  ];

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
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-soft group-hover:shadow-medium transition-shadow duration-300 p-2">
                    <img
                      src="/images/cuisto-logo.png"
                      alt="Cuisto"
                      className="w-full h-full object-contain brightness-0 invert"
                    />
                  </div>
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-xl bg-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                </div>
                <span
                  className="text-xl font-semibold text-text-heading tracking-tight hidden sm:block"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Cuisto
                </span>
              </motion.a>

              {/* Navigation Links - Desktop (lg+: all items, md-lg: only Recipes & Blog) */}
              <div className="hidden md:flex items-center gap-8">
                {/* Section links only visible on large screens */}
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="hidden lg:block text-sm font-medium text-text-body hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                <Link
                  href="/recipes"
                  className="text-sm font-medium text-text-body hover:text-primary transition-colors"
                >
                  {t("recipes")}
                </Link>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-text-body hover:text-primary transition-colors"
                >
                  {t("blog")}
                </Link>
              </div>

              {/* Right side: different layouts for mobile vs desktop */}
              <div className="flex items-center gap-3">
                {/* Desktop: Language Switcher + CTA */}
                <div className="hidden md:flex items-center gap-3">
                  <LanguageSwitcher />
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
                    {t("getEarlyAccess")}
                  </Button>
                </div>

                {/* Mobile: Only burger menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-text-body hover:text-primary transition-colors"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {isMobileMenuOpen ? (
                    <X size={24} weight="bold" />
                  ) : (
                    <List size={24} weight="bold" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-surface-elevated z-50 md:hidden shadow-elevated"
            >
              {/* Close Button */}
              <div className="flex justify-end p-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-text-body hover:text-primary transition-colors"
                  aria-label="Close menu"
                >
                  <X size={24} weight="bold" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="px-6 py-4 flex flex-col h-[calc(100%-72px)]">
                <div className="flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left py-3 px-4 text-base font-medium text-text-body hover:text-primary hover:bg-surface-hover rounded-xl transition-colors"
                    >
                      {item.label}
                    </motion.button>
                  ))}

                  <div className="h-px bg-border my-2" />

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <Link
                      href="/recipes"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-base font-medium text-text-body hover:text-primary hover:bg-surface-hover rounded-xl transition-colors"
                    >
                      {t("recipes")}
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      href="/blog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 px-4 text-base font-medium text-text-body hover:text-primary hover:bg-surface-hover rounded-xl transition-colors"
                    >
                      {t("blog")}
                    </Link>
                  </motion.div>
                </div>

                {/* Bottom section: Language + CTA */}
                <div className="mt-auto pt-6 border-t border-border">
                  {/* Language Switcher */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-4 flex justify-center"
                  >
                    <LanguageSwitcher />
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Button
                      variant="primary"
                      size="md"
                      onClick={scrollToFinalCTA}
                      className="w-full justify-center"
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
                      {t("getEarlyAccess")}
                    </Button>
                  </motion.div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
