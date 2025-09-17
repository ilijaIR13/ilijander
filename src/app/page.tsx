import { createServerClient } from @supabaseauth-helpers-nextjs;
import { cookies } from nextheaders;
import { redirect } from nextnavigation;

export default async function SignOut() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );

  await supabase.auth.signOut();

  redirect();
}
