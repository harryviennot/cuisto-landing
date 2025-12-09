import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Creates a Supabase client for server-side operations (ISR/SSR pages).
 * Uses the service key for full access to public data.
 *
 * Note: This client is created fresh for each request to avoid
 * sharing state between requests in serverless environments.
 */
export function createServerSupabase() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "Missing Supabase environment variables. Ensure SUPABASE_URL and SUPABASE_SECRET_KEY are set."
    );
  }

  return createClient<Database>(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Singleton client for build-time operations.
 * Only use this for generateStaticParams and similar build-time functions.
 */
let buildTimeClient: ReturnType<typeof createClient<Database>> | null = null;

export function getBuildTimeSupabase() {
  if (buildTimeClient) return buildTimeClient;

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    // Return null during build if env vars not set (e.g., in CI without secrets)
    return null;
  }

  buildTimeClient = createClient<Database>(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return buildTimeClient;
}
