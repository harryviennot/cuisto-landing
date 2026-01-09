"use client";

/**
 * HorizontalPreviewSection
 *
 * A generic, reusable horizontal scroll section component.
 * Web version of the mobile app's HorizontalPreviewSection.
 *
 * Features:
 * - Section header with title, divider line, and "See more" link
 * - Horizontal scroll container with recipe cards
 * - Loading state with skeleton placeholders
 * - Auto-hides when data is below minimum threshold
 * - Generic type support for any data shape
 */
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const DEFAULT_MIN_ITEMS = 3;
const DEFAULT_SKELETON_COUNT = 4;

export interface HorizontalPreviewSectionProps<T> {
  /** Section title (displayed in uppercase) */
  title: string;
  /** Data array to display */
  data: T[] | undefined;
  /** Render function for each item */
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Key extractor for items */
  keyExtractor: (item: T) => string;
  /** URL for "See more" link */
  seeMoreHref?: string;
  /** "See more" button text */
  seeMoreText?: string;
  /** Loading state */
  isLoading?: boolean;
  /** Error state - section will not render on error */
  isError?: boolean;
  /** Skeleton component to show during loading */
  SkeletonComponent?: React.ComponentType;
  /** Number of skeletons to show during loading */
  skeletonCount?: number;
  /** Minimum items required to show the section (default: 3) */
  minItems?: number;
  /** Custom class for the container */
  className?: string;
}

/**
 * Section header with title, divider, and "See more" link
 */
function SectionHeader({
  title,
  seeMoreHref,
  seeMoreText = "See more",
}: {
  title: string;
  seeMoreHref?: string;
  seeMoreText?: string;
}) {
  return (
    <div className="flex items-center gap-4 mb-5 px-1">
      <h2 className="text-xs font-bold tracking-widest uppercase text-stone-400 shrink-0">
        {title}
      </h2>
      <div className="h-px flex-1 bg-stone-200" />
      {seeMoreHref && (
        <Link
          href={seeMoreHref}
          className="text-xs font-bold text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          {seeMoreText}
        </Link>
      )}
    </div>
  );
}

/**
 * Default skeleton component
 */
function DefaultSkeleton() {
  return (
    <div className="w-[280px] shrink-0 animate-pulse">
      <div className="aspect-[4/3] bg-stone-200 rounded-xl mb-3" />
      <div className="space-y-2 px-1">
        <div className="h-3 bg-stone-200 rounded w-1/3" />
        <div className="h-5 bg-stone-200 rounded w-3/4" />
        <div className="h-3 bg-stone-200 rounded w-1/2" />
      </div>
    </div>
  );
}

export function HorizontalPreviewSection<T>({
  title,
  data,
  renderItem,
  keyExtractor,
  seeMoreHref,
  seeMoreText = "See more",
  isLoading = false,
  isError = false,
  SkeletonComponent,
  skeletonCount = DEFAULT_SKELETON_COUNT,
  minItems = DEFAULT_MIN_ITEMS,
  className = "",
}: HorizontalPreviewSectionProps<T>) {
  // Don't render section if there's an error
  if (isError) {
    return null;
  }

  // Render skeleton during loading
  if (isLoading) {
    const Skeleton = SkeletonComponent || DefaultSkeleton;
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        <SectionHeader
          title={title}
          seeMoreHref={seeMoreHref}
          seeMoreText={seeMoreText}
        />
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      </motion.section>
    );
  }

  // Don't render section if no data or below minimum threshold
  if (!data || data.length < minItems) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <SectionHeader
        title={title}
        seeMoreHref={seeMoreHref}
        seeMoreText={seeMoreText}
      />
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        {data.map((item, index) => (
          <div key={keyExtractor(item)} className="shrink-0">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
