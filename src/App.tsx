import { useEffect, useMemo, useState } from 'react';
import ControlPanel from './components/ControlPanel';
import WorldView from './components/WorldView';
import {
  applyEnvironmentControl,
  initialState,
  stepEcosystem,
  type EcosystemState,
  unlockDescriptions,
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
=======
  speciesLabels,
>>>>>>> theirs
=======
  speciesLabels,
>>>>>>> theirs
=======
  speciesLabels,
>>>>>>> theirs
} from './simulation/ecosystem';

const speedMs: Record<1 | 2 | 4, number> = { 1: 1000, 2: 500, 4: 250 };

type UnlockToast = {
  id: string;
  title: string;
  body: string;
};

const resultText: Record<EcosystemState['result'], { title: string; message: string }> = {
  playing: { title: '', message: '' },
  basic_win: {
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    title: 'Stable Ecosystem',
    message: 'You kept the ecosystem alive for 100 years.',
  },
  complex_win: {
    title: 'Complex Ecosystem',
    message: 'You created a multi-layer food chain before year 100.',
  },
  perfect_win: {
    title: 'Perfect Ecosystem',
    message: 'Your world reached long-term balance.',
  },
  collapse: {
    title: 'Ecosystem Collapse',
    message: 'The food chain lost its balance.',
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
    title: '稳定生态',
    message: '你让生态系统稳定存活了 100 年。',
  },
  complex_win: {
    title: '复杂生态',
    message: '你在 100 年前构建出多层级食物链。',
  },
  perfect_win: {
    title: '完美生态',
    message: '你的世界达成了长期动态平衡。',
  },
  collapse: {
    title: '生态崩溃',
    message: '食物链失去平衡。',
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  },
};

export default function App() {
  const [state, setState] = useState<EcosystemState>(initialState);
  const [prevState, setPrevState] = useState<EcosystemState | null>(null);
  const [speed, setSpeed] = useState<1 | 2 | 4>(1);
  const [toasts, setToasts] = useState<UnlockToast[]>([]);

  useEffect(() => {
    if (!state.running || state.result !== 'playing') return;

    const timer = setInterval(() => {
      setState((current) => {
        const { state: next, unlocked } = stepEcosystem(current);

        if (unlocked.length > 0) {
          const newToasts = unlocked.map((species) => ({
            id: `${species}-${next.year}-${Math.random().toString(36).slice(2, 8)}`,
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
            title: `New Species Unlocked: ${species}`,
=======
            title: `新物种解锁：${speciesLabels[species]}`,
>>>>>>> theirs
=======
            title: `新物种解锁：${speciesLabels[species]}`,
>>>>>>> theirs
=======
            title: `新物种解锁：${speciesLabels[species]}`,
>>>>>>> theirs
            body: unlockDescriptions[species],
          }));
          setToasts((existing) => [...existing, ...newToasts].slice(-4));
        }

        setPrevState(current);
        return next;
      });
    }, speedMs[speed]);

    return () => clearInterval(timer);
  }, [speed, state.running, state.result]);

  useEffect(() => {
    if (toasts.length === 0) return;
    const timeout = setTimeout(() => {
      setToasts((current) => current.slice(1));
    }, 3600);
    return () => clearTimeout(timeout);
  }, [toasts]);

  const events = useMemo(() => {
    const logs: string[] = [];

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
    if (state.grass < 15) logs.push('Grass ecosystem collapsing');
    if (state.insects > 70) logs.push('Insect bloom detected');
    if (state.unlockedSpecies.includes('rabbits') && state.rabbits < 4) {
      logs.push('Rabbit population near extinction');
    }
    if (state.rabbits > 80) logs.push('Rabbit population explosion');
    if (state.foxes > state.rabbits * 0.4) logs.push('Predator pressure rising');
    if (state.wolves > 15) logs.push('Apex predators dominating');
    if (state.temperature > 36) logs.push('Heat wave damaging ecosystem');
    if (state.ecosystemPressure > 75) logs.push('Ecosystem under severe pressure');
    if (state.biodiversity > 65) logs.push('Biodiversity stabilizing the ecosystem');
    if (state.decomposers > 20) logs.push('Decomposition cycle improving soil');
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
    if (state.grass < 15) logs.push('草地生态正在崩溃');
    if (state.insects > 70) logs.push('检测到昆虫暴发');
    if (state.unlockedSpecies.includes('rabbits') && state.rabbits < 4) {
      logs.push('兔群接近灭绝');
    }
    if (state.rabbits > 80) logs.push('兔群数量爆发');
    if (state.foxes > state.rabbits * 0.4) logs.push('捕食压力上升');
    if (state.wolves > 15) logs.push('顶级捕食者开始主导');
    if (state.temperature > 36) logs.push('热浪正在破坏生态');
    if (state.ecosystemPressure > 75) logs.push('生态系统承受严重压力');
    if (state.biodiversity > 65) logs.push('生物多样性正在稳定生态');
    if (state.decomposers > 20) logs.push('分解循环正在改善土壤');
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs

    return logs;
  }, [state]);

  return (
    <div className="grid min-h-screen grid-cols-1 gap-4 p-4 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-3">
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
        <h1 className="text-2xl font-bold text-emerald-300">Ecosystem Box</h1>
=======
        <h1 className="text-2xl font-bold text-emerald-300">生态箱 Ecosystem Box</h1>
>>>>>>> theirs
=======
        <h1 className="text-2xl font-bold text-emerald-300">生态箱 Ecosystem Box</h1>
>>>>>>> theirs
=======
        <h1 className="text-2xl font-bold text-emerald-300">生态箱 Ecosystem Box</h1>
>>>>>>> theirs
        <WorldView state={state} />

        <div className="space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="rounded border border-emerald-500/40 bg-emerald-900/50 p-3"
            >
              <p className="text-sm font-semibold text-emerald-200">{toast.title}</p>
              <p className="text-xs text-emerald-50/85">{toast.body}</p>
            </div>
          ))}
        </div>

        {state.result !== 'playing' && (
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
            <p className="text-lg font-semibold">{resultText[state.result].title}</p>
            <p className="text-sm text-slate-300">{resultText[state.result].message}</p>
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
            <button
              onClick={() => {
                setState(initialState);
                setPrevState(null);
                setToasts([]);
              }}
              className="mt-3 rounded bg-emerald-700 px-3 py-1 text-sm text-white"
            >
              重新开始
            </button>
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
          </div>
        )}
      </div>

      <ControlPanel
        state={state}
        prev={prevState}
        events={events}
        speed={speed}
        onSpeed={setSpeed}
        onToggle={() => setState((current) => ({ ...current, running: !current.running }))}
        onReset={() => {
          setState(initialState);
          setPrevState(null);
          setToasts([]);
        }}
        onEnvChange={(key, value) =>
          setState((current) => applyEnvironmentControl(current, key, value))
        }
      />
    </div>
  );
}
