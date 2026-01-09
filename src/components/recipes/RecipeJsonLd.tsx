import type { Recipe } from "@/types/recipe";

interface Props {
  recipe: Recipe;
  locale: string;
}

/**
 * Schema.org Recipe structured data for SEO
 * https://schema.org/Recipe
 */
export default function RecipeJsonLd({ recipe, locale }: Props) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cuisto.app";

  // Convert minutes to ISO 8601 duration (PT1H30M format)
  const formatDuration = (minutes: number | null): string | undefined => {
    if (!minutes) return undefined;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    let duration = "PT";
    if (hours > 0) duration += `${hours}H`;
    if (mins > 0) duration += `${mins}M`;
    return duration === "PT" ? undefined : duration;
  };

  // Build ingredients list as strings
  const ingredientStrings = recipe.ingredients?.map((ing) => {
    let str = "";
    if (ing.quantity) str += `${ing.quantity} `;
    if (ing.unit) str += `${ing.unit} `;
    str += ing.name;
    if (ing.notes) str += ` (${ing.notes})`;
    return str.trim();
  }) || [];

  // Build instructions as HowToStep format
  const instructionSteps = recipe.instructions?.map((inst) => ({
    "@type": "HowToStep",
    name: inst.title,
    text: inst.description,
    ...(inst.timer_minutes && {
      timeRequired: formatDuration(inst.timer_minutes),
    }),
  })) || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    description: recipe.description || `A delicious ${recipe.title} recipe`,
    image: recipe.image_url ? [recipe.image_url] : undefined,

    // Attribution
    author: {
      "@type": "Organization",
      name: "Cuisto",
      url: baseUrl,
    },

    // Dates
    datePublished: recipe.created_at,
    dateModified: recipe.updated_at,

    // Timings
    prepTime: formatDuration(recipe.prep_time_minutes),
    cookTime: formatDuration(recipe.cook_time_minutes),
    totalTime: formatDuration(recipe.total_time_minutes),

    // Yield
    recipeYield: recipe.servings ? `${recipe.servings} servings` : undefined,

    // Ingredients
    recipeIngredient: ingredientStrings.length > 0 ? ingredientStrings : undefined,

    // Instructions
    recipeInstructions: instructionSteps.length > 0 ? instructionSteps : undefined,

    // Category and tags
    recipeCategory: recipe.category?.slug,
    keywords: recipe.tags?.join(", "),

    // Ratings (only if we have ratings)
    ...(recipe.average_rating && recipe.rating_count > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: recipe.average_rating.toFixed(1),
        ratingCount: recipe.rating_count,
        bestRating: "5",
        worstRating: "1",
      },
    }),

    // URL
    url: `${baseUrl}/${locale}/recipes/${recipe.slug || recipe.id}`,

    // Interaction statistics (times cooked)
    ...(recipe.total_times_cooked > 0 && {
      interactionStatistic: {
        "@type": "InteractionCounter",
        interactionType: "https://schema.org/CookAction",
        userInteractionCount: recipe.total_times_cooked,
      },
    }),
  };

  // Remove undefined values
  const cleanJsonLd = JSON.parse(JSON.stringify(jsonLd));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(cleanJsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
