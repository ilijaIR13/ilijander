
import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'TaskVault',
  description: 'Clean repository of programming tasks with solutions and code',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="py-8">
          {children}
        </main>
      </body>
    </html>
  )
}
