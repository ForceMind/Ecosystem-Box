import { motion } from 'framer-motion';
import type { EcosystemState, SpeciesId } from '../simulation/ecosystem';

const caps: Record<Exclude<SpeciesId, 'grass'>, number> = {
  insects: 20,
  rabbits: 28,
  foxes: 10,
  wolves: 8,
  decomposers: 18,
};

const icons: Record<Exclude<SpeciesId, 'grass'>, string> = {
  insects: '🦋',
  rabbits: '🐇',
  foxes: '🦊',
  wolves: '🐺',
  decomposers: '🍄',
};

export default function WorldView({ state }: { state: EcosystemState }) {
  const tintClass =
    state.temperature > 36
      ? 'from-red-900/70 via-orange-950/50 to-slate-900'
      : state.rain > 70
        ? 'from-blue-900/70 via-cyan-950/40 to-slate-900'
        : 'from-emerald-900/40 via-teal-950/40 to-slate-900';

  const pressureOverlay = state.ecosystemPressure > 70 ? Math.min(0.35, state.ecosystemPressure / 250) : 0;
  const biodiversitySparkles = state.biodiversity > 65 ? Math.floor(state.biodiversity / 8) : 0;

  const species = (Object.keys(caps) as Array<Exclude<SpeciesId, 'grass'>>).filter((id) =>
    state.unlockedSpecies.includes(id),
  );

  return (
    <div className={`relative h-[78vh] overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-b ${tintClass}`}>
      {state.rain > 60 &&
        Array.from({ length: 35 }).map((_, i) => (
          <div
            key={`rain-${i}`}
            className="absolute h-5 w-px bg-cyan-300/40"
            style={{ left: `${(i * 13) % 100}%`, top: `${(i * 23) % 100}%` }}
          />
        ))}

      <div className="absolute inset-x-0 bottom-0 bg-emerald-700/60" style={{ height: `${20 + state.grass * 0.6}%` }} />

      {pressureOverlay > 0 && <div className="absolute inset-0 bg-red-500" style={{ opacity: pressureOverlay }} />}

      {Array.from({ length: biodiversitySparkles }).map((_, i) => (
        <motion.div
          key={`spark-${i}`}
          className="absolute text-sm"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -8, 0], scale: [0.8, 1.1, 0.8] }}
          transition={{ repeat: Infinity, duration: 2.4 + (i % 3) * 0.5, delay: i * 0.15 }}
          style={{ left: `${(i * 11 + 7) % 95}%`, top: `${20 + ((i * 9) % 30)}%` }}
        >
          ✦
        </motion.div>
      ))}

      {species.map((id) => {
        const count = Math.min(caps[id], Math.floor((state[id] / 100) * caps[id]) + 1);

        return Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={`${id}-${i}`}
            className="absolute text-xl"
            initial={{ opacity: 0.4 }}
            animate={{ x: [0, (i % 4) - 2, 0], y: [0, -5, 0], opacity: [0.5, 0.9, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 + (i % 3), delay: i * 0.1 }}
            style={{ left: `${(i * 17 + id.length * 11) % 95}%`, top: `${45 + ((i * 9) % 45)}%` }}
          >
            {icons[id]}
          </motion.div>
        ));
      })}
    </div>
  );
}
