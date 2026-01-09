/**
 * Discovery Data Fetching Functions
 * Server-side functions to fetch discovery data from Supabase
 */

import { createServerSupabase } from "./supabase-server";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Category, RecipeListItem } from "@/types/recipe";
import type {
  TrendingRecipe,
  ExtractedRecipe,
  CookingStats,
  ExtractionStats,
} from "@/types/discovery";

// Type helper to allow RPC calls that aren't in the generated types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnySupabaseClient = SupabaseClient<any, any, any>;

const DEFAULT_LIMIT = 5;

/**
 * Parse a recipe row from the database into a RecipeListItem
 */
function parseRecipeListItem(row: any, category?: { id: string; slug: string } | null): RecipeListItem {
  return {
    id: row.id,
    slug: row.slug || null,
    title: row.title,
    description: row.description || null,
    image_url: row.image_url || null,
    difficulty: row.difficulty || null,
    tags: row.tags || [],
    category: category || null,
    prep_time_minutes: row.prep_time_minutes || null,
    cook_time_minutes: row.cook_time_minutes || null,
    total_time_minutes: row.total_time_minutes || null,
    average_rating: row.average_rating || null,
    rating_count: row.rating_count || 0,
    total_times_cooked: row.total_times_cooked || 0,
  };
}

/**
 * Get trending recipes (most cooked in the last 7 days)
 */
export async function getTrendingThisWeek(
  limit: number = DEFAULT_LIMIT,
  timeWindowDays: number = 7
): Promise<TrendingRecipe[]> {
  const supabase = createServerSupabase() as AnySupabaseClient;

  // First get trending recipe IDs and stats from the function
  const { data: trendingData, error: trendingError } = await supabase.rpc(
    "get_trending_recipes",
    {
      time_window_days: timeWindowDays,
      limit_param: limit,
      offset_param: 0,
    }
  );

  if (trendingError || !trendingData || trendingData.length === 0) {
    return [];
  }

  // Get full recipe details for the trending recipes
  const recipeIds = trendingData.map((t: any) => t.recipe_id);
  const { data: recipes, error: recipesError } = await supabase
    .from("recipes")
    .select(
      "id, slug, title, description, image_url, difficulty, tags, category_id, prep_time_minutes, cook_time_minutes, total_time_minutes, average_rating, rating_count, total_times_cooked, categories!category_id(id, slug)"
    )
    .in("id", recipeIds)
    .eq("is_public", true)
    .eq("is_draft", false);

  if (recipesError || !recipes) {
    return [];
  }

  // Create a map for quick lookup
  const recipeMap = new Map(recipes.map((r: any) => [r.id, r]));

  // Combine recipe data with cooking stats, maintaining trending order
  return trendingData
    .map((trending: any) => {
      const recipe = recipeMap.get(trending.recipe_id);
      if (!recipe) return null;

      const cookingStats: CookingStats = {
        cook_count: Number(trending.cook_count),
        unique_users: Number(trending.unique_users),
        time_window_days: timeWindowDays,
      };

      return {
        ...parseRecipeListItem(recipe, recipe.categories),
        cooking_stats: cookingStats,
      } as TrendingRecipe;
    })
    .filter(Boolean) as TrendingRecipe[];
}

/**
 * Get recipes trending on socials (most extracted from video sources)
 */
export async function getTrendingOnSocials(
  limit: number = DEFAULT_LIMIT
): Promise<ExtractedRecipe[]> {
  const supabase = createServerSupabase() as AnySupabaseClient;

  // Query extraction_jobs to count extractions by recipe from video sources
  const { data, error } = await supabase
    .from("extraction_jobs")
    .select(
      `
      recipe_id,
      recipes!inner(
        id, slug, title, description, image_url, difficulty, tags, category_id,
        prep_time_minutes, cook_time_minutes, total_time_minutes,
        average_rating, rating_count, total_times_cooked, is_public, is_draft,
        categories!category_id(id, slug)
      )
    `
    )
    .eq("status", "completed")
    .in("source_type", ["video"])
    .eq("recipes.is_public", true)
    .eq("recipes.is_draft", false)
    .not("recipe_id", "is", null);

  if (error || !data) {
    return [];
  }

  // Group by recipe and count extractions
  const recipeExtractionCounts = new Map<
    string,
    { recipe: any; count: number; uniqueUsers: Set<string> }
  >();

  for (const job of data) {
    if (!job.recipe_id || !job.recipes) continue;

    const existing = recipeExtractionCounts.get(job.recipe_id);
    if (existing) {
      existing.count++;
    } else {
      recipeExtractionCounts.set(job.recipe_id, {
        recipe: job.recipes,
        count: 1,
        uniqueUsers: new Set(),
      });
    }
  }

  // Sort by extraction count and take top N
  const sorted = Array.from(recipeExtractionCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  return sorted.map(({ recipe, count, uniqueUsers }) => {
    const extractionStats: ExtractionStats = {
      extraction_count: count,
      unique_extractors: uniqueUsers.size || count, // Fallback to count if no unique tracking
    };

    return {
      ...parseRecipeListItem(recipe, recipe.categories),
      extraction_stats: extractionStats,
    } as ExtractedRecipe;
  });
}

/**
 * Get popular recipes online (most extracted from website sources)
 */
export async function getPopularOnline(
  limit: number = DEFAULT_LIMIT
): Promise<ExtractedRecipe[]> {
  const supabase = createServerSupabase() as AnySupabaseClient;

  // Query extraction_jobs to count extractions by recipe from website sources
  const { data, error } = await supabase
    .from("extraction_jobs")
    .select(
      `
      recipe_id,
      recipes!inner(
        id, slug, title, description, image_url, difficulty, tags, category_id,
        prep_time_minutes, cook_time_minutes, total_time_minutes,
        average_rating, rating_count, total_times_cooked, is_public, is_draft,
        categories!category_id(id, slug)
      )
    `
    )
    .eq("status", "completed")
    .in("source_type", ["url", "link"])
    .eq("recipes.is_public", true)
    .eq("recipes.is_draft", false)
    .not("recipe_id", "is", null);

  if (error || !data) {
    return [];
  }

  // Group by recipe and count extractions
  const recipeExtractionCounts = new Map<
    string,
    { recipe: any; count: number; uniqueUsers: Set<string> }
  >();

  for (const job of data) {
    if (!job.recipe_id || !job.recipes) continue;

    const existing = recipeExtractionCounts.get(job.recipe_id);
    if (existing) {
      existing.count++;
    } else {
      recipeExtractionCounts.set(job.recipe_id, {
        recipe: job.recipes,
        count: 1,
        uniqueUsers: new Set(),
      });
    }
  }

  // Sort by extraction count and take top N
  const sorted = Array.from(recipeExtractionCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);

  return sorted.map(({ recipe, count, uniqueUsers }) => {
    const extractionStats: ExtractionStats = {
      extraction_count: count,
      unique_extractors: uniqueUsers.size || count,
    };

    return {
      ...parseRecipeListItem(recipe, recipe.categories),
      extraction_stats: extractionStats,
    } as ExtractedRecipe;
  });
}

/**
 * Get highest rated recipes
 */
export async function getHighestRated(
  limit: number = DEFAULT_LIMIT,
  minRatingCount: number = 3
): Promise<RecipeListItem[]> {
  const supabase = createServerSupabase();

  const { data, error } = await supabase
    .from("recipes")
    .select(
      "id, slug, title, description, image_url, difficulty, tags, category_id, prep_time_minutes, cook_time_minutes, total_time_minutes, average_rating, rating_count, total_times_cooked, categories!category_id(id, slug)"
    )
    .eq("is_public", true)
    .eq("is_draft", false)
    .gte("rating_count", minRatingCount)
    .not("average_rating", "is", null)
    .order("average_rating", { ascending: false })
    .order("rating_count", { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data.map((row: any) => parseRecipeListItem(row, row.categories));
}

/**
 * Get all categories sorted by display order
 */
export async function getCategories(): Promise<Category[]> {
  const supabase = createServerSupabase() as AnySupabaseClient;

  const { data, error } = await supabase
    .from("categories")
    .select("id, slug, icon, display_order")
    .order("display_order", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map((row: any) => ({
    id: row.id,
    slug: row.slug,
    icon: row.icon,
    display_order: row.display_order,
  }));
}

/**
 * Get popular recipes, optionally filtered by category
 * Uses the materialized view for performance
 */
export async function getPopularRecipes(
  categoryId?: string | null,
  limit: number = 20,
  offset: number = 0
): Promise<RecipeListItem[]> {
  const supabase = createServerSupabase() as AnySupabaseClient;

  const { data, error } = await supabase.rpc("get_popular_recipes", {
    category_id_param: categoryId || null,
    limit_param: limit,
    offset_param: offset,
  });

  if (error || !data) {
    return [];
  }

  // Get category data for each recipe
  const categoryIds = [...new Set(data.map((r: any) => r.category_id).filter(Boolean))];

  let categoriesMap = new Map<string, { id: string; slug: string }>();
  if (categoryIds.length > 0) {
    const { data: categories } = await supabase
      .from("categories")
      .select("id, slug")
      .in("id", categoryIds);

    if (categories) {
      categoriesMap = new Map(categories.map((c) => [c.id, c]));
    }
  }

  return data.map((row: any) =>
    parseRecipeListItem(row, row.category_id ? categoriesMap.get(row.category_id) : null)
  );
}
