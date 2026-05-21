type StatCardProps = { label: string; value: number; color: string };

export default function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
      <div className="mb-2 text-xs uppercase tracking-wide text-slate-400">{label}</div>
      <div className="h-2 w-full rounded bg-slate-800">
        <div className={`h-full rounded ${color}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
      </div>
      <div className="mt-2 text-sm font-semibold text-slate-100">{value.toFixed(1)}</div>
    </div>
  );
}
