import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function supabaseServerClient() {
  // @ts-expect-error: createServerClient est marqué comme déprécié dans les types, mais c'est la méthode recommandée pour l'instant.
  return createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    cookies,
  });
}