// src/app/dashboard/page.tsx
import { serverSupabase } from "@/lib/supabaseServer";
import { notFound, redirect } from "next/navigation";
import Container from "@/components/Container";

// ❗ Spreči build-time prerender /dashboard
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function DashboardPage() {
  const supa = serverSupabase();
  const { data: auth } = await supa.auth.getUser();
  if (!auth?.user) redirect("/login");

  // admin guard
  const { data: u } = await supa
    .from("app_users")
    .select("role")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (u?.role !== "admin") notFound();

  // ⚠️ NIŠTA ne “renderuj” što je plain object (npr. JSON) direktno u JSX.
  // Ako želiš da vidiš podatke, stringifikuj:
  // <pre>{JSON.stringify(nekiObjekat, null, 2)}</pre>

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <p className="text-slate-600">
        Admin-only page (runtime rendered). Add your forms and tables here.
      </p>
      {/* ...tvoj dashboard UI... */}
    </Container>
  );
}
