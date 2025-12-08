import { MetadataRoute } from "next";
import { getBuildTimeSupabase } from "@/lib/supabase-server";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cuisto.app";
const locales = ["en", "fr"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = getBuildTimeSupabase();

  // Static pages
  const staticPages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/recipes", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  ];

  const staticUrls = staticPages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
  );

  // Recipe pages (dynamic)
  let recipeUrls: MetadataRoute.Sitemap = [];
  if (supabase) {
    const { data: recipes } = await supabase
      .from("recipes")
      .select("slug, updated_at")
      .eq("is_public", true)
      .eq("is_draft", false)
      .not("slug", "is", null);

    recipeUrls = (recipes || []).flatMap((recipe) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/recipes/${recipe.slug}`,
        lastModified: recipe.updated_at ? new Date(recipe.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }))
    );
  }

  // Blog pages (dynamic)
  let blogUrls: MetadataRoute.Sitemap = [];
  if (supabase) {
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("is_published", true);

    blogUrls = (posts || []).flatMap((post) =>
      locales.map((locale) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );
  }

  return [...staticUrls, ...recipeUrls, ...blogUrls];
}
