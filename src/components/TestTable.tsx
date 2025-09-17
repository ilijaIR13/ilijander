import CopyButton from './CopyButton'
type Test = { name: string, input: string, output: string }

export default function TestTable({ tests }: { tests: Test[] }) {
  if (!tests?.length) return null
  return (
    <div className="card p-0 overflow-hidden">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Name</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Input</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500">Output</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {tests.map((t, i) => (
            <tr key={i} className="align-top">
              <td className="px-4 py-3 font-medium text-slate-800">{t.name}</td>
              <td className="px-4 py-3 whitespace-pre-wrap font-mono text-xs">{t.input}</td>
              <td className="px-4 py-3 whitespace-pre-wrap font-mono text-xs">{t.output}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <CopyButton label="Copy input" text={t.input} />
                  <CopyButton label="Copy output" text={t.output} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

