/**
 * Supabase Database Types
 * Generated based on the cuistudio-server schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      recipes: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          image_url: string | null;
          ingredients: Json;
          instructions: Json;
          servings: number | null;
          difficulty: "easy" | "medium" | "hard" | null;
          tags: string[] | null;
          categories: string[] | null;
          prep_time_minutes: number | null;
          cook_time_minutes: number | null;
          total_time_minutes: number | null;
          source_type: "video" | "photo" | "voice" | "url" | "paste" | "link";
          source_url: string | null;
          created_by: string;
          original_recipe_id: string | null;
          fork_count: number | null;
          is_public: boolean | null;
          created_at: string | null;
          updated_at: string | null;
          language: string | null;
          average_rating: number | null;
          rating_count: number | null;
          rating_distribution: Json | null;
          total_times_cooked: number | null;
          is_draft: boolean;
          slug: string | null;
          image_source: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          image_url?: string | null;
          ingredients?: Json;
          instructions?: Json;
          servings?: number | null;
          difficulty?: "easy" | "medium" | "hard" | null;
          tags?: string[] | null;
          categories?: string[] | null;
          prep_time_minutes?: number | null;
          cook_time_minutes?: number | null;
          total_time_minutes?: number | null;
          source_type: "video" | "photo" | "voice" | "url" | "paste" | "link";
          source_url?: string | null;
          created_by: string;
          original_recipe_id?: string | null;
          fork_count?: number | null;
          is_public?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
          language?: string | null;
          average_rating?: number | null;
          rating_count?: number | null;
          rating_distribution?: Json | null;
          total_times_cooked?: number | null;
          is_draft?: boolean;
          slug?: string | null;
          image_source?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          image_url?: string | null;
          ingredients?: Json;
          instructions?: Json;
          servings?: number | null;
          difficulty?: "easy" | "medium" | "hard" | null;
          tags?: string[] | null;
          categories?: string[] | null;
          prep_time_minutes?: number | null;
          cook_time_minutes?: number | null;
          total_time_minutes?: number | null;
          source_type?: "video" | "photo" | "voice" | "url" | "paste" | "link";
          source_url?: string | null;
          created_by?: string;
          original_recipe_id?: string | null;
          fork_count?: number | null;
          is_public?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
          language?: string | null;
          average_rating?: number | null;
          rating_count?: number | null;
          rating_distribution?: Json | null;
          total_times_cooked?: number | null;
          is_draft?: boolean;
          slug?: string | null;
          image_source?: string | null;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string | null;
          content: string;
          featured_image_url: string | null;
          author_name: string | null;
          tags: string[] | null;
          is_published: boolean | null;
          published_at: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description?: string | null;
          content: string;
          featured_image_url?: string | null;
          author_name?: string | null;
          tags?: string[] | null;
          is_published?: boolean | null;
          published_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string | null;
          content?: string;
          featured_image_url?: string | null;
          author_name?: string | null;
          tags?: string[] | null;
          is_published?: boolean | null;
          published_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      video_sources: {
        Row: {
          id: string;
          platform: string;
          platform_video_id: string;
          recipe_id: string | null;
          video_creator_id: string | null;
          original_url: string;
          canonical_url: string | null;
          title: string | null;
          description: string | null;
          duration_seconds: number | null;
          thumbnail_url: string | null;
          view_count: number | null;
          like_count: number | null;
          upload_date: string | null;
          raw_metadata: Json | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          platform: string;
          platform_video_id: string;
          recipe_id?: string | null;
          video_creator_id?: string | null;
          original_url: string;
          canonical_url?: string | null;
          title?: string | null;
          description?: string | null;
          duration_seconds?: number | null;
          thumbnail_url?: string | null;
          view_count?: number | null;
          like_count?: number | null;
          upload_date?: string | null;
          raw_metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          platform?: string;
          platform_video_id?: string;
          recipe_id?: string | null;
          video_creator_id?: string | null;
          original_url?: string;
          canonical_url?: string | null;
          title?: string | null;
          description?: string | null;
          duration_seconds?: number | null;
          thumbnail_url?: string | null;
          view_count?: number | null;
          like_count?: number | null;
          upload_date?: string | null;
          raw_metadata?: Json | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      video_creators: {
        Row: {
          id: string;
          platform: string;
          platform_user_id: string;
          platform_username: string | null;
          display_name: string | null;
          profile_url: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          platform: string;
          platform_user_id: string;
          platform_username?: string | null;
          display_name?: string | null;
          profile_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          platform?: string;
          platform_user_id?: string;
          platform_username?: string | null;
          display_name?: string | null;
          profile_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
