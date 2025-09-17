import "../styles/globals.css";
import Header from "@/components/Header";

export const metadata = { title: "Ilijander", description: "Task site" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        {children}
      </body>
    </html>
  );
}
