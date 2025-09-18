// Header.tsx (server component)
import Link from "next/link";
import { serverSupabase } from "@/lib/supabaseServer";

export default async function Header() {
  const supa = serverSupabase();
  const { data: auth } = await supa.auth.getUser();
  const user = auth?.user;

  // sačuvano u bazi: app_users(user_id pk, role text 'admin'|'user')
  let isAdmin = false;
  if (user) {
    const { data } = await supa.from("app_users").select("role").eq("user_id", user.id).maybeSingle();
    isAdmin = data?.role === "admin";
  }

  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-3">
      <div className="font-bold">Ilijander</div>
      <div className="flex gap-4">
        <a href="/tasks">Tasks</a>
        <a href="/profile">Profile</a>
        <a href="/dashboard">Dashboard</a>
        <a href="/signout" className="font-semibold">Sign out</a>
      </div>
    </nav>
  )
}


