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

