'use client'
import { useEffect, useState } from 'react'
import { browserSupabase } from '@/lib/supabase'

export default function Actions({ taskId, points, tags }:{
  taskId: string; points: number; tags: string[]
}) {
  const supa = browserSupabase()
  const [solved, setSolved] = useState(false)
  const [fav, setFav] = useState(false)
  const [todo, setTodo] = useState(false)
  const [showTags, setShowTags] = useState(false)

  useEffect(() => {
    ;(async () => {
      const { data: s } = await supa.from('user_task_status')
        .select('solved, viewed_tags').eq('task_id', taskId).maybeSingle()
      setSolved(!!s?.solved)
      setShowTags(!!s?.viewed_tags)

      const { data: f }  = await supa.from('user_task_favorites').select('task_id').eq('task_id', taskId)
      setFav(!!f?.length)

      const { data: td } = await supa.from('user_task_todo').select('task_id').eq('task_id', taskId)
      setTodo(!!td?.length)
    })()
  }, [taskId])

  async function toggleSolved() {
    const next = !solved; setSolved(next)
    await supa.from('user_task_status').upsert({ task_id: taskId, solved: next, done_at: next ? new Date().toISOString() : null })
    await supa.from('user_events').insert({ task_id: taskId, kind: next ? 'mark_solved' : 'unmark_solved' })
    if (next) await supa.from('user_task_done_log').insert({ task_id: taskId })
  }
  async function toggleFav() {
    const next = !fav; setFav(next)
    if (next) await supa.from('user_task_favorites').upsert({ task_id: taskId })
    else await supa.from('user_task_favorites').delete().eq('task_id', taskId)
  }
  async function toggleTodo() {
    const next = !todo; setTodo(next)
    if (next) await supa.from('user_task_todo').upsert({ task_id: taskId })
    else await supa.from('user_task_todo').delete().eq('task_id', taskId)
  }
  async function revealTags() {
    if (showTags) return
    setShowTags(true)
    await supa.from('user_task_status').upsert({ task_id: taskId, viewed_tags: true })
    await supa.from('user_events').insert({ task_id: taskId, kind: 'view_tags' })
  }
  async function toggleSolved() {
  const next = !solved; setSolved(next)
  await supa.from('user_task_status').upsert({
    task_id: taskId, solved: next, done_at: next ? new Date().toISOString() : null
  })
  await supa.from('user_events').insert({ task_id: taskId, kind: next ? 'mark_solved' : 'unmark_solved' })

  if (next) {
    // log za "poslednjih 20"
    await supa.from('user_task_done_log').insert({ task_id: taskId })
    // automatski ukloni iz To-do liste
    setTodo(false)
    await supa.from('user_task_todo').delete().eq('task_id', taskId)
  }
}

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button className={`btn ${solved?'btn-primary':''}`} onClick={toggleSolved}>
        {solved ? 'Marked solved' : 'Mark as solved'}
      </button>
      <button className="btn btn-ghost" onClick={toggleFav}>
        {fav ? '★ Favorite' : '☆ Favorite'}
      </button>
      <button className="btn btn-ghost" onClick={toggleTodo}>
        {todo ? '✔ In To-do' : '＋ To-do'}
      </button>
      <div className="ml-auto">
        <span className="tag bg-slate-50 text-slate-700">Points: {points}</span>
      </div>
      <div className="w-full">
        {!showTags ? (
          <button className="btn btn-ghost" onClick={revealTags}>Show tags</button>
        ) : (
          <div className="mt-2 flex gap-2">{tags?.map((t:string)=><span key={t} className="tag">{t}</span>)}</div>
        )}
      </div>
    </div>
  )
}
