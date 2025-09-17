
'use client'

import { useState } from 'react'
import { browserSupabase } from '@/lib/supabase'
import Container from '@/components/Container'
import Card from '@/components/Card'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr(null)
    const supabase = browserSupabase()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setErr(error.message)
    else router.push('/tasks')
  }

  return (
    <Container>
      <div className="max-w-md mx-auto">
        <Card>
          <h1 className="text-xl font-semibold mb-4">Sign in</h1>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="label">Password</label>
              <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
            </div>
            {err && <p className="text-sm text-red-600">{err}</p>}
            <button className="btn btn-primary w-full" type="submit">Continue</button>
          </form>
        </Card>
      </div>
    </Container>
  )
}
