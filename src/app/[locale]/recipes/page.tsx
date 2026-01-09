import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { createServerSupabase } from "@/lib/supabase-server";
import {
  getTrendingThisWeek,
  getTrendingOnSocials,
  getPopularOnline,
  getHighestRated,
  getCategories,
} from "@/lib/discovery";
import { DISCOVERY_CONSTANTS } from "@/types/discovery";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { CategorySelector } from "@/components/discovery/CategorySelector";
import { AllDiscoverySections } from "@/components/discovery/DiscoverySections";

// ISR: Revalidate every hour
export const revalidate = 3600;

interface Props {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; tag?: string; page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "recipes" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cuisto.app";

  return {
    title: t("listingTitle"),
    description: t("listingDescription"),
    openGraph: {
      title: t("listingTitle"),
      description: t("listingDescription"),
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/recipes`,
      languages: {
        en: `${baseUrl}/en/recipes`,
        fr: `${baseUrl}/fr/recipes`,
      },
    },
  };
}

/**
 * Build category translations object
 */
function buildCategoryTranslations(
  tCategories: (key: string) => string
): Record<string, string> {
  return {
    "main-dishes": tCategories("main-dishes"),
    soups: tCategories("soups"),
    salads: tCategories("salads"),
    "pasta-noodles": tCategories("pasta-noodles"),
    sandwiches: tCategories("sandwiches"),
    appetizers: tCategories("appetizers"),
    apero: tCategories("apero"),
    desserts: tCategories("desserts"),
    "baked-goods": tCategories("baked-goods"),
    beverages: tCategories("beverages"),
    cocktails: tCategories("cocktails"),
    breakfast: tCategories("breakfast"),
    sides: tCategories("sides"),
    "sauces-dips": tCategories("sauces-dips"),
    snacks: tCategories("snacks"),
    grilled: tCategories("grilled"),
    "bowls-grains": tCategories("bowls-grains"),
  };
}

/**
 * Discovery sections - shown when no category filter is active
 */
async function DiscoverySectionsContent({
  locale,
  categoryTranslations,
}: {
  locale: string;
  categoryTranslations: Record<string, string>;
}) {
  const t = await getTranslations({ locale, namespace: "recipes" });
  const tDiscovery = await getTranslations({ locale, namespace: "discovery" });

  // Fetch all discovery data in parallel
  const [trending, socials, online, rated] = await Promise.all([
    getTrendingThisWeek(DISCOVERY_CONSTANTS.SECTION_PREVIEW_LIMIT),
    getTrendingOnSocials(DISCOVERY_CONSTANTS.SECTION_PREVIEW_LIMIT),
    getPopularOnline(DISCOVERY_CONSTANTS.SECTION_PREVIEW_LIMIT),
    getHighestRated(DISCOVERY_CONSTANTS.SECTION_PREVIEW_LIMIT),
  ]);

  const translations = {
    trendingTitle: tDiscovery("sections.trending.title"),
    socialsTitle: tDiscovery("sections.socials.title"),
    onlineTitle: tDiscovery("sections.online.title"),
    ratedTitle: tDiscovery("sections.rated.title"),
    minutes: t("minutes"),
    easy: t("easy"),
    medium: t("medium"),
    hard: t("hard"),
    seeMore: tDiscovery("seeMore"),
  };

  return (
    <AllDiscoverySections
      trending={trending}
      socials={socials}
      online={online}
      rated={rated}
      locale={locale}
      translations={translations}
      categoryTranslations={categoryTranslations}
    />
  );
}

/**
 * Recipe grid content
 */
async function RecipeListContent({
  locale,
  category,
  tag,
  page,
}: {
  locale: string;
  category?: string;
  tag?: string;
  page: string;
}) {
  const t = await getTranslations({ locale, namespace: "recipes" });
  const tCategories = await getTranslations({
    locale,
    namespace: "categories",
  });
  const supabase = createServerSupabase();

  const pageSize = 24;
  const currentPage = parseInt(page) || 1;
  const offset = (currentPage - 1) * pageSize;

  // Build query - join with categories table
  let query = supabase
    .from("recipes")
    .select(
      "id, slug, title, description, image_url, difficulty, tags, category_id, prep_time_minutes, cook_time_minutes, total_time_minutes, average_rating, rating_count, total_times_cooked, categories!category_id(id, slug)",
      { count: "exact" }
    )
    .eq("is_public", true)
    .eq("is_draft", false)
    .order("total_times_cooked", { ascending: false })
    .range(offset, offset + pageSize - 1);

  // Filter by category slug if provided
  if (category) {
    // First get category_id from slug
    const { data } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", category)
      .single();

    const categoryData = data as { id: string } | null;

    if (categoryData) {
      query = query.eq("category_id", categoryData.id);
    }
  }
  if (tag) {
    query = query.contains("tags", [tag]);
  }

  const { data: recipes, count } = await query;

  // Parse recipes with category data
  const parsedRecipes = (recipes || []).map((row: any) => ({
    id: row.id,
    slug: row.slug || null,
    title: row.title,
    description: row.description || null,
    image_url: row.image_url || null,
    difficulty: row.difficulty || null,
    tags: row.tags || [],
    category: row.categories
      ? { id: row.categories.id, slug: row.categories.slug }
      : null,
    prep_time_minutes: row.prep_time_minutes || null,
    cook_time_minutes: row.cook_time_minutes || null,
    total_time_minutes: row.total_time_minutes || null,
    average_rating: row.average_rating || null,
    rating_count: row.rating_count || 0,
    total_times_cooked: row.total_times_cooked || 0,
  }));

  const totalPages = Math.ceil((count || 0) / pageSize);

  const translations = {
    minutes: t("minutes"),
    easy: t("easy"),
    medium: t("medium"),
    hard: t("hard"),
    noRecipes: t("noRecipes"),
    previous: t("previous"),
    next: t("next"),
    pageOf: t("pageOf", { current: currentPage, total: totalPages }),
  };

  const categoryTranslations = buildCategoryTranslations(tCategories);

  return (
    <RecipeGrid
      recipes={parsedRecipes}
      locale={locale}
      totalCount={count || 0}
      currentPage={currentPage}
      pageSize={pageSize}
      translations={translations}
      categoryTranslations={categoryTranslations}
    />
  );
}

export default async function RecipesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, tag, page = "1" } = await searchParams;
  const t = await getTranslations({ locale, namespace: "recipes" });
  const tDiscovery = await getTranslations({ locale, namespace: "discovery" });
  const tCategories = await getTranslations({
    locale,
    namespace: "categories",
  });

  // Fetch categories for the selector
  const categories = await getCategories();
  const categoryTranslations = buildCategoryTranslations(tCategories);

  // Check if filtering is active
  const isFiltering = Boolean(category || tag);

  return (
    <main className="min-h-screen bg-surface">
      <Navigation />
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1
              className="text-3xl md:text-4xl font-bold text-text-heading mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("browseRecipes")}
            </h1>
            <p className="text-lg text-text-body max-w-2xl">
              {t("browseDescription")}
            </p>
          </header>

          {/* Category Selector */}
          <div className="mb-8">
            <Suspense fallback={<CategorySelectorSkeleton />}>
              <CategorySelector
                categories={categories}
                selectedCategory={category || null}
                locale={locale}
                allLabel={tDiscovery("categories.all")}
                categoryTranslations={categoryTranslations}
              />
            </Suspense>
          </div>

          {/* Discovery Sections - Only show when not filtering by category */}
          {!isFiltering && (
            <Suspense fallback={<DiscoverySectionsSkeleton />}>
              <DiscoverySectionsContent
                locale={locale}
                categoryTranslations={categoryTranslations}
              />
            </Suspense>
          )}

          {/* Section Title for Recipe Grid */}
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 shrink-0">
              {isFiltering
                ? tDiscovery("popularRecipes")
                : tDiscovery("allRecipes")}
            </h2>
            <div className="h-px flex-1 bg-stone-200" />
          </div>

          {/* Active tag filter indicator */}
          {tag && (
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm text-text-muted">
                {t("filteringBy")}:
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                #{tag}
              </span>
            </div>
          )}

          {/* Recipe Grid */}
          <Suspense fallback={<RecipeGridSkeleton />}>
            <RecipeListContent
              locale={locale}
              category={category}
              tag={tag}
              page={page}
            />
          </Suspense>
        </div>
      </div>
      <Footer />
    </main>
  );
}

/**
 * Category selector skeleton
 */
function CategorySelectorSkeleton() {
  return (
    <div className="flex gap-2 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-10 w-24 bg-stone-200 rounded-full animate-pulse shrink-0"
        />
      ))}
    </div>
  );
}

/**
 * Discovery sections skeleton
 */
function DiscoverySectionsSkeleton() {
  return (
    <div className="mb-12 space-y-10">
      {Array.from({ length: 2 }).map((_, sectionIndex) => (
        <div key={sectionIndex}>
          {/* Section header */}
          <div className="flex items-center gap-4 mb-5">
            <div className="h-3 w-32 bg-stone-200 rounded animate-pulse" />
            <div className="h-px flex-1 bg-stone-200" />
            <div className="h-3 w-16 bg-stone-200 rounded animate-pulse" />
          </div>
          {/* Cards */}
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-[280px] shrink-0 animate-pulse">
                <div className="h-[210px] bg-stone-200 rounded-xl mb-3" />
                <div className="space-y-2">
                  <div className="h-2 bg-stone-200 rounded w-1/3" />
                  <div className="h-4 bg-stone-200 rounded w-3/4" />
                  <div className="h-2.5 bg-stone-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Recipe grid skeleton
 */
function RecipeGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-surface-elevated rounded-xl overflow-hidden border border-border animate-pulse"
        >
          <div className="aspect-[4/3] bg-stone-200" />
          <div className="p-4 space-y-3">
            <div className="h-5 bg-stone-200 rounded w-3/4" />
            <div className="h-4 bg-stone-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
