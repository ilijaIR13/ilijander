// src/components/Header.tsx (server component)
import Link from "next/link";
import { serverSupabase } from "@/lib/supabaseServer";

export default async function Header() {
  const supa = serverSupabase();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;

  let isAdmin = false;
  if (user) {
    const { data } = await supa.from("app_users").select("role").eq("user_id", user.id).maybeSingle();
    isAdmin = data?.role === "admin";
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">Ilijander</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/tasks" className="hover:underline">Tasks</Link>
          {user && <Link href="/profile" className="hover:underline">Profile</Link>}
          {isAdmin && <Link href="/dashboard" className="hover:underline">Dashboard</Link>}
        </nav>
      </div>
    </header>
  );
}
