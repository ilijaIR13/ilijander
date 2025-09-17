import "../styles/globals.css"; // <— OVO, ne "./globals.css"
export const metadata = { title: "Ilijander", description: "Task site" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">{children}</body>
    </html>
  );
}
