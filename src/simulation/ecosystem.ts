<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
=======
import { runExtensionHooks } from './extensions';
>>>>>>> theirs
=======
import { runExtensionHooks } from './extensions';
>>>>>>> theirs
=======
import { runExtensionHooks } from './extensions';
>>>>>>> theirs
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

export type EnvironmentKey = 'rain' | 'temperature' | 'soilFertility';

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
type SimulationContext = {
  previous: EcosystemState;
  next: EcosystemState;
};

<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const hasSpecies = (state: EcosystemState, id: SpeciesId) => state.unlockedSpecies.includes(id);

const climateTargets = {
  rain: 52,
  temperature: 23,
};

export const initialState: EcosystemState = {
  year: 0,
  running: true,
  grass: 45,
  insects: 0,
  rabbits: 0,
  foxes: 0,
  wolves: 0,
  decomposers: 0,
  rain: 50,
  temperature: 24,
  soilFertility: 50,
  ecosystemPressure: 22,
  biodiversity: 10,
  deadBiomass: 0,
  diseaseRisk: 5,
  unlockedSpecies: ['grass'],
  collapseYears: 0,
  noWolfYears: 0,
  result: 'playing',
};

export const unlockDescriptions: Record<SpeciesId, string> = {
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  grass: 'Plant base established.',
  insects: 'Pollinators amplify plant growth and biodiversity resilience.',
  rabbits: 'Herbivores arrived. Grass pressure now rises with population booms.',
  foxes: 'Predators emerged to regulate rabbit overgrowth.',
  wolves: 'Apex predators now influence both rabbit and fox populations.',
  decomposers: 'Nutrient recycling started. Dead biomass can return to fertile soil.',
};

function updateClimate(next: EcosystemState): void {
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  grass: '植物基础已建立。',
  insects: '授粉者出现，植物增长和多样性韧性提升。',
  rabbits: '食草动物已出现，草地承压将明显增加。',
  foxes: '捕食者出现，可抑制兔群过度扩张。',
  wolves: '顶级捕食者出现，将同时影响狐狸和兔群。',
  decomposers: '分解循环启动，死亡生物量将回流为土壤养分。',
};

export const speciesLabels: Record<SpeciesId, string> = {
  grass: '草',
  insects: '昆虫',
  rabbits: '兔子',
  foxes: '狐狸',
  wolves: '狼',
  decomposers: '分解者',
};

function updateClimate(ctx: SimulationContext): void {
  const { next } = ctx;
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  const rainDrift = (climateTargets.rain - next.rain) * 0.06;
  const tempDrift = (climateTargets.temperature - next.temperature) * 0.05;
  const pressurePenalty = next.ecosystemPressure > 70 ? 1.6 : 0;
  const biodiversityBuffer = next.biodiversity > 55 ? 0.8 : 0;

  next.rain = clamp(next.rain + rainDrift - pressurePenalty + biodiversityBuffer, 0, 100);
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  next.temperature = clamp(next.temperature + tempDrift + pressurePenalty * 0.35 - biodiversityBuffer * 0.2, -10, 50);
}

function updatePlants(next: EcosystemState): void {
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  next.temperature = clamp(
    next.temperature + tempDrift + pressurePenalty * 0.35 - biodiversityBuffer * 0.2,
    -10,
    50,
  );
}

function updatePlants(ctx: SimulationContext): void {
  const { next } = ctx;
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  next.grass += next.rain * 0.035;
  next.grass += next.soilFertility * 0.025;
  next.grass += next.insects * 0.015;
  next.grass -= next.rabbits * 0.45;
  next.grass -= Math.max(0, next.temperature - 30) * 0.9;
  next.grass = clamp(next.grass, 0, 100);
}

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
function updateHerbivores(next: EcosystemState): void {
=======
function updateHerbivores(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function updateHerbivores(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function updateHerbivores(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
  if (hasSpecies(next, 'insects')) {
    next.insects += next.grass * 0.025;
    next.insects += next.temperature > 8 && next.temperature < 34 ? 1.2 : -1.2;
    next.insects -= next.diseaseRisk * 0.03;
    next.insects = clamp(next.insects, 0, 100);
  }

  if (hasSpecies(next, 'rabbits')) {
    next.rabbits += next.grass * 0.025;
    next.rabbits -= next.foxes * 0.55;
    next.rabbits -= next.wolves * 0.3;
    next.rabbits -= Math.max(0, 15 - next.grass) * 0.5;
    next.rabbits -= next.diseaseRisk * 0.04;
    next.rabbits = clamp(next.rabbits, 0, 150);
  }
}

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
function updatePredators(next: EcosystemState): void {
=======
function updatePredators(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function updatePredators(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function updatePredators(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
  if (hasSpecies(next, 'foxes')) {
    next.foxes += next.rabbits * 0.012;
    next.foxes -= Math.max(0, 8 - next.rabbits) * 0.35;
    next.foxes -= next.wolves * 0.08;
    next.foxes = clamp(next.foxes, 0, 60);
  }

  if (hasSpecies(next, 'wolves')) {
    next.wolves += (next.rabbits + next.foxes) * 0.004;
    next.wolves -= Math.max(0, 15 - next.rabbits) * 0.18;
    next.wolves = clamp(next.wolves, 0, 40);
  }
}

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
function updateDecomposers(next: EcosystemState): void {
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
function updateDeadBiomassFromDeaths(ctx: SimulationContext): void {
  const { next, previous } = ctx;
  next.deadBiomass += Math.max(0, previous.rabbits - next.rabbits) * 0.2;
  next.deadBiomass += Math.max(0, previous.foxes - next.foxes) * 0.3;
  next.deadBiomass += Math.max(0, previous.wolves - next.wolves) * 0.5;
  next.deadBiomass = clamp(next.deadBiomass, 0, 100);
}

function updateDecomposers(ctx: SimulationContext): void {
  const { next } = ctx;
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  if (!hasSpecies(next, 'decomposers')) return;

  next.decomposers += next.deadBiomass * 0.035;
  next.decomposers -= Math.max(0, 8 - next.deadBiomass) * 0.2;
  next.deadBiomass -= next.decomposers * 0.25;
  next.soilFertility += next.decomposers * 0.18;

  next.decomposers = clamp(next.decomposers, 0, 80);
  next.deadBiomass = clamp(next.deadBiomass, 0, 100);
  next.soilFertility = clamp(next.soilFertility, 0, 100);
}

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
function calculateBiodiversity(next: EcosystemState): void {
=======
function calculateBiodiversity(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function calculateBiodiversity(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function calculateBiodiversity(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
  let bonus = 0;
  if (next.grass > 30) bonus += 8;
  if (next.insects > 10) bonus += 8;
  if (next.rabbits > 10) bonus += 8;
  if (next.foxes > 2) bonus += 8;
  if (next.wolves > 1) bonus += 8;
  if (next.decomposers > 5) bonus += 8;

  next.biodiversity = clamp(next.unlockedSpecies.length * 8 + bonus, 0, 100);
}

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
function calculateDiseaseRisk(next: EcosystemState): void {
=======
function calculateDiseaseRisk(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function calculateDiseaseRisk(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function calculateDiseaseRisk(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
  next.diseaseRisk += Math.max(0, next.rabbits - 80) * 0.3;
  next.diseaseRisk += Math.max(0, next.insects - 80) * 0.2;
  next.diseaseRisk -= next.biodiversity * 0.15;
  next.diseaseRisk = clamp(next.diseaseRisk, 0, 100);
}

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
function calculatePressure(next: EcosystemState): void {
=======
function calculatePressure(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function calculatePressure(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function calculatePressure(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
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
}

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
function checkUnlocks(next: EcosystemState): SpeciesId[] {
=======
function checkUnlocks(ctx: SimulationContext): SpeciesId[] {
  const { next } = ctx;
>>>>>>> theirs
=======
function checkUnlocks(ctx: SimulationContext): SpeciesId[] {
  const { next } = ctx;
>>>>>>> theirs
=======
function checkUnlocks(ctx: SimulationContext): SpeciesId[] {
  const { next } = ctx;
>>>>>>> theirs
  const unlocked: SpeciesId[] = [];

  const unlock = (id: SpeciesId, condition: boolean) => {
    if (!condition || hasSpecies(next, id)) return;
    next.unlockedSpecies = [...next.unlockedSpecies, id];
    unlocked.push(id);
  };

  unlock('insects', next.grass > 50 && next.soilFertility > 40 && next.year > 5);
  unlock('rabbits', next.grass > 65 && next.insects > 20 && next.year > 10);
  unlock('foxes', next.rabbits > 40 && next.grass < 45 && next.ecosystemPressure > 50);
  unlock('wolves', next.rabbits > 70 && next.foxes > 8 && next.year > 40);
  unlock('decomposers', next.deadBiomass > 20 && next.soilFertility < 60);

  return unlocked;
}

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
function checkWinOrCollapse(next: EcosystemState): void {
=======
function checkWinOrCollapse(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function checkWinOrCollapse(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
=======
function checkWinOrCollapse(ctx: SimulationContext): void {
  const { next } = ctx;
>>>>>>> theirs
  const collapse =
    next.grass <= 0 ||
    next.ecosystemPressure >= 100 ||
    (hasSpecies(next, 'rabbits') && next.rabbits <= 0 && next.foxes > 0) ||
    (next.biodiversity <= 5 && next.year > 20) ||
    next.collapseYears >= 10;

  if (collapse) {
    next.result = 'collapse';
    next.running = false;
    return;
  }

  if (next.year < 100) return;

  if (
    next.ecosystemPressure < 40 &&
    next.biodiversity > 60 &&
    next.grass > 30 &&
    next.rabbits > 10 &&
    next.foxes > 2
  ) {
    next.result = 'perfect_win';
  } else if (next.unlockedSpecies.length >= 5) {
    next.result = 'complex_win';
  } else {
    next.result = 'basic_win';
  }
  next.running = false;
}

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
function updateDeadBiomassFromDeaths(next: EcosystemState, prev: EcosystemState): void {
  next.deadBiomass += Math.max(0, prev.rabbits - next.rabbits) * 0.2;
  next.deadBiomass += Math.max(0, prev.foxes - next.foxes) * 0.3;
  next.deadBiomass += Math.max(0, prev.wolves - next.wolves) * 0.5;
  next.deadBiomass = clamp(next.deadBiomass, 0, 100);
}
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
const simulationPipeline = [
  updateClimate,
  updatePlants,
  updateHerbivores,
  updatePredators,
  updateDeadBiomassFromDeaths,
  updateDecomposers,
  calculateBiodiversity,
  calculateDiseaseRisk,
  calculatePressure,
] as const;
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs

export function applyEnvironmentControl(
  state: EcosystemState,
  key: EnvironmentKey,
  value: number,
): EcosystemState {
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  const bounded =
    key === 'temperature' ? clamp(value, -10, 50) : clamp(value, 0, 100);
=======
  const bounded = key === 'temperature' ? clamp(value, -10, 50) : clamp(value, 0, 100);
>>>>>>> theirs
=======
  const bounded = key === 'temperature' ? clamp(value, -10, 50) : clamp(value, 0, 100);
>>>>>>> theirs
=======
  const bounded = key === 'temperature' ? clamp(value, -10, 50) : clamp(value, 0, 100);
>>>>>>> theirs
  return { ...state, [key]: bounded };
}

export function stepEcosystem(prev: EcosystemState): { state: EcosystemState; unlocked: SpeciesId[] } {
  if (!prev.running || prev.result !== 'playing') {
    return { state: prev, unlocked: [] };
  }

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  const next: EcosystemState = { ...prev, year: prev.year + 1 };

  updateClimate(next);
  updatePlants(next);
  updateHerbivores(next);
  updatePredators(next);
  updateDeadBiomassFromDeaths(next, prev);
  updateDecomposers(next);
  calculateBiodiversity(next);
  calculateDiseaseRisk(next);
  calculatePressure(next);

  const unlocked = checkUnlocks(next);
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs
  const next: EcosystemState = runExtensionHooks({ ...prev, year: prev.year + 1 });
  const ctx: SimulationContext = { previous: prev, next };

  simulationPipeline.forEach((step) => step(ctx));

  const unlocked = checkUnlocks(ctx);
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs

  next.collapseYears =
    next.ecosystemPressure > 75 ? prev.collapseYears + 1 : Math.max(0, prev.collapseYears - 1);

  next.noWolfYears = hasSpecies(next, 'wolves')
    ? 0
    : prev.noWolfYears + (hasSpecies(next, 'foxes') ? 1 : 0);

<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
  checkWinOrCollapse(next);
=======
  checkWinOrCollapse(ctx);
>>>>>>> theirs
=======
  checkWinOrCollapse(ctx);
>>>>>>> theirs
=======
  checkWinOrCollapse(ctx);
>>>>>>> theirs

  return { state: next, unlocked };
}
