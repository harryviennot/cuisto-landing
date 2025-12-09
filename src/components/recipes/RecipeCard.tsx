"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Bookmark, Fire, Users } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import type { RecipeListItem, DifficultyLevel } from "@/types/recipe";

interface Props {
  recipe: RecipeListItem;
  locale: string;
  translations: {
    minutes: string;
    easy: string;
    medium: string;
    hard: string;
  };
}

export default function RecipeCard({ recipe, locale, translations: t }: Props) {
  // Map difficulty to color dot
  const difficultyDotColors: Record<DifficultyLevel, string> = {
    easy: "bg-primary",
    medium: "bg-yellow-400",
    hard: "bg-rose-400",
  };

  const difficultyLabels: Record<DifficultyLevel, string> = {
    easy: t.easy,
    medium: t.medium,
    hard: t.hard,
  };

  const totalTime =
    recipe.total_time_minutes ||
    (recipe.prep_time_minutes || 0) + (recipe.cook_time_minutes || 0);

  // Get category or first tag (fallback to 'Recipe')
  const categoryLabel =
    (recipe.categories && recipe.categories[0]) ||
    (recipe.tags && recipe.tags[0]) ||
    "RECIPE";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <Link
        href={`/${locale}/recipes/${recipe.slug || recipe.id}`}
        className="group block relative active:opacity-90"
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200 shadow-sm">
          {recipe.image_url ? (
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-100">
              <span className="text-stone-400 text-sm">No Image</span>
            </div>
          )}


          {/* Optional: Stats Badge if needed, sticking to mobile visual for now */}
        </div>

        {/* Content Area - Minimalist & Editorial */}
        <div className="mt-3 px-1">
          {/* Category and Rating Row */}
          <div className="flex flex-row items-center justify-between mb-1">
            <span className="text-xs font-bold tracking-widest uppercase text-stone-400">
              {categoryLabel}
            </span>

            {/* Rating Badge */}
            {recipe.average_rating && recipe.average_rating > 0 && (
              <div className="flex flex-row items-center gap-0.5">
                <span className="text-yellow-500 text-xs">★</span>
                <span className="text-xs font-medium text-stone-500">
                  {recipe.average_rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-playfair text-xl font-bold leading-tight text-stone-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>

          {/* Meta Row */}
          <div className="flex flex-row items-center gap-3">
            {/* Time */}
            {totalTime > 0 && (
              <div className="flex flex-row items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" weight="regular" />
                <span className="text-[11px] font-medium tracking-wide text-stone-500">
                  {totalTime} {t.minutes}
                </span>
              </div>
            )}

            {totalTime > 0 && recipe.difficulty && (
              <div className="w-px h-2 bg-stone-300" />
            )}

            {/* Difficulty */}
            {recipe.difficulty && (
              <div className="flex flex-row items-center gap-1">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${difficultyDotColors[recipe.difficulty]
                    }`}
                />
                <span className="text-[11px] font-medium tracking-wide text-stone-500">
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
