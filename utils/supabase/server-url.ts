export function getSupabaseServerUrl(): string | undefined {
  return process.env.MUNDA_SUPABASE_INTERNAL_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
}
