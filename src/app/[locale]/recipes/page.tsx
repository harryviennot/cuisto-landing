import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import { createServerSupabase } from "@/lib/supabase-server";
import { parseRecipeListItem } from "@/types/recipe";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";

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
  const supabase = createServerSupabase();

  const pageSize = 24;
  const currentPage = parseInt(page) || 1;
  const offset = (currentPage - 1) * pageSize;

  // Build query
  let query = supabase
    .from("recipes")
    .select(
      "id, slug, title, description, image_url, difficulty, tags, categories, prep_time_minutes, cook_time_minutes, total_time_minutes, average_rating, rating_count, total_times_cooked",
      { count: "exact" }
    )
    .eq("is_public", true)
    .eq("is_draft", false)
    .order("total_times_cooked", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (category) {
    query = query.contains("categories", [category]);
  }
  if (tag) {
    query = query.contains("tags", [tag]);
  }

  const { data: recipes, count } = await query;

  const parsedRecipes = (recipes || []).map(parseRecipeListItem);
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

  return (
    <RecipeGrid
      recipes={parsedRecipes}
      locale={locale}
      totalCount={count || 0}
      currentPage={currentPage}
      pageSize={pageSize}
      translations={translations}
    />
  );
}

export default async function RecipesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, tag, page = "1" } = await searchParams;
  const t = await getTranslations({ locale, namespace: "recipes" });

  return (
    <main className="min-h-screen bg-surface">
      <Navigation />
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <h1
              className="text-3xl md:text-4xl font-bold text-text-heading mb-3"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {t("browseRecipes")}
            </h1>
            <p className="text-lg text-text-body max-w-2xl">
              {t("browseDescription")}
            </p>

            {/* Active filters */}
            {(category || tag) && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-text-muted">{t("filteringBy")}:</span>
                {category && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {category}
                  </span>
                )}
                {tag && (
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    #{tag}
                  </span>
                )}
              </div>
            )}
          </header>

          {/* Recipe Grid */}
          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-surface-elevated rounded-xl overflow-hidden border border-border animate-pulse"
                  >
                    <div className="aspect-[4/3] bg-brown-100" />
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-brown-100 rounded w-3/4" />
                      <div className="h-4 bg-brown-100 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            }
          >
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
