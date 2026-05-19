export default function EventLog({ events }: { events: string[] }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
      <h3 className="mb-2 text-sm font-semibold">Live Events</h3>
      <ul className="max-h-40 space-y-1 overflow-auto text-xs text-slate-300">
        {events.length === 0 ? <li>System stable. No alerts.</li> : events.map((e, i) => <li key={`${e}-${i}`}>• {e}</li>)}
      </ul>
    </div>
  );
}
