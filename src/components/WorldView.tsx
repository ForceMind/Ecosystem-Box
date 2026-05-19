import { motion } from 'framer-motion';
import type { EcosystemState, SpeciesId } from '../simulation/ecosystem';

const caps: Record<Exclude<SpeciesId, 'grass'>, number> = { insects: 20, rabbits: 28, foxes: 10, wolves: 8, decomposers: 18 };
const icons: Record<Exclude<SpeciesId, 'grass'>, string> = { insects: '🦋', rabbits: '🐇', foxes: '🦊', wolves: '🐺', decomposers: '🍄' };

export default function WorldView({ state }: { state: EcosystemState }) {
  const tint = state.temperature > 36 ? 'from-red-900/70 to-slate-900' : state.rain > 70 ? 'from-blue-900/70 to-slate-900' : 'from-emerald-900/40 to-slate-900';
  const species = (Object.keys(caps) as Array<Exclude<SpeciesId, 'grass'>>).filter((s) => state.unlockedSpecies.includes(s));

  return <div className={`relative h-[78vh] overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-b ${tint}`}>
    {state.rain > 60 && Array.from({ length: 35 }).map((_, i) => <div key={i} className="absolute h-5 w-px bg-cyan-300/40" style={{ left: `${(i * 13) % 100}%`, top: `${(i * 23) % 100}%` }} />)}
    <div className="absolute inset-x-0 bottom-0 bg-emerald-700/60" style={{ height: `${20 + state.grass * 0.6}%` }} />
    {state.ecosystemPressure > 70 && <div className="absolute inset-0 bg-red-500/15" />}
    {species.map((s) => {
      const count = Math.min(caps[s], Math.floor((state[s] / 100) * caps[s]) + 1);
      return Array.from({ length: count }).map((_, i) => (
        <motion.div key={`${s}-${i}`} className="absolute text-xl" initial={{ opacity: 0.4 }} animate={{ x: [0, (i % 4) - 2, 0], y: [0, -5, 0], opacity: [0.5, 0.9, 0.6] }} transition={{ repeat: Infinity, duration: 2 + (i % 3), delay: i * 0.1 }} style={{ left: `${(i * 17 + s.length * 11) % 95}%`, top: `${45 + ((i * 9) % 45)}%` }}>
          {icons[s]}
        </motion.div>
      ));
    })}
  </div>;
}
