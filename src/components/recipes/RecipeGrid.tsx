"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { RecipeListItem } from "@/types/recipe";
import RecipeCard from "./RecipeCard";

interface Props {
  recipes: RecipeListItem[];
  locale: string;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  translations: {
    minutes: string;
    easy: string;
    medium: string;
    hard: string;
    noRecipes: string;
    previous: string;
    next: string;
    pageOf: string;
  };
}

export default function RecipeGrid({
  recipes,
  locale,
  totalCount,
  currentPage,
  pageSize,
  translations: t,
}: Props) {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalCount / pageSize);

  // Build pagination URL preserving other params
  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `/${locale}/recipes?${params.toString()}`;
  };

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted text-lg">{t.noRecipes}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            locale={locale}
            translations={t}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-4 mt-12">
          {/* Previous */}
          {currentPage > 1 ? (
            <Link
              href={buildPageUrl(currentPage - 1)}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-body hover:text-primary transition-colors"
            >
              <CaretLeft className="w-4 h-4" />
              {t.previous}
            </Link>
          ) : (
            <span className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-muted opacity-50">
              <CaretLeft className="w-4 h-4" />
              {t.previous}
            </span>
          )}

          {/* Page indicator */}
          <span className="text-sm text-text-muted">
            {t.pageOf}
          </span>

          {/* Next */}
          {currentPage < totalPages ? (
            <Link
              href={buildPageUrl(currentPage + 1)}
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-body hover:text-primary transition-colors"
            >
              {t.next}
              <CaretRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-text-muted opacity-50">
              {t.next}
              <CaretRight className="w-4 h-4" />
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
