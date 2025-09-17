import Container from '@/components/Container'
import Markdown from '@/components/Markdown'
import CodeBlock from '@/components/CodeBlock'
import TestTable from '@/components/TestTable'
import Tabs from '@/components/Tabs'
import { serverSupabase } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import DifficultyBadge from '@/components/DifficultyBadge'
import Actions from './Actions'

export default async function TaskDetail({ params }: { params: { slug: string } }) {
  const supabase = serverSupabase()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) redirect('/login')

  const { data: t, error } = await supabase.from('tasks').select('*').eq('slug', params.slug).single()
  if (error) throw new Error(error.message)

  const tabs = [
    { id: 'statement', label: 'Statement', content: <Markdown>{t.statement_md}</Markdown> },
    { id: 'solution',  label: 'Solution',  content: <Markdown>{t.solution_md}</Markdown> },
    { id: 'code',      label: 'Code',      content: <CodeBlock code={t.code_source} language={t.code_language || 'cpp'} /> }
  ]

  function TestCasesTable({ cases }:{ cases: {name:string,input:string,output:string}[] }) {
  if (!cases?.length) return null;
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Test cases</h3>
      <div className="overflow-x-auto rounded-xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="text-left p-3">Name</th>
              <th className="text-left p-3">Input</th>
              <th className="text-left p-3">Output</th>
              <th className="p-3">Copy</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((t, i) => (
              <tr key={i} className="border-t">
                <td className="p-3 font-medium">{t.name}</td>
                <td className="p-3 whitespace-pre">{t.input}</td>
                <td className="p-3 whitespace-pre">{t.output}</td>
                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    <button onClick={() => navigator.clipboard.writeText(t.input)} className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300">
                      Copy input
                    </button>
                    <button onClick={() => navigator.clipboard.writeText(t.output)} className="px-2 py-1 rounded bg-slate-200 hover:bg-slate-300">
                      Copy output
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

  function Statement({ md }: { md: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {md}
      </ReactMarkdown>
    </div>
  );
}

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{t.title}</h1>
          <DifficultyBadge points={t.difficulty_pts} />
        </div>

        <Actions taskId={t.id} points={t.difficulty_pts} tags={t.tags || []} />

        <Tabs tabs={tabs} defaultId="statement" />

        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Test cases</h3>
          <TestTable tests={t.tests || []} />
        </section>
      </div>
    </Container>
  )
}

