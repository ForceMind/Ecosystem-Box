import { useEffect, useMemo, useState } from 'react';
import ControlPanel from './components/ControlPanel';
import WorldView from './components/WorldView';
import { initialState, stepEcosystem, type EcosystemState, unlockDescriptions } from './simulation/ecosystem';

const speedMs: Record<1 | 2 | 4, number> = { 1: 1000, 2: 500, 4: 250 };

export default function App() {
  const [state, setState] = useState<EcosystemState>(initialState);
  const [prevState, setPrevState] = useState<EcosystemState | null>(null);
  const [speed, setSpeed] = useState<1 | 2 | 4>(1);
  const [toasts, setToasts] = useState<string[]>([]);

  useEffect(() => {
    if (!state.running || state.result !== 'playing') return;
    const id = setInterval(() => {
      setState((s) => {
        const { state: next, unlocked } = stepEcosystem(s);
        if (unlocked.length) setToasts((t) => [...t, ...unlocked.map((u) => `New Species Unlocked: ${u}. ${unlockDescriptions[u]}`)].slice(-3));
        setPrevState(s);
        return next;
      });
    }, speedMs[speed]);
    return () => clearInterval(id);
  }, [speed, state.running, state.result]);

  const events = useMemo(() => {
    const e: string[] = [];
    if (state.grass < 15) e.push('Grass ecosystem collapsing');
    if (state.insects > 70) e.push('Insect bloom detected');
    if (state.unlockedSpecies.includes('rabbits') && state.rabbits < 4) e.push('Rabbit population near extinction');
    if (state.rabbits > 80) e.push('Rabbit population explosion');
    if (state.foxes > state.rabbits * 0.4) e.push('Predator pressure rising');
    if (state.wolves > 15) e.push('Apex predators dominating');
    if (state.temperature > 36) e.push('Heat wave damaging ecosystem');
    if (state.ecosystemPressure > 75) e.push('Ecosystem under severe pressure');
    if (state.biodiversity > 65) e.push('Biodiversity stabilizing the ecosystem');
    if (state.decomposers > 20) e.push('Decomposition cycle improving soil');
    return e;
  }, [state]);

  return (
    <div className="grid min-h-screen grid-cols-1 gap-4 p-4 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-emerald-300">Ecosystem Box</h1>
        <WorldView state={state} />
        {toasts.map((t, i) => <div key={`${t}-${i}`} className="rounded border border-emerald-600/40 bg-emerald-900/40 p-2 text-sm">{t}</div>)}
        {state.result !== 'playing' && <div className="rounded-xl border border-slate-700 bg-slate-900 p-4"><div className="text-lg font-semibold">{state.result === 'collapse' ? 'Ecosystem Collapse' : state.result === 'perfect_win' ? 'Perfect Ecosystem' : state.result === 'complex_win' ? 'Complex Ecosystem' : 'Stable Ecosystem'}</div><p className="text-sm text-slate-300">{state.result === 'collapse' ? 'The food chain lost its balance.' : 'You maintained long-term ecological progression.'}</p></div>}
      </div>
      <ControlPanel state={state} prev={prevState} events={events} speed={speed} onSpeed={setSpeed} onToggle={() => setState((s) => ({ ...s, running: !s.running }))} onReset={() => { setState(initialState); setPrevState(null); setToasts([]); }} onEnvChange={(key, value) => setState((s) => ({ ...s, [key]: value }))} />
    </div>
  );
}
