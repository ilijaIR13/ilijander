async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setMsg(null);

  // ⚠️ važno: referencu na form uzmi PRE await
  const form = e.currentTarget;
  const fd = new FormData(form);

  // --- Tests JSON (input mora da se zove tests_json) ---
  // Očekujemo niz objekata: [{ name, input, output }]
  let tests: Array<{ name?: string; input: string; output: string }> = [];
  const rawTests = String(fd.get("tests_json") || "").trim();
  if (rawTests.length) {
    try {
      const parsed = JSON.parse(rawTests);
      if (!Array.isArray(parsed)) throw new Error("Tests JSON mora biti niz []");
      // grubi sanitize
      tests = parsed.map((t: any, i: number) => ({
        name: String(t?.name ?? `case ${i + 1}`),
        input: String(t?.input ?? ""),
        output: String(t?.output ?? ""),
      }));
    } catch (err: any) {
      setMsg("Tests JSON nije validan.");
      return;
    }
  }

  // --- Payload ---
  // ⚠️ Promena: umesto difficulty (text), sada šaljemo difficulty_pts (number 100–1000)
  const points = Number(fd.get("difficulty_pts") || 300);
  if (Number.isNaN(points) || points < 100 || points > 1000) {
    setMsg("Points (difficulty_pts) mora biti broj 100–1000.");
    return;
  }

  const payload = {
    slug: String(fd.get("slug") || "").trim(),
    title: String(fd.get("title") || "").trim(),
    tags: String(fd.get("tags") || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    difficulty_pts: points,

    statement_md: String(fd.get("statement_md") || ""),
    solution_md: String(fd.get("solution_md") || ""),

    code_language: String(fd.get("code_language") || "cpp"),
    code_source: String(fd.get("code_source") || ""),

    tests,
  };

  // brze validacije
  if (!payload.slug) return setMsg("Slug je obavezan.");
  if (!payload.title) return setMsg("Title je obavezan.");

  const { error } = await supa.from("tasks").insert(payload as any);

  if (error) {
    setMsg(error.message);
  } else {
    setMsg("Task created ✔️");
    form.reset(); // sada je form referenca validna
  }
}
