"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, DeviceMobile, Share } from "@phosphor-icons/react";
import type { Recipe } from "@/types/recipe";
import RecipeRating from "./RecipeRating";
import RecipeMetadata from "./RecipeMetadata";
import IngredientsList from "./IngredientsList";
import InstructionsList from "./InstructionsList";
import Button from "../ui/Button";

interface Props {
  recipe: Recipe;
  locale: string;
  translations: {
    backToRecipes: string;
    prepTime: string;
    cookTime: string;
    totalTime: string;
    servings: string;
    difficulty: string;
    timesCookedBy: string;
    easy: string;
    medium: string;
    hard: string;
    minutes: string;
    ingredients: string;
    instructions: string;
    stepPrefix: string;
    getTheApp: string;
    getTheAppDescription: string;
    share: string;
    sourceLabel: string;
  };
}

export default function RecipeDetail({ recipe, locale, translations: t }: Props) {
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.title,
          text: recipe.description || `Check out this recipe: ${recipe.title}`,
          url,
        });
      } catch {
        // User cancelled or error
      }
    } else if (navigator.clipboard?.writeText) {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        // Clipboard access denied
      }
    }
  };

  return (
    <article className="max-w-4xl mx-auto">
      {/* Back link */}
      <Link
        href={`/${locale}/recipes`}
        className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToRecipes}</span>
      </Link>

      {/* Recipe Header */}
      <header className="mb-8">
        {/* Image */}
        {recipe.image_url && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-6 bg-brown-100">
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>
        )}

        {/* Title and metadata */}
        <div className="space-y-4">
          <h1
            className="text-3xl md:text-4xl font-bold text-text-heading"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {recipe.title}
          </h1>

          {/* Rating */}
          <RecipeRating
            rating={recipe.average_rating}
            ratingCount={recipe.rating_count}
            size="lg"
          />

          {/* Description */}
          {recipe.description && (
            <p className="text-lg text-text-body leading-relaxed">
              {recipe.description}
            </p>
          )}

          {/* Metadata */}
          <RecipeMetadata
            prepTime={recipe.prep_time_minutes}
            cookTime={recipe.cook_time_minutes}
            totalTime={recipe.total_time_minutes}
            servings={recipe.servings}
            difficulty={recipe.difficulty}
            timesCooked={recipe.total_times_cooked}
            translations={t}
          />

          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/${locale}/recipes?tag=${encodeURIComponent(tag)}`}
                  className="px-3 py-1 bg-brown-100 text-text-body text-sm rounded-full hover:bg-brown-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          {/* Share button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary transition-colors"
          >
            <Share className="w-4 h-4" />
            <span>{t.share}</span>
          </button>
        </div>
      </header>

      {/* Recipe Content */}
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12">
        {/* Ingredients (sidebar on desktop) */}
        <aside className="md:sticky md:top-24 md:self-start">
          <div className="bg-surface-elevated rounded-xl p-6 border border-border">
            <IngredientsList
              ingredients={recipe.ingredients}
              title={t.ingredients}
            />
          </div>
        </aside>

        {/* Instructions */}
        <div>
          <InstructionsList
            instructions={recipe.instructions}
            title={t.instructions}
            stepPrefix={t.stepPrefix}
          />

          {/* Source attribution */}
          {recipe.source_url && (
            <div className="mt-8 p-4 bg-brown-50 rounded-lg">
              <p className="text-sm text-text-muted">
                {t.sourceLabel}:{" "}
                <a
                  href={recipe.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {new URL(recipe.source_url).hostname}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* App CTA */}
      <div className="mt-12 p-8 bg-gradient-to-r from-primary/10 to-forest-100 rounded-2xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <DeviceMobile className="w-8 h-8 text-white" weight="fill" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-semibold text-text-heading mb-2">
              {t.getTheApp}
            </h3>
            <p className="text-text-body">{t.getTheAppDescription}</p>
          </div>
          <div className="flex-shrink-0">
            <Button
              variant="primary"
              onClick={() => {
                document.getElementById("final-cta")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t.getTheApp}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
