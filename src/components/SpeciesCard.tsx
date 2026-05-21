type Props = { icon: string; name: string; count: number; trend: 'up' | 'down' | 'stable'; description: string };

export default function SpeciesCard({ icon, name, count, trend, description }: Props) {
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  const trendText = trend === 'up' ? '↑ Rising' : trend === 'down' ? '↓ Declining' : '→ Stable';
=======
  const trendText = trend === 'up' ? '↑ 上升' : trend === 'down' ? '↓ 下降' : '→ 稳定';
>>>>>>> theirs
=======
  const trendText = trend === 'up' ? '↑ 上升' : trend === 'down' ? '↓ 下降' : '→ 稳定';
>>>>>>> theirs
=======
  const trendText = trend === 'up' ? '↑ 上升' : trend === 'down' ? '↓ 下降' : '→ 稳定';
>>>>>>> theirs
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-3">
      <div className="flex items-center justify-between">
        <div className="text-lg">{icon} <span className="text-sm font-semibold">{name}</span></div>
        <div className="text-sm text-slate-300">{count.toFixed(1)}</div>
      </div>
      <p className="mt-1 text-xs text-slate-400">{description}</p>
      <p className="mt-2 text-xs text-emerald-300">{trendText}</p>
    </div>
  );
}
