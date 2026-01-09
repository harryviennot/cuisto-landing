"use client";

/**
 * RecipeDiscoveryCard - Compact recipe card for horizontal sections
 *
 * A smaller version of RecipeCard optimized for horizontal scroll sections.
 * Fixed width of 280px matching the mobile app.
 */
import Image from "next/image";
import Link from "next/link";
import { Clock, Fire, Users } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import type { RecipeListItem, DifficultyLevel } from "@/types/recipe";
import type { StatsBadge } from "@/types/discovery";
import { DISCOVERY_CONSTANTS } from "@/types/discovery";
import { formatDurationCompact } from "@/lib/format";

interface RecipeDiscoveryCardProps {
  recipe: RecipeListItem;
  locale: string;
  index?: number;
  /** Optional stats badge (cooking count or extraction count) */
  statsBadge?: StatsBadge;
  translations: {
    minutes: string;
    easy: string;
    medium: string;
    hard: string;
    cookedTimes?: string;
    savedTimes?: string;
  };
  categoryTranslations: Record<string, string>;
}

export function RecipeDiscoveryCard({
  recipe,
  locale,
  index = 0,
  statsBadge,
  translations: t,
  categoryTranslations,
}: RecipeDiscoveryCardProps) {
  const totalTime =
    recipe.total_time_minutes ||
    (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);

  const categoryLabel = recipe.category?.slug
    ? categoryTranslations[recipe.category.slug] || recipe.category.slug
    : (recipe.tags && recipe.tags[0]) || "";

  const difficultyLabels: Record<DifficultyLevel, string> = {
    easy: t.easy,
    medium: t.medium,
    hard: t.hard,
  };

  const difficultyColors: Record<DifficultyLevel, string> = {
    easy: "bg-primary",
    medium: "bg-yellow-400",
    hard: "bg-rose-400",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      style={{ width: DISCOVERY_CONSTANTS.CARD_WIDTH }}
    >
      <Link
        href={`/${locale}/recipes/${recipe.slug || recipe.id}`}
        className="group block"
      >
        {/* Image Container */}
        <div
          className="relative w-full overflow-hidden rounded-xl bg-stone-200 shadow-sm"
          style={{ height: DISCOVERY_CONSTANTS.CARD_IMAGE_HEIGHT }}
        >
          {recipe.image_url ? (
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="280px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-100">
              <span className="text-stone-400 text-sm">No Image</span>
            </div>
          )}

          {/* Stats Badge (top-right corner) */}
          {statsBadge && statsBadge.count > 0 && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-full">
              {statsBadge.type === "cooking" ? (
                <Fire size={14} weight="fill" className="text-orange-400" />
              ) : (
                <Users size={14} weight="fill" className="text-blue-400" />
              )}
              <span className="text-xs font-semibold text-white">
                {statsBadge.count}
              </span>
            </div>
          )}

          {/* Rating Badge (bottom-left corner) */}
          {recipe.average_rating && recipe.average_rating > 0 && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
              <span className="text-yellow-400 text-xs">★</span>
              <span className="text-xs font-medium text-white">
                {recipe.average_rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="mt-3 px-0.5">
          {/* Category */}
          {categoryLabel && (
            <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400 line-clamp-1">
              {categoryLabel}
            </span>
          )}

          {/* Title */}
          <h3 className="font-playfair text-base font-bold leading-tight text-stone-800 mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>

          {/* Meta Row */}
          <div className="flex items-center gap-2 mt-2">
            {/* Time */}
            {totalTime > 0 && (
              <div className="flex items-center gap-1">
                <Clock size={12} className="text-stone-400" weight="regular" />
                <span className="text-[10px] font-medium text-stone-500">
                  {formatDurationCompact(totalTime)}
                </span>
              </div>
            )}

            {/* Divider */}
            {totalTime > 0 && recipe.difficulty && (
              <div className="w-px h-2.5 bg-stone-300" />
            )}

            {/* Difficulty */}
            {recipe.difficulty && (
              <div className="flex items-center gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${difficultyColors[recipe.difficulty]}`}
                />
                <span className="text-[10px] font-medium text-stone-500">
                  {difficultyLabels[recipe.difficulty]}
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

/**
 * Skeleton component for RecipeDiscoveryCard
 */
export function RecipeDiscoveryCardSkeleton() {
  return (
    <div
      className="animate-pulse"
      style={{ width: DISCOVERY_CONSTANTS.CARD_WIDTH }}
    >
      <div
        className="bg-stone-200 rounded-xl"
        style={{ height: DISCOVERY_CONSTANTS.CARD_IMAGE_HEIGHT }}
      />
      <div className="mt-3 space-y-2 px-0.5">
        <div className="h-2 bg-stone-200 rounded w-1/3" />
        <div className="h-4 bg-stone-200 rounded w-full" />
        <div className="h-4 bg-stone-200 rounded w-2/3" />
        <div className="h-2.5 bg-stone-200 rounded w-1/2" />
      </div>
    </div>
  );
}
