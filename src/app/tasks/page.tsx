import Container from '@/components/Container'
import Card from '@/components/Card'
import Link from 'next/link'
import { serverSupabase } from '@/lib/supabaseServer'
import { redirect } from 'next/navigation'
import FilterBar from './FilterBar'
import DifficultyBadge from '@/components/DifficultyBadge'

export default async function TasksPage({ searchParams }: { searchParams?: Record<string,string> }) {
  const supabase = serverSupabase()
  const { data: auth } = await supabase.auth.getUser()
  if (!auth?.user) redirect('/login')

  const q   = searchParams?.q   || ''
  const tag = (searchParams?.tag || '').toLowerCase()
  const min = parseInt(searchParams?.min || '0', 10)
  const max = parseInt(searchParams?.max || '100000', 10)
  const wantFav     = searchParams?.favorites === '1'
  const wantSolved  = searchParams?.solved === '1'
  const wantUnsolved= searchParams?.unsolved === '1'

  let { data: tasks, error } = await supabase
    .from('tasks')
    .select('id, slug, title, tags, difficulty_pts, created_at')
    .order('created_at', { ascending: false })
    .limit(500)
  if (error) throw new Error(error.message)

  const { data: status } = await supabase.from('user_task_status').select('task_id, solved')
  const solvedIds = new Set(status?.filter(s=>s.solved).map(s=>s.task_id))

  const { data: favs } = await supabase.from('user_task_favorites').select('task_id')
  const favIds = new Set(favs?.map(f=>f.task_id))

  tasks = (tasks || []).filter(t => {
    const matchQ = q ? t.title.toLowerCase().includes(q.toLowerCase()) : true
    const matchTag = tag
      ? (t.tags || []).some((x:string) => x.toLowerCase().includes(tag))
      : true
    const matchPts = t.difficulty_pts >= min && t.difficulty_pts <= max
    const matchFav = wantFav ? favIds.has(t.id) : true
    const matchSolved =
      wantSolved ? solvedIds.has(t.id)
      : wantUnsolved ? !solvedIds.has(t.id)
      : true
    return matchQ && matchTag && matchPts && matchFav && matchSolved
  })

  return (
    <Container>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Tasks</h1>
        <p className="text-slate-600">Search by title/tag, filter by points, favorites, solved/unsolved.</p>
      </div>

      <FilterBar />

      <div className="grid gap-4 mt-4">
        {tasks?.map((t) => (
          <Card key={t.id} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <Link href={`/tasks/${t.slug}`} className="text-lg font-semibold hover:underline">{t.title}</Link>
              <DifficultyBadge points={t.difficulty_pts} />
            </div>
          </Card>
        ))}
        {!tasks?.length && <p className="text-slate-600">No tasks found.</p>}
      </div>
    </Container>
  )
}
