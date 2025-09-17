import Container from "@/components/Container";
import Link from "next/link";
import { serverSupabase } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ProfilePage() {
  const supa = serverSupabase();
  const { data: auth } = await supa.auth.getUser();
  if (!auth?.user) redirect("/login");

  const { data: solvedRows } = await supa
    .from("user_task_status")
    .select("task_id, done_at")
    .eq("solved", true)
    .order("done_at", { ascending: false });

  let solved: Array<{ id: string; slug: string; title: string; done_at?: string }> = [];
  if (solvedRows?.length) {
    const ids = solvedRows.map((r) => r.task_id);
    const { data } = await supa.from("tasks").select("id, slug, title").in("id", ids);
    const map = new Map(data?.map((t) => [t.id, t]));
    solved = solvedRows
      .map((r) => ({ ...(map.get(r.task_id) as any), done_at: r.done_at }))
      .filter(Boolean);
  }

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <h2 className="text-lg font-semibold mb-2">Solved</h2>
      <div className="grid gap-3">
        {solved.length ? (
          solved.map((t) => (
            <div key={t.id} className="card p-4 flex items-center justify-between">
              <Link href={`/tasks/${t.slug}`} className="hover:underline">
                {t.title}
              </Link>
              <span className="text-xs text-slate-500">
                {t.done_at ? new Date(t.done_at).toLocaleString() : ""}
              </span>
            </div>
          ))
        ) : (
          <p className="text-slate-600">No solved tasks yet.</p>
        )}
      </div>
    </Container>
  );
}
