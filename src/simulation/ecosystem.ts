export type SpeciesId = 'grass' | 'insects' | 'rabbits' | 'foxes' | 'wolves' | 'decomposers';
export type GameResult = 'playing' | 'basic_win' | 'complex_win' | 'perfect_win' | 'collapse';

export type EcosystemState = {
  year: number;
  running: boolean;
  grass: number;
  insects: number;
  rabbits: number;
  foxes: number;
  wolves: number;
  decomposers: number;
  rain: number;
  temperature: number;
  soilFertility: number;
  ecosystemPressure: number;
  biodiversity: number;
  deadBiomass: number;
  diseaseRisk: number;
  unlockedSpecies: SpeciesId[];
  collapseYears: number;
  noWolfYears: number;
  result: GameResult;
};

export const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export const initialState: EcosystemState = {
  year: 0, running: true, grass: 45, insects: 0, rabbits: 0, foxes: 0, wolves: 0, decomposers: 0,
  rain: 50, temperature: 24, soilFertility: 50, ecosystemPressure: 22, biodiversity: 10,
  deadBiomass: 0, diseaseRisk: 5, unlockedSpecies: ['grass'], collapseYears: 0, noWolfYears: 0, result: 'playing',
};

export const unlockDescriptions: Record<SpeciesId, string> = {
  grass: 'Plant base established.', insects: 'Pollinators amplify plant growth and diversity.', rabbits: 'Herbivores add strong grazing pressure.',
  foxes: 'Predators can regulate rabbit surges.', wolves: 'Apex predators reshape predator balance.', decomposers: 'Decomposition closes nutrient loops.'
};

const has = (s: EcosystemState, id: SpeciesId) => s.unlockedSpecies.includes(id);

export function stepEcosystem(prev: EcosystemState): { state: EcosystemState; unlocked: SpeciesId[] } {
  if (!prev.running || prev.result !== 'playing') return { state: prev, unlocked: [] };
  const next = { ...prev, year: prev.year + 1 };

  next.grass += next.rain * 0.035 + next.soilFertility * 0.025 + next.insects * 0.015;
  next.grass -= next.rabbits * 0.45 + Math.max(0, next.temperature - 30) * 0.9;
  next.grass = clamp(next.grass, 0, 100);

  if (has(next, 'insects')) {
    next.insects += next.grass * 0.025;
    next.insects += next.temperature > 8 && next.temperature < 34 ? 1.2 : -1.2;
    next.insects -= next.diseaseRisk * 0.03;
    next.insects = clamp(next.insects, 0, 100);
  }

  if (has(next, 'rabbits')) {
    next.rabbits += next.grass * 0.025;
    next.rabbits -= next.foxes * 0.55 + next.wolves * 0.3;
    next.rabbits -= Math.max(0, 15 - next.grass) * 0.5 + next.diseaseRisk * 0.04;
    next.rabbits = clamp(next.rabbits, 0, 150);
  }

  if (has(next, 'foxes')) {
    next.foxes += next.rabbits * 0.012;
    next.foxes -= Math.max(0, 8 - next.rabbits) * 0.35 + next.wolves * 0.08;
    next.foxes = clamp(next.foxes, 0, 60);
  }

  if (has(next, 'wolves')) {
    next.wolves += (next.rabbits + next.foxes) * 0.004;
    next.wolves -= Math.max(0, 15 - next.rabbits) * 0.18;
    next.wolves = clamp(next.wolves, 0, 40);
  }

  next.deadBiomass += Math.max(0, prev.rabbits - next.rabbits) * 0.2;
  next.deadBiomass += Math.max(0, prev.foxes - next.foxes) * 0.3;
  next.deadBiomass += Math.max(0, prev.wolves - next.wolves) * 0.5;

  if (has(next, 'decomposers')) {
    next.decomposers += next.deadBiomass * 0.035;
    next.decomposers -= Math.max(0, 8 - next.deadBiomass) * 0.2;
    next.deadBiomass -= next.decomposers * 0.25;
    next.soilFertility += next.decomposers * 0.18;
    next.decomposers = clamp(next.decomposers, 0, 80);
  }

  const bonus = (next.grass > 30 ? 8 : 0) + (next.insects > 10 ? 8 : 0) + (next.rabbits > 10 ? 8 : 0) + (next.foxes > 2 ? 8 : 0) + (next.wolves > 1 ? 8 : 0) + (next.decomposers > 5 ? 8 : 0);
  next.biodiversity = clamp(next.unlockedSpecies.length * 8 + bonus, 0, 100);

  next.diseaseRisk += Math.max(0, next.rabbits - 80) * 0.3 + Math.max(0, next.insects - 80) * 0.2 - next.biodiversity * 0.15;
  next.diseaseRisk = clamp(next.diseaseRisk, 0, 100);

  let pressure = 0;
  pressure += Math.max(0, 35 - next.grass) * 0.8;
  pressure += Math.max(0, next.rabbits - next.grass) * 0.35;
  pressure += Math.max(0, next.foxes + next.wolves - next.rabbits * 0.25) * 1.4;
  pressure += Math.max(0, 25 - next.rain) * 0.4;
  pressure += Math.max(0, next.temperature - 34) * 2;
  pressure += next.diseaseRisk * 0.4;
  pressure -= next.biodiversity * 0.25;
  pressure -= next.decomposers * 0.12;
  next.ecosystemPressure = clamp(pressure, 0, 100);

  next.deadBiomass = clamp(next.deadBiomass, 0, 100);
  next.soilFertility = clamp(next.soilFertility, 0, 100);

  const unlocked: SpeciesId[] = [];
  const unlock = (id: SpeciesId, condition: boolean) => {
    if (condition && !next.unlockedSpecies.includes(id)) { next.unlockedSpecies = [...next.unlockedSpecies, id]; unlocked.push(id); }
  };
  unlock('insects', next.grass > 50 && next.soilFertility > 40 && next.year > 5);
  unlock('rabbits', next.grass > 65 && next.insects > 20 && next.year > 10);
  unlock('foxes', next.rabbits > 40 && next.grass < 45 && next.ecosystemPressure > 50);
  unlock('wolves', next.rabbits > 70 && next.foxes > 8 && next.year > 40);
  unlock('decomposers', next.deadBiomass > 20 && next.soilFertility < 60);

  next.collapseYears = next.ecosystemPressure > 75 ? prev.collapseYears + 1 : Math.max(0, prev.collapseYears - 1);

  const collapse = next.grass <= 0 || next.ecosystemPressure >= 100 || (has(next, 'rabbits') && next.rabbits <= 0 && next.foxes > 0) || (next.biodiversity <= 5 && next.year > 20) || next.collapseYears >= 10;
  if (collapse) { next.result = 'collapse'; next.running = false; return { state: next, unlocked }; }

  if (next.year >= 100) {
    if (next.ecosystemPressure < 40 && next.biodiversity > 60 && next.grass > 30 && next.rabbits > 10 && next.foxes > 2) next.result = 'perfect_win';
    else if (next.unlockedSpecies.length >= 5) next.result = 'complex_win';
    else next.result = 'basic_win';
    next.running = false;
  }
  return { state: next, unlocked };
}
