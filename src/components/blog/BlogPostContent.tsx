"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Share } from "@phosphor-icons/react";
import type { BlogPost } from "@/types/blog";

interface Props {
  post: BlogPost;
  locale: string;
  translations: {
    backToBlog: string;
    share: string;
  };
}

export default function BlogPostContent({ post, locale, translations: t }: Props) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.description || post.title,
          url,
        });
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToBlog}</span>
      </Link>

      {/* Header */}
      <header className="mb-8">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1
          className="text-3xl md:text-4xl font-bold text-text-heading mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {post.title}
        </h1>

        {post.description && (
          <p className="text-xl text-text-body mb-6">{post.description}</p>
        )}

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
          {formattedDate && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            <span>{post.author_name}</span>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-primary transition-colors"
          >
            <Share className="w-4 h-4" />
            <span>{t.share}</span>
          </button>
        </div>

        {/* Featured image */}
        {post.featured_image_url && (
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-brown-100">
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}
      </header>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-text-heading prose-p:text-text-body prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
      />
    </article>
  );
}

// Simple markdown renderer (you might want to use a proper library like react-markdown)
function renderMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl mt-12 mb-6">$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Images
    .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" class="rounded-xl my-6" />')
    // Line breaks
    .replace(/\n\n/gim, "</p><p>")
    // Wrap in paragraphs
    .replace(/^(.+)$/gim, "<p>$1</p>")
    // Clean up empty paragraphs
    .replace(/<p><\/p>/gim, "")
    .replace(/<p><h/gim, "<h")
    .replace(/<\/h(\d)><\/p>/gim, "</h$1>");
}
