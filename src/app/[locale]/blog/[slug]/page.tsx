import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { createServerSupabase, getBuildTimeSupabase } from "@/lib/supabase-server";
import { parseBlogPostRow } from "@/types/blog";
import BlogPostContent from "@/components/blog/BlogPostContent";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";

// ISR: Revalidate every hour
export const revalidate = 3600;

// Allow dynamic slugs
export const dynamicParams = true;

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

// Pre-generate published posts at build time
export async function generateStaticParams() {
  const supabase = getBuildTimeSupabase();
  if (!supabase) return [];

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("is_published", true) as { data: { slug: string }[] | null };

  return (posts ?? []).map((post) => ({
    slug: post.slug,
  }));
}

async function getPostBySlug(slug: string) {
  const supabase = createServerSupabase();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  return post;
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const postRow = await getPostBySlug(slug);

  if (!postRow) {
    return { title: "Post Not Found" };
  }

  const post = parseBlogPostRow(postRow);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://cuisto.app";

  return {
    title: `${post.title} | Cuisto Blog`,
    description: post.description || post.title,
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      images: post.featured_image_url ? [{ url: post.featured_image_url }] : [],
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      publishedTime: post.published_at || undefined,
      authors: [post.author_name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.title,
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/blog/${post.slug}`,
      languages: {
        en: `${baseUrl}/en/blog/${post.slug}`,
        fr: `${baseUrl}/fr/blog/${post.slug}`,
      },
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  const postRow = await getPostBySlug(slug);

  if (!postRow) {
    notFound();
  }

  const post = parseBlogPostRow(postRow);
  const t = await getTranslations({ locale, namespace: "blog" });

  const translations = {
    backToBlog: t("backToBlog"),
    share: t("share"),
  };

  // JSON-LD for blog post
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.featured_image_url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: {
      "@type": "Person",
      name: post.author_name,
    },
    publisher: {
      "@type": "Organization",
      name: "Cuisto",
      url: process.env.NEXT_PUBLIC_SITE_URL || "https://cuisto.app",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="min-h-screen bg-surface">
        <Navigation />
        <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <BlogPostContent post={post} locale={locale} translations={translations} />
        </div>
        <Footer />
      </main>
    </>
  );
}
