"use client";

/**
 * CategoryChip - Category filter chip component
 *
 * Displays a category as a clickable pill with icon and label.
 * Matches the mobile app's CategoryChip design.
 */
import {
  SquaresFourIcon,
  ForkKnifeIcon,
  BowlSteamIcon,
  LeafIcon,
  BowlFoodIcon,
  HamburgerIcon,
  ShrimpIcon,
  CheeseIcon,
  IceCreamIcon,
  BreadIcon,
  BeerSteinIcon,
  MartiniIcon,
  CoffeeIcon,
  CarrotIcon,
  DropIcon,
  CookieIcon,
  FireIcon,
  type Icon,
} from "@phosphor-icons/react";

/**
 * Category slug to icon mapping
 * Uses Phosphor icons that best match each category
 */
export const CATEGORY_ICONS: Record<string, Icon> = {
  all: SquaresFourIcon,
  "main-dishes": ForkKnifeIcon,
  soups: BowlSteamIcon,
  salads: LeafIcon,
  "pasta-noodles": BowlFoodIcon,
  sandwiches: HamburgerIcon,
  appetizers: ShrimpIcon,
  apero: CheeseIcon,
  desserts: IceCreamIcon,
  "baked-goods": BreadIcon,
  beverages: BeerSteinIcon,
  cocktails: MartiniIcon,
  breakfast: CoffeeIcon,
  sides: CarrotIcon,
  "sauces-dips": DropIcon,
  snacks: CookieIcon,
  grilled: FireIcon,
  "bowls-grains": BowlFoodIcon,
};

interface CategoryChipProps {
  /** Category slug */
  slug: string;
  /** Display label */
  label: string;
  /** Whether this chip is currently selected */
  isActive: boolean;
  /** Click handler */
  onClick: () => void;
}

export function CategoryChip({
  slug,
  label,
  isActive,
  onClick,
}: CategoryChipProps) {
  const IconComponent = CATEGORY_ICONS[slug] || SquaresFourIcon;

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full
        text-sm font-semibold whitespace-nowrap
        transition-all duration-200
        bg-white border flex-grow
        ${
          isActive
            ? "border-primary bg-primary/10"
            : "border-stone-200 hover:border-stone-300"
        }
      `}
      style={{
        boxShadow: "0 2px 8px rgba(44, 36, 22, 0.08)",
      }}
    >
      <IconComponent
        size={16}
        weight={isActive ? "fill" : "bold"}
        className={isActive ? "text-primary" : "text-stone-400"}
      />
      <span className={isActive ? "text-primary" : "text-stone-500"}>
        {label}
      </span>
    </button>
  );
}

/**
 * Standalone category badge for recipe cards/detail pages
 */
interface RecipeCategoryBadgeProps {
  slug: string;
  label: string;
  onClick?: () => void;
}

export function RecipeCategoryBadge({
  slug,
  label,
  onClick,
}: RecipeCategoryBadgeProps) {
  const IconComponent = CATEGORY_ICONS[slug] || SquaresFourIcon;

  const content = (
    <>
      <IconComponent size={14} weight="regular" className="text-stone-500" />
      <span>{label}</span>
    </>
  );

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-medium hover:bg-stone-200 transition-colors"
      >
        {content}
      </button>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 text-xs font-medium">
      {content}
    </span>
  );
}
