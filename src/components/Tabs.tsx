'use client'
import { useState, ReactNode } from 'react'
import clsx from 'clsx'

type Tab = { id: string; label: string; content: ReactNode }
export default function Tabs({ tabs, defaultId }: { tabs: Tab[]; defaultId?: string }) {
  const [active, setActive] = useState(defaultId ?? tabs[0]?.id)
  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex gap-1 p-2 border-b border-slate-200 bg-slate-50">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={clsx(
              "px-3 py-2 text-sm font-medium rounded-lg",
              active === t.id ? "bg-white shadow-soft" : "hover:bg-white/70"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-5">
        {tabs.find(t => t.id === active)?.content}
      </div>
    </div>
  )
}
