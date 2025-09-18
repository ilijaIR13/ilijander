
import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: "Ilijander",
  description: "Najbolji zadaci profesora Ilijandera",
  themeColor: "#2563eb",
};


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

