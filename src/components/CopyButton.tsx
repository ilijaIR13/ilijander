
'use client'
import { useState } from 'react'

export default function CopyButton({ text, label='Copy' }: { text: string, label?: string }) {
  const [ok, setOk] = useState(false)
  return (
    <button className="btn btn-ghost text-xs" onClick={async () => {
      await navigator.clipboard.writeText(text)
      setOk(true)
      setTimeout(()=>setOk(false), 1200)
    }}>{ok ? 'Copied!' : label}</button>
  )
}
