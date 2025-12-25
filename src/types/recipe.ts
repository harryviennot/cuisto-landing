/**
 * Recipe Types for the Landing Page
 * Mirrors the backend domain models for type safety
 */

import type { Database } from "./database";

// Base recipe row type from database
export type RecipeRow = Database["public"]["Tables"]["recipes"]["Row"];

/**
 * Ingredient with quantity, unit, and optional notes
 */
export interface Ingredient {
  name: string;
  quantity?: number | null;
  unit?: string | null;
  notes?: string | null;
  group?: string | null;
}

/**
 * Single cooking instruction step
 */
export interface Instruction {
  step_number: number;
  title: string;
  description: string;
  timer_minutes?: number | null;
  group?: string | null;
}

/**
 * Difficulty levels for recipes
 */
export type DifficultyLevel = "easy" | "medium" | "hard";

/**
 * Source types for recipe extraction
 */
export type SourceType = "video" | "photo" | "voice" | "url" | "paste" | "link";

/**
 * Category (slug only - frontend handles i18n translation)
 */
export interface Category {
  id: string;
  slug: string;
  icon?: string | null;
  display_order?: number;
}

/**
 * Category with recipe count (for category listings)
 */
export interface CategoryWithCount extends Category {
  recipe_count: number;
}

/**
 * Full recipe type with parsed JSON fields
 */
export interface Recipe {
  id: string;
  slug: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  ingredients: Ingredient[];
  instructions: Instruction[];
  servings: number | null;
  difficulty: DifficultyLevel | null;
  tags: string[];
  category?: Category | null; // New: single category object
  categories: string[]; // Deprecated: kept for backwards compat
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  total_time_minutes: number | null;
  source_type: SourceType;
  source_url: string | null;
  created_by: string;
  original_recipe_id: string | null;
  fork_count: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
  language: string | null;
  average_rating: number | null;
  rating_count: number;
  total_times_cooked: number;
  is_draft: boolean;
}

/**
 * Recipe list item (lightweight for listings)
 */
export interface RecipeListItem {
  id: string;
  slug: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  difficulty: DifficultyLevel | null;
  tags: string[];
  category?: Category | null; // New: single category object
  categories: string[]; // Deprecated: kept for backwards compat
  prep_time_minutes: number | null;
  cook_time_minutes: number | null;
  total_time_minutes: number | null;
  average_rating: number | null;
  rating_count: number;
  total_times_cooked: number;
}

/**
 * Video source information for recipes extracted from video platforms
 */
export interface VideoSource {
  id: string;
  platform: string;
  platform_video_id: string;
  original_url: string;
  canonical_url: string | null;
  title: string | null;
  thumbnail_url: string | null;
  duration_seconds: number | null;
  view_count: number | null;
  like_count: number | null;
  creator?: VideoCreator | null;
}

/**
 * Video creator/author information
 */
export interface VideoCreator {
  id: string;
  platform: string;
  platform_username: string | null;
  display_name: string | null;
  profile_url: string | null;
}

/**
 * Recipe with video source (for recipes extracted from videos)
 */
export interface RecipeWithVideoSource extends Recipe {
  video_source?: VideoSource | null;
}

/**
 * Helper function to parse recipe row from database
 */
export function parseRecipeRow(row: RecipeRow): Recipe {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    image_url: row.image_url,
    ingredients: (row.ingredients as unknown as Ingredient[]) || [],
    instructions: (row.instructions as unknown as Instruction[]) || [],
    servings: row.servings,
    difficulty: row.difficulty,
    tags: row.tags || [],
    categories: row.categories || [],
    prep_time_minutes: row.prep_time_minutes,
    cook_time_minutes: row.cook_time_minutes,
    total_time_minutes: row.total_time_minutes,
    source_type: row.source_type,
    source_url: row.source_url,
    created_by: row.created_by,
    original_recipe_id: row.original_recipe_id,
    fork_count: row.fork_count || 0,
    is_public: row.is_public ?? true,
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
    language: row.language,
    average_rating: row.average_rating,
    rating_count: row.rating_count || 0,
    total_times_cooked: row.total_times_cooked || 0,
    is_draft: row.is_draft,
  };
}

/**
 * Helper function to parse recipe list item from database
 */
export function parseRecipeListItem(row: Partial<RecipeRow>): RecipeListItem {
  return {
    id: row.id!,
    slug: row.slug || null,
    title: row.title!,
    description: row.description || null,
    image_url: row.image_url || null,
    difficulty: row.difficulty || null,
    tags: row.tags || [],
    categories: row.categories || [],
    prep_time_minutes: row.prep_time_minutes || null,
    cook_time_minutes: row.cook_time_minutes || null,
    total_time_minutes: row.total_time_minutes || null,
    average_rating: row.average_rating || null,
    rating_count: row.rating_count || 0,
    total_times_cooked: row.total_times_cooked || 0,
  };
}
