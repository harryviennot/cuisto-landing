import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createServerSupabase } from "@/lib/supabase-server";
import { parseBlogPostListItem } from "@/types/blog";
import BlogPostCard from "@/components/blog/BlogPostCard";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";

// ISR: Revalidate every hour
export const revalidate = 3600;

// Pre-generate for all locales at build time
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
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
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        fr: `${baseUrl}/fr/blog`,
      },
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const supabase = createServerSupabase();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, description, featured_image_url, author_name, tags, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  const parsedPosts = (posts || []).map(parseBlogPostListItem);

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
              {t("title")}
            </h1>
            <p className="text-lg text-text-body max-w-2xl">
              {t("subtitle")}
            </p>
          </header>

          {/* Posts Grid */}
          {parsedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parsedPosts.map((post) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  locale={locale}
                  translations={{ readMore: t("readMore") }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-text-muted text-lg">{t("noPosts")}</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
