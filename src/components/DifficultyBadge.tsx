export default function DifficultyBadge({ points }: { points: number }) {
  const cls =
    points >= 900 ? 'bg-red-100 text-red-800' :
    points >= 700 ? 'bg-orange-100 text-orange-800' :
    points >= 500 ? 'bg-amber-100 text-amber-800' :
    points >= 300 ? 'bg-green-100 text-green-800' :
                    'bg-slate-100 text-slate-800'; // 100–200
  return <span className={`tag ${cls}`}>{points}</span>
}
