"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, ChefHat } from "@phosphor-icons/react";
import { motion } from "framer-motion";
import type { RecipeListItem, DifficultyLevel } from "@/types/recipe";
import RecipeRating from "./RecipeRating";

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
  const difficultyColors: Record<DifficultyLevel, string> = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-amber-100 text-amber-700",
    hard: "bg-red-100 text-red-700",
  };

  const difficultyLabels: Record<DifficultyLevel, string> = {
    easy: t.easy,
    medium: t.medium,
    hard: t.hard,
  };

  const totalTime = recipe.total_time_minutes || recipe.prep_time_minutes || recipe.cook_time_minutes;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link
        href={`/${locale}/recipes/${recipe.slug || recipe.id}`}
        className="block bg-surface-elevated rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] bg-brown-100 overflow-hidden">
          {recipe.image_url ? (
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <ChefHat className="w-12 h-12 text-brown-300" weight="thin" />
            </div>
          )}

          {/* Difficulty badge */}
          {recipe.difficulty && (
            <div
              className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium ${difficultyColors[recipe.difficulty]}`}
            >
              {difficultyLabels[recipe.difficulty]}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-text-heading line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>

          {/* Rating */}
          <RecipeRating
            rating={recipe.average_rating}
            ratingCount={recipe.rating_count}
            size="sm"
          />

          {/* Meta */}
          <div className="flex items-center gap-3 mt-3 text-sm text-text-muted">
            {totalTime && (
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  {totalTime} {t.minutes}
                </span>
              </div>
            )}
          </div>

          {/* Tags preview */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {recipe.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-brown-100 text-text-muted text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
