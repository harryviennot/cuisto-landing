/**
 * Blog Post Types for the Landing Page
 */

import type { Database } from "./database";

// Base blog post row type from database
export type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];

/**
 * Full blog post type
 */
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string;
  featured_image_url: string | null;
  author_name: string;
  tags: string[];
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Blog post list item (lightweight for listings)
 */
export interface BlogPostListItem {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  featured_image_url: string | null;
  author_name: string;
  tags: string[];
  published_at: string | null;
}

/**
 * Helper function to parse blog post row from database
 */
export function parseBlogPostRow(row: BlogPostRow): BlogPost {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    description: row.description,
    content: row.content,
    featured_image_url: row.featured_image_url,
    author_name: row.author_name || "Cuisto Team",
    tags: row.tags || [],
    is_published: row.is_published ?? false,
    published_at: row.published_at,
    created_at: row.created_at || new Date().toISOString(),
    updated_at: row.updated_at || new Date().toISOString(),
  };
}

/**
 * Helper function to parse blog post list item from database
 */
export function parseBlogPostListItem(
  row: Partial<BlogPostRow>
): BlogPostListItem {
  return {
    id: row.id!,
    slug: row.slug!,
    title: row.title!,
    description: row.description || null,
    featured_image_url: row.featured_image_url || null,
    author_name: row.author_name || "Cuisto Team",
    tags: row.tags || [],
    published_at: row.published_at || null,
  };
}
