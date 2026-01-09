"use client";

/**
 * CategorySelector - Category filter with flex-wrap layout
 *
 * Displays all categories in a wrapped grid that fills available width.
 * Includes an "All" option at the beginning (default selected).
 * Updates URL params when a category is selected.
 */
import { useRouter, useSearchParams } from "next/navigation";
import { CategoryChip } from "./CategoryChip";
import type { Category } from "@/types/recipe";

interface CategorySelectorProps {
  /** List of categories to display */
  categories: Category[];
  /** Currently selected category slug (null = "All") */
  selectedCategory: string | null;
  /** Locale for URL */
  locale: string;
  /** Translation for "All" label */
  allLabel: string;
  /** Translations for category names */
  categoryTranslations: Record<string, string>;
}

export function CategorySelector({
  categories,
  selectedCategory,
  locale,
  allLabel,
  categoryTranslations,
}: CategorySelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sort categories by display_order
  const sortedCategories = [...categories].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0)
  );

  const handleSelectCategory = (slug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (slug === null) {
      // "All" selected - remove category param
      params.delete("category");
    } else {
      params.set("category", slug);
    }

    // Reset to page 1 when changing category
    params.delete("page");

    const queryString = params.toString();
    router.push(`/${locale}/recipes${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {/* "All" option */}
      <CategoryChip
        slug="all"
        label={allLabel}
        isActive={selectedCategory === null}
        onClick={() => handleSelectCategory(null)}
      />

      {/* Category chips */}
      {sortedCategories.map((category) => (
        <CategoryChip
          key={category.id}
          slug={category.slug}
          label={categoryTranslations[category.slug] || category.slug}
          isActive={selectedCategory === category.slug}
          onClick={() => handleSelectCategory(category.slug)}
        />
      ))}
    </div>
  );
}
