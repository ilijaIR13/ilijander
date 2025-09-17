// src/app/page.tsx
import Link from "next/link";
import Container from "@/components/Container";

export default function Home() {
  return (
    <Container>
      <h1 className="text-2xl font-bold">It works 🎉</h1>
      <p className="text-slate-600 mt-2">Welcome. Open the task list:</p>
      <p className="mt-3">
        <Link href="/tasks" className="btn">Go to Tasks</Link>
      </p>
    </Container>
  );
}
