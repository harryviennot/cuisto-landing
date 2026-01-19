import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { parseRecipeRow } from "@/types/recipe";
import RecipeDetail from "@/components/recipes/RecipeDetail";
import RecipeJsonLd from "@/components/recipes/RecipeJsonLd";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";

// ISR: Revalidate every hour
export const revalidate = 3600;

// Allow dynamic slugs not pre-generated
export const dynamicParams = true;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// Note: generateStaticParams removed to avoid DYNAMIC_SERVER_USAGE error
// Pages are rendered on-demand with ISR caching (revalidate: 3600)

async function getRecipeBySlug(slug: string) {
  const supabase = createServerSupabase();

  // Try slug first
  let { data: recipe } = await supabase
    .from("recipes")
    .select("*")
    .eq("slug", slug)
    .eq("is_public", true)
    .eq("is_draft", false)
    .eq("is_hidden", false)
    .single();

  // Fallback: try as UUID
  if (!recipe) {
    const { data: uuidRecipe } = await supabase
      .from("recipes")
      .select("*")
      .eq("id", slug)
      .eq("is_public", true)
      .eq("is_draft", false)
      .eq("is_hidden", false)
      .single();
    recipe = uuidRecipe;
  }

  return recipe;
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const recipeRow = await getRecipeBySlug(slug);

  if (!recipeRow) {
    return { title: "Recipe Not Found" };
  }

  const recipe = parseRecipeRow(recipeRow);
  const t = await getTranslations({ locale, namespace: "recipes" });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cuisto.app";

  const description =
    recipe.description || t("defaultDescription", { title: recipe.title });

  return {
    title: `${recipe.title} | Cuisto`,
    description,
    openGraph: {
      title: recipe.title,
      description,
      images: recipe.image_url ? [{ url: recipe.image_url }] : [],
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${baseUrl}/${locale}/recipes/${recipe.slug || recipe.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description,
      images: recipe.image_url ? [recipe.image_url] : [],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/recipes/${recipe.slug || recipe.id}`,
      languages: {
        en: `${baseUrl}/en/recipes/${recipe.slug || recipe.id}`,
        fr: `${baseUrl}/fr/recipes/${recipe.slug || recipe.id}`,
      },
    },
  };
}

export default async function RecipePage({ params }: Props) {
  const { locale, slug } = await params;
  const recipeRow = await getRecipeBySlug(slug);

  if (!recipeRow) {
    notFound();
  }

  const recipe = parseRecipeRow(recipeRow);
  const t = await getTranslations({ locale, namespace: "recipes" });

  const translations = {
    backToRecipes: t("backToRecipes"),
    prepTime: t("prepTime"),
    cookTime: t("cookTime"),
    totalTime: t("totalTime"),
    servings: t("servings"),
    difficulty: t("difficulty"),
    timesCookedBy: t("timesCookedBy", { count: recipe.total_times_cooked }),
    easy: t("easy"),
    medium: t("medium"),
    hard: t("hard"),
    minutes: t("minutes"),
    ingredients: t("ingredients"),
    instructions: t("instructions"),
    stepPrefix: t("step", { number: "" }).replace(/\s*$/, " "), // "Step " prefix for client-side formatting
    getTheApp: t("getTheApp"),
    getTheAppDescription: t("getTheAppDescription"),
    share: t("share"),
    sourceLabel: t("sourceLabel"),
  };

  return (
    <>
      <RecipeJsonLd recipe={recipe} locale={locale} />
      <main className="min-h-screen bg-surface">
        <Navigation />
        <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <RecipeDetail recipe={recipe} locale={locale} translations={translations} />
        </div>
        <Footer />
      </main>
    </>
  );
}
