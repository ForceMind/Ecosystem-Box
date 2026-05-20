import { Pause, Play, RotateCcw, Sprout } from 'lucide-react';
import type { EcosystemState } from '../simulation/ecosystem';
import SpeciesCard from './SpeciesCard';
import StatCard from './StatCard';
import EventLog from './EventLog';

type Props = {
  state: EcosystemState;
  prev: EcosystemState | null;
  events: string[];
  speed: 1 | 2 | 4;
  onSpeed: (n: 1 | 2 | 4) => void;
  onToggle: () => void;
  onReset: () => void;
  onEnvChange: (key: 'rain' | 'temperature' | 'soilFertility', value: number) => void;
};

const speciesInfo = [
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  ['grass', '🌱', 'Grass', 'Primary producer of ecosystem energy.'],
  ['insects', '🦋', 'Insects', 'Pollination support and biodiversity booster.'],
  ['rabbits', '🐇', 'Rabbits', 'Fast herbivore growth and grazing pressure.'],
  ['foxes', '🦊', 'Foxes', 'Controls rabbit surges as mid predator.'],
  ['wolves', '🐺', 'Wolves', 'Apex predator controlling food-web structure.'],
  ['decomposers', '🍄', 'Decomposers', 'Recycle dead biomass into fertility.'],
] as const;

function getStage(state: EcosystemState): string {
  if (state.unlockedSpecies.includes('decomposers')) return 'Full Cycle Stage';
  if (state.unlockedSpecies.includes('wolves')) return 'Apex Predator Stage';
  if (state.unlockedSpecies.includes('foxes')) return 'Predator Stage';
  if (state.unlockedSpecies.includes('rabbits')) return 'Herbivore Stage';
  if (state.unlockedSpecies.includes('insects')) return 'Insect Stage';
  return 'Plant Stage';
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  ['grass', '🌱', '草', '生态系统能量的初级生产者。'],
  ['insects', '🦋', '昆虫', '帮助授粉并提升生物多样性。'],
  ['rabbits', '🐇', '兔子', '繁殖快，带来强烈啃食压力。'],
  ['foxes', '🦊', '狐狸', '中层捕食者，可抑制兔群暴增。'],
  ['wolves', '🐺', '狼', '顶级捕食者，重塑食物网结构。'],
  ['decomposers', '🍄', '分解者', '将死亡生物量回收为土壤肥力。'],
] as const;

function getStage(state: EcosystemState): string {
  if (state.unlockedSpecies.includes('decomposers')) return '完整循环阶段';
  if (state.unlockedSpecies.includes('wolves')) return '顶级捕食者阶段';
  if (state.unlockedSpecies.includes('foxes')) return '捕食者阶段';
  if (state.unlockedSpecies.includes('rabbits')) return '食草动物阶段';
  if (state.unlockedSpecies.includes('insects')) return '昆虫阶段';
  return '植物阶段';
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
}

export default function ControlPanel({
  state,
  prev,
  events,
  speed,
  onSpeed,
  onToggle,
  onReset,
  onEnvChange,
}: Props) {
  const stage = getStage(state);
  const health =
    state.ecosystemPressure < 40
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
      ? 'BALANCED'
      : state.ecosystemPressure < 75
        ? 'UNSTABLE'
        : 'COLLAPSING';
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
      ? '稳定'
      : state.ecosystemPressure < 75
        ? '波动'
        : '崩溃中';
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-700 bg-panel p-4">
        <div className="flex items-center gap-2 text-xl font-bold">
          <Sprout className="h-5 w-5 text-emerald-300" />
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
          <span>Year {state.year}</span>
=======
          <span>第 {state.year} 年</span>
>>>>>>> theirs
=======
          <span>第 {state.year} 年</span>
>>>>>>> theirs
=======
          <span>第 {state.year} 年</span>
>>>>>>> theirs
        </div>
        <div className="text-sm text-slate-400">{stage}</div>
        <div
          className={`mt-1 text-xs font-semibold ${
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
            health === 'BALANCED'
              ? 'text-emerald-300'
              : health === 'UNSTABLE'
=======
            health === '稳定'
              ? 'text-emerald-300'
              : health === '波动'
>>>>>>> theirs
=======
            health === '稳定'
              ? 'text-emerald-300'
              : health === '波动'
>>>>>>> theirs
=======
            health === '稳定'
              ? 'text-emerald-300'
              : health === '波动'
>>>>>>> theirs
                ? 'text-amber-300'
                : 'text-red-300'
          }`}
        >
          {health}
        </div>

        <div className="mt-3 flex gap-2">
          <button onClick={onToggle} className="rounded bg-emerald-600 px-3 py-1 text-sm">
            {state.running ? <Pause className="inline h-4" /> : <Play className="inline h-4" />}{' '}
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
            {state.running ? 'Pause' : 'Play'}
          </button>
          <button onClick={onReset} className="rounded bg-slate-700 px-3 py-1 text-sm">
            <RotateCcw className="inline h-4" /> Reset
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
            {state.running ? '暂停' : '运行'}
          </button>
          <button onClick={onReset} className="rounded bg-slate-700 px-3 py-1 text-sm">
            <RotateCcw className="inline h-4" /> 重置
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          {([1, 2, 4] as const).map((n) => (
            <button
              key={n}
              className={`rounded px-2 py-1 text-xs ${speed === n ? 'bg-cyan-700' : 'bg-slate-700'}`}
              onClick={() => onSpeed(n)}
            >
              {n}x
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
        <StatCard label="Ecosystem Pressure" value={state.ecosystemPressure} color="bg-red-500" />
        <StatCard label="Biodiversity" value={state.biodiversity} color="bg-emerald-500" />
        <StatCard label="Disease Risk" value={state.diseaseRisk} color="bg-amber-500" />
        <StatCard label="Dead Biomass" value={state.deadBiomass} color="bg-violet-500" />
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
        <StatCard label="生态压力" value={state.ecosystemPressure} color="bg-red-500" />
        <StatCard label="生物多样性" value={state.biodiversity} color="bg-emerald-500" />
        <StatCard label="疾病风险" value={state.diseaseRisk} color="bg-amber-500" />
        <StatCard label="死亡生物量" value={state.deadBiomass} color="bg-violet-500" />
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
      </div>

      <div className="space-y-2 rounded-xl border border-slate-700 bg-panel p-3">
        <label className="text-xs">
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
          Rain {state.rain.toFixed(0)}
=======
          降雨 {state.rain.toFixed(0)}
>>>>>>> theirs
=======
          降雨 {state.rain.toFixed(0)}
>>>>>>> theirs
=======
          降雨 {state.rain.toFixed(0)}
>>>>>>> theirs
          <input
            type="range"
            min={0}
            max={100}
            value={state.rain}
            onChange={(e) => onEnvChange('rain', Number(e.target.value))}
          />
        </label>
        <label className="text-xs">
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
          Temperature {state.temperature.toFixed(0)}°C
=======
          温度 {state.temperature.toFixed(0)}°C
>>>>>>> theirs
=======
          温度 {state.temperature.toFixed(0)}°C
>>>>>>> theirs
=======
          温度 {state.temperature.toFixed(0)}°C
>>>>>>> theirs
          <input
            type="range"
            min={-10}
            max={50}
            value={state.temperature}
            onChange={(e) => onEnvChange('temperature', Number(e.target.value))}
          />
        </label>
        <label className="text-xs">
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
          Soil Fertility {state.soilFertility.toFixed(0)}
=======
          土壤肥力 {state.soilFertility.toFixed(0)}
>>>>>>> theirs
=======
          土壤肥力 {state.soilFertility.toFixed(0)}
>>>>>>> theirs
=======
          土壤肥力 {state.soilFertility.toFixed(0)}
>>>>>>> theirs
          <input
            type="range"
            min={0}
            max={100}
            value={state.soilFertility}
            onChange={(e) => onEnvChange('soilFertility', Number(e.target.value))}
          />
        </label>
      </div>

      <div className="grid gap-2">
        {speciesInfo
          .filter(([id]) => state.unlockedSpecies.includes(id))
          .map(([id, icon, name, description]) => {
            const key = id as keyof EcosystemState;
            const current = state[key] as number;
            const previous = prev ? (prev[key] as number) : current;
            const trend = current > previous + 0.5 ? 'up' : current < previous - 0.5 ? 'down' : 'stable';

            return (
              <SpeciesCard
                key={id}
                icon={icon}
                name={name}
                count={current}
                trend={trend}
                description={description}
              />
            );
          })}
      </div>

      <EventLog events={events} />
    </div>
  );
}
