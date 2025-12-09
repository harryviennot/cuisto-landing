"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User } from "@phosphor-icons/react";
import type { BlogPostListItem } from "@/types/blog";

interface Props {
  post: BlogPostListItem;
  locale: string;
  translations: {
    readMore: string;
  };
}

export default function BlogPostCard({ post, locale, translations: t }: Props) {
  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="block bg-surface-elevated rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[16/9] bg-brown-100 overflow-hidden">
          {post.featured_image_url ? (
            <Image
              src={post.featured_image_url}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-forest-100">
              <span
                className="text-4xl font-bold text-primary/30"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                C
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-semibold text-text-heading text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>

          {post.description && (
            <p className="text-text-body text-sm line-clamp-2 mb-4">
              {post.description}
            </p>
          )}

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-text-muted">
            {formattedDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>{post.author_name}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
