import Link from "next/link"

export default function Header() {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / naziv */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Ilijander
        </Link>

        {/* Linkovi */}
        <div className="flex gap-6 text-sm">
          <Link href="/tasks">Tasks</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/signout" className="font-semibold">
            Sign out
          </Link>
        </div>
      </div>
    </nav>
  )
}
