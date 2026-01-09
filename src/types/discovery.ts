/**
 * Discovery Types for the Landing Page
 * Mirrors the mobile app's discovery types for consistency
 */

import type { Recipe, RecipeListItem, Category } from "./recipe";

/**
 * Cooking statistics for trending recipes
 */
export interface CookingStats {
  cook_count: number;
  unique_users: number;
  time_window_days: number;
}

/**
 * Extraction statistics for recipes extracted from videos/websites
 */
export interface ExtractionStats {
  extraction_count: number;
  unique_extractors: number;
}

/**
 * Recipe with cooking stats (trending section)
 */
export interface TrendingRecipe extends RecipeListItem {
  cooking_stats: CookingStats;
}

/**
 * Recipe with extraction stats (socials/online sections)
 */
export interface ExtractedRecipe extends RecipeListItem {
  extraction_stats: ExtractionStats;
}

/**
 * Discovery section types
 */
export type DiscoverySectionType = "trending" | "socials" | "online" | "rated";

/**
 * Stats badge configuration for recipe cards
 */
export interface StatsBadge {
  type: "cooking" | "extraction";
  count: number;
}

/**
 * Discovery constants matching mobile app
 */
export const DISCOVERY_CONSTANTS = {
  /** Minimum items required to show a horizontal section */
  MIN_SECTION_RECIPES: 3,
  /** Maximum recipes in horizontal scroll preview */
  SECTION_PREVIEW_LIMIT: 5,
  /** Card width for horizontal sections */
  CARD_WIDTH: 280,
  /** Card image height for horizontal sections */
  CARD_IMAGE_HEIGHT: 210,
} as const;

/**
 * Source category for extraction queries
 */
export type SourceCategory = "video" | "website";
