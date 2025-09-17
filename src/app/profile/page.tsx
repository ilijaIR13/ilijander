// src/app/profile/page.tsx
import Container from "@/components/Container";
import DifficultyBadge from "@/components/DifficultyBadge";
import Link from "next/link";
import { serverSupabase } from "@/lib/supabaseServer";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const supa = serverSupabase();
  const { data: auth } = await supa.auth.getUser();
  if (!auth?.user) redirect("/login");

  // Solved
  const { data: solvedRows } = await supa
    .from("user_task_status")
    .select("task_id, done_at")
    .eq("solved", true)
    .order("done_at", { ascending: false });

  let solvedTasks: any[] = [];
  if (solvedRows?.length) {
    const ids = solvedRows.map((r) => r.task_id);
    const { data } = await supa
      .from("tasks")
      .select("id, slug, title, difficulty_pts")
      .in("id", ids);
    const map = new Map(data?.map((t) => [t.id, t]));
    solvedTasks = solvedRows
      .map((r) => ({ ...map.get(r.task_id), done_at: r.done_at }))
      .filter(Boolean);
  }

  // Favorites (max 20)
  const { data: favRows } = await supa.from("user_task_favorites").select("task_id").limit(20);
  let favoriteTasks: any[] = [];
  if (favRows?.length) {
    const ids = favRows.map((r) => r.task_id);
    const { data } = await supa
      .from("tasks")
      .select("id, slug, title, difficulty_pts")
      .in("id", ids);
    favoriteTasks = data || [];
  }

  // To-do (max 20)
  const { data: todoRows } = await supa
    .from("user_task_todo")
    .select("task_id, created_at")
    .order("created_at", { ascending: false })
    .limit(20);
  let todoTasks: any[] = [];
  if (todoRows?.length) {
    const ids = todoRows.map((r) => r.task_id);
    const { data } = await supa
      .from("tasks")
      .select("id, slug, title, difficulty_pts")
      .in("id", ids);
    const map = new Map(data?.map((t) => [t.id, t]));
    todoTasks = todoRows
      .map((r) => ({ ...map.get(r.task_id), created_at: r.created_at }))
      .filter(Boolean);
  }

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-6">Profile</h1>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Solved</h2>
        <div className="grid gap-3">
          {solvedTasks.length ? (
            solvedTasks.map((t) => (
              <div key={t.id} className="card p-4 flex items-center justify-between">
                <Link href={`/tasks/${t.slug}`} className="font-medium hover:underline">{t.title}</Link>
                <div className="flex items-center gap-3">
                  <DifficultyBadge points={t.difficulty_pts} />
                  <span className="text-xs text-slate-500">
                    {t.done_at ? new Date(t.done_at).toLocaleString() : ""}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-600">No solved tasks yet.</p>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Favorites (max 20)</h2>
        <div className="grid gap-3">
          {favoriteTasks.length ? (
            favoriteTasks.map((t) => (
              <div key={t.id} className="card p-4 flex items-center justify-between">
                <Link href={`/tasks/${t.slug}`} className="font-medium hover:underline">{t.title}</Link>
                <DifficultyBadge points={t.difficulty_pts} />
              </div>
            ))
          ) : (
            <p className="text-slate-600">No favorites yet.</p>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">To-do (max 20)</h2>
        <div className="grid gap-3">
          {todoTasks.length ? (
            todoTasks.map((t) => (
              <div key={t.id} className="card p-4 flex items-center justify-between">
                <Link href={`/tasks/${t.slug}`} className="font-medium hover:underline">{t.title}</Link>
                <DifficultyBadge points={t.difficulty_pts} />
              </div>
            ))
          ) : (
            <p className="text-slate-600">Empty to-do list.</p>
          )}
        </div>
      </section>
    </Container>
  );
}
