"use client";

/**
 * DiscoverySections
 *
 * Discovery section components for the recipes page.
 * Each section uses the generic HorizontalPreviewSection component.
 */
import React from "react";
import { HorizontalPreviewSection } from "@/components/ui/HorizontalPreviewSection";
import {
  RecipeDiscoveryCard,
  RecipeDiscoveryCardSkeleton,
} from "@/components/recipes/RecipeDiscoveryCard";
import type { RecipeListItem } from "@/types/recipe";
import type { TrendingRecipe, ExtractedRecipe } from "@/types/discovery";
import { DISCOVERY_CONSTANTS } from "@/types/discovery";

interface DiscoverySectionProps {
  locale: string;
  translations: {
    minutes: string;
    easy: string;
    medium: string;
    hard: string;
    seeMore: string;
  };
  categoryTranslations: Record<string, string>;
}

interface TrendingSectionProps extends DiscoverySectionProps {
  data: TrendingRecipe[];
  title: string;
}

interface ExtractedSectionProps extends DiscoverySectionProps {
  data: ExtractedRecipe[];
  title: string;
}

interface RatedSectionProps extends DiscoverySectionProps {
  data: RecipeListItem[];
  title: string;
}

/**
 * Trending This Week section - most cooked recipes
 */
export function TrendingThisWeekSection({
  data,
  title,
  locale,
  translations,
  categoryTranslations,
}: TrendingSectionProps) {
  return (
    <HorizontalPreviewSection<TrendingRecipe>
      title={title}
      data={data}
      renderItem={(recipe, index) => (
        <RecipeDiscoveryCard
          recipe={recipe}
          locale={locale}
          index={index}
          statsBadge={{
            type: "cooking",
            count: recipe.cooking_stats?.cook_count ?? 0,
          }}
          translations={translations}
          categoryTranslations={categoryTranslations}
        />
      )}
      keyExtractor={(recipe) => recipe.id}
      seeMoreText={translations.seeMore}
      minItems={DISCOVERY_CONSTANTS.MIN_SECTION_RECIPES}
      className="mb-10"
    />
  );
}

/**
 * Trending on Socials section - most extracted from video sources
 */
export function TrendingOnSocialsSection({
  data,
  title,
  locale,
  translations,
  categoryTranslations,
}: ExtractedSectionProps) {
  return (
    <HorizontalPreviewSection<ExtractedRecipe>
      title={title}
      data={data}
      renderItem={(recipe, index) => (
        <RecipeDiscoveryCard
          recipe={recipe}
          locale={locale}
          index={index}
          statsBadge={{
            type: "extraction",
            count: recipe.extraction_stats?.extraction_count ?? 0,
          }}
          translations={translations}
          categoryTranslations={categoryTranslations}
        />
      )}
      keyExtractor={(recipe) => recipe.id}
      seeMoreText={translations.seeMore}
      minItems={DISCOVERY_CONSTANTS.MIN_SECTION_RECIPES}
      className="mb-10"
    />
  );
}

/**
 * Popular Recipes Online section - most extracted from website sources
 */
export function PopularOnlineSection({
  data,
  title,
  locale,
  translations,
  categoryTranslations,
}: ExtractedSectionProps) {
  return (
    <HorizontalPreviewSection<ExtractedRecipe>
      title={title}
      data={data}
      renderItem={(recipe, index) => (
        <RecipeDiscoveryCard
          recipe={recipe}
          locale={locale}
          index={index}
          statsBadge={{
            type: "extraction",
            count: recipe.extraction_stats?.extraction_count ?? 0,
          }}
          translations={translations}
          categoryTranslations={categoryTranslations}
        />
      )}
      keyExtractor={(recipe) => recipe.id}
      seeMoreText={translations.seeMore}
      minItems={DISCOVERY_CONSTANTS.MIN_SECTION_RECIPES}
      className="mb-10"
    />
  );
}

/**
 * Highest Rated section - top rated public recipes
 */
export function HighestRatedSection({
  data,
  title,
  locale,
  translations,
  categoryTranslations,
}: RatedSectionProps) {
  return (
    <HorizontalPreviewSection<RecipeListItem>
      title={title}
      data={data}
      renderItem={(recipe, index) => (
        <RecipeDiscoveryCard
          recipe={recipe}
          locale={locale}
          index={index}
          translations={translations}
          categoryTranslations={categoryTranslations}
        />
      )}
      keyExtractor={(recipe) => recipe.id}
      seeMoreText={translations.seeMore}
      minItems={DISCOVERY_CONSTANTS.MIN_SECTION_RECIPES}
      className="mb-10"
    />
  );
}

/**
 * Combined discovery sections container
 * Shows all sections when no category filter is active
 */
interface AllDiscoverySectionsProps {
  trending: TrendingRecipe[];
  socials: ExtractedRecipe[];
  online: ExtractedRecipe[];
  rated: RecipeListItem[];
  locale: string;
  translations: {
    trendingTitle: string;
    socialsTitle: string;
    onlineTitle: string;
    ratedTitle: string;
    minutes: string;
    easy: string;
    medium: string;
    hard: string;
    seeMore: string;
  };
  categoryTranslations: Record<string, string>;
}

export function AllDiscoverySections({
  trending,
  socials,
  online,
  rated,
  locale,
  translations,
  categoryTranslations,
}: AllDiscoverySectionsProps) {
  const sectionTranslations = {
    minutes: translations.minutes,
    easy: translations.easy,
    medium: translations.medium,
    hard: translations.hard,
    seeMore: translations.seeMore,
  };

  // Only show sections that have enough data
  const hasTrending =
    trending.length >= DISCOVERY_CONSTANTS.MIN_SECTION_RECIPES;
  const hasSocials = socials.length >= DISCOVERY_CONSTANTS.MIN_SECTION_RECIPES;
  const hasOnline = online.length >= DISCOVERY_CONSTANTS.MIN_SECTION_RECIPES;
  const hasRated = rated.length >= DISCOVERY_CONSTANTS.MIN_SECTION_RECIPES;

  // If no sections have enough data, don't render anything
  if (!hasTrending && !hasSocials && !hasOnline && !hasRated) {
    return null;
  }

  return (
    <div className="mb-12">
      {hasTrending && (
        <TrendingThisWeekSection
          data={trending}
          title={translations.trendingTitle}
          locale={locale}
          translations={sectionTranslations}
          categoryTranslations={categoryTranslations}
        />
      )}

      {hasSocials && (
        <TrendingOnSocialsSection
          data={socials}
          title={translations.socialsTitle}
          locale={locale}
          translations={sectionTranslations}
          categoryTranslations={categoryTranslations}
        />
      )}

      {hasOnline && (
        <PopularOnlineSection
          data={online}
          title={translations.onlineTitle}
          locale={locale}
          translations={sectionTranslations}
          categoryTranslations={categoryTranslations}
        />
      )}

      {hasRated && (
        <HighestRatedSection
          data={rated}
          title={translations.ratedTitle}
          locale={locale}
          translations={sectionTranslations}
          categoryTranslations={categoryTranslations}
        />
      )}
    </div>
  );
}
