export default function EventLog({ events }: { events: string[] }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
      <h3 className="mb-2 text-sm font-semibold">Live Events</h3>
      <ul className="max-h-40 space-y-1 overflow-auto text-xs text-slate-300">
        {events.length === 0 ? <li>System stable. No alerts.</li> : events.map((e, i) => <li key={`${e}-${i}`}>• {e}</li>)}
=======
      <h3 className="mb-2 text-sm font-semibold">实时事件</h3>
      <ul className="max-h-40 space-y-1 overflow-auto text-xs text-slate-300">
        {events.length === 0 ? <li>系统稳定，暂无预警。</li> : events.map((e, i) => <li key={`${e}-${i}`}>• {e}</li>)}
>>>>>>> theirs
=======
      <h3 className="mb-2 text-sm font-semibold">实时事件</h3>
      <ul className="max-h-40 space-y-1 overflow-auto text-xs text-slate-300">
        {events.length === 0 ? <li>系统稳定，暂无预警。</li> : events.map((e, i) => <li key={`${e}-${i}`}>• {e}</li>)}
>>>>>>> theirs
=======
      <h3 className="mb-2 text-sm font-semibold">实时事件</h3>
      <ul className="max-h-40 space-y-1 overflow-auto text-xs text-slate-300">
        {events.length === 0 ? <li>系统稳定，暂无预警。</li> : events.map((e, i) => <li key={`${e}-${i}`}>• {e}</li>)}
>>>>>>> theirs
      </ul>
    </div>
  );
}
