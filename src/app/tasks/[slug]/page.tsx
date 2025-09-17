import { serverSupabase } from "@/lib/supabaseServer";
import Container from "@/components/Container";
import { notFound } from "next/navigation";

export default async function TaskDetail({ params }: { params: { slug: string } }) {
  const supa = serverSupabase();
  const { data: t } = await supa.from("tasks").select("*").eq("slug", params.slug).maybeSingle();
  if (!t) notFound();

  return (
    <Container>
      <h1 className="text-2xl font-semibold mb-4">{t.title}</h1>
      <div className="prose">
        <h3>Statement</h3>
        <div>{t.statement_md}</div>
      </div>
      <h3 className="mt-6 mb-2 text-lg font-semibold">Test cases</h3>
      <pre className="code-block">{JSON.stringify(t.tests ?? [], null, 2)}</pre>
    </Container>
  );
}
