import Link from "next/link";
import Container from "@/components/Container";
import { serverSupabase } from "@/lib/supabaseServer";

export default async function TasksPage() {
  const supa = serverSupabase();
  const { data: tasks, error } = await supa
    .from("tasks")
    .select("id, slug, title, difficulty_pts")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) throw new Error(error.message);

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
      <div className="grid gap-3">
        {(tasks ?? []).map((t) => (
          <div key={t.id} className="card p-4 flex items-center justify-between">
            <Link href={`/tasks/${t.slug}`} className="font-medium hover:underline">
              {t.title}
            </Link>
            <span className="tag">{t.difficulty_pts ?? 300}</span>
          </div>
        ))}
        {!tasks?.length && <p className="text-slate-600">No tasks yet.</p>}
      </div>
    </Container>
  );
}
