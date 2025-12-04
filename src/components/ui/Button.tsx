"use client";

import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "ref" | "children"> {
  children?: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "left",
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center
      font-medium tracking-tight
      rounded-full
      transition-all duration-500 ease-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none
      overflow-hidden
    `;

    const variants = {
      primary: `
        bg-primary text-white
        shadow-[0_2px_8px_-2px_rgba(51,77,67,0.3),0_4px_16px_-4px_rgba(51,77,67,0.2)]
        hover:shadow-[0_8px_20px_-4px_rgba(51,77,67,0.4),0_12px_28px_-8px_rgba(51,77,67,0.25)]
        hover:bg-forest-600
        focus-visible:ring-primary
        active:scale-[0.98]
        btn-premium
      `,
      secondary: `
        bg-surface-elevated text-text-heading
        border border-border
        shadow-soft
        hover:shadow-medium hover:border-border-dark
        hover:bg-white
        focus-visible:ring-border-dark
        active:scale-[0.98]
      `,
      ghost: `
        bg-transparent text-text-body
        hover:bg-brown-100 hover:text-text-heading
        focus-visible:ring-border
        active:scale-[0.98]
      `,
      outline: `
        bg-transparent text-primary
        border-2 border-primary
        hover:bg-primary hover:text-white
        focus-visible:ring-primary
        active:scale-[0.98]
      `,
    };

    const sizes = {
      sm: "px-5 py-2.5 text-sm gap-2",
      md: "px-7 py-3.5 text-base gap-2.5",
      lg: "px-9 py-4.5 text-lg gap-3",
    };

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        {/* Shimmer effect for primary */}
        {variant === "primary" && (
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </span>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Icon left */}
        {icon && iconPosition === "left" && !isLoading && (
          <span className="flex-shrink-0">{icon}</span>
        )}

        {/* Content */}
        <span className="relative z-10">{children}</span>

        {/* Icon right */}
        {icon && iconPosition === "right" && !isLoading && (
          <span className="flex-shrink-0">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
