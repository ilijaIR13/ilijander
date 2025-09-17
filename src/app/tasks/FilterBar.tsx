// src/app/tasks/FilterBar.tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function FilterBar() {
  const sp = useSearchParams();
  const router = useRouter();

  const [q, setQ] = useState(sp.get("q") || "");
  const [tag, setTag] = useState(sp.get("tag") || "");
  const [min, setMin] = useState(sp.get("min") || "100");
  const [max, setMax] = useState(sp.get("max") || "1000");
  const [fav, setFav] = useState(sp.get("favorites") === "1");
  const [solved, setSolved] = useState(sp.get("solved") === "1");
  const [unsolved, setUnsolved] = useState(sp.get("unsolved") === "1");

  useEffect(() => {
    setQ(sp.get("q") || "");
    setTag(sp.get("tag") || "");
  }, [sp]);

  function apply() {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (tag) p.set("tag", tag);
    if (min) p.set("min", min);
    if (max) p.set("max", max);
    if (fav) p.set("favorites", "1");
    if (solved) p.set("solved", "1");
    if (unsolved) p.set("unsolved", "1");
    router.push(`/tasks?${p.toString()}`);
  }

  function resetAll() {
    setQ("");
    setTag("");
    setMin("100");
    setMax("1000");
    setFav(false);
    setSolved(false);
    setUnsolved(false);
    router.push("/tasks");
  }

  return (
    <div className="card p-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        <div className="md:col-span-3">
          <label className="text-xs text-slate-500">Search</label>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="title..." className="input w-full" />
        </div>

        <div className="md:col-span-3">
          <label className="text-xs text-slate-500">Tag</label>
          <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g. arrays" className="input w-full" />
        </div>

        <div className="md:col-span-3">
          <label className="text-xs text-slate-500">Min points</label>
          <input value={min} onChange={(e) => setMin(e.target.value)} placeholder="100" className="input w-full" />
        </div>

        <div className="md:col-span-3">
          <label className="text-xs text-slate-500">Max points</label>
          <input value={max} onChange={(e) => setMax(e.target.value)} placeholder="1000" className="input w-full" />
        </div>

        <div className="md:col-span-12 flex flex-wrap items-center gap-4 pt-1">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={fav} onChange={(e) => setFav(e.target.checked)} /> Favorites
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={solved} onChange={(e) => setSolved(e.target.checked)} /> Solved
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={unsolved} onChange={(e) => setUnsolved(e.target.checked)} /> Unsolved
          </label>

          <div className="ml-auto flex gap-2">
            <button className="btn" onClick={apply}>Apply</button>
            <button className="btn btn-ghost" onClick={resetAll}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}
