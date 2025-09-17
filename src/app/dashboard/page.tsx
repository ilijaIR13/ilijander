import { serverSupabase } from "@/lib/supabaseServer";
import { notFound, redirect } from "next/navigation";
import Container from "@/components/Container";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function DashboardPage() {
  const supa = serverSupabase();
  const { data: auth } = await supa.auth.getUser();
  if (!auth?.user) redirect("/login");

  const { data } = await supa.from("app_users").select("role").eq("user_id", auth.user.id).maybeSingle();
  if (data?.role !== "admin") notFound();

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <p className="text-slate-600">Admin-only.</p>
    </Container>
  );
}
