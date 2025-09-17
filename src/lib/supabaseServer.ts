
          // src/lib/supabaseServer.ts
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

export function serverSupabase() {
  const cookieStore = cookies(); // za auth session cookie
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Cookie: cookieStore.toString() } } }
  );
}

