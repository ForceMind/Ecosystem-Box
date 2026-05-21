import type { EcosystemState } from './ecosystem';

export type ExtensionHook = {
  id: string;
  enabled: boolean;
  apply: (state: EcosystemState) => EcosystemState;
};

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function seasonEffect(state: EcosystemState): EcosystemState {
  // 每 4 年一个季节循环：春(0)、夏(1)、秋(2)、冬(3)
  const seasonIndex = state.year % 4;

  let rainDelta = 0;
  let tempDelta = 0;

  if (seasonIndex === 0) {
    rainDelta = 2.4;
    tempDelta = 0.6;
  } else if (seasonIndex === 1) {
    rainDelta = -2.8;
    tempDelta = 1.8;
  } else if (seasonIndex === 2) {
    rainDelta = 1.2;
    tempDelta = -0.8;
  } else {
    rainDelta = 0.8;
    tempDelta = -2.1;
  }

  return {
    ...state,
    rain: clamp(state.rain + rainDelta, 0, 100),
    temperature: clamp(state.temperature + tempDelta, -10, 50),
  };
}

// 扩展挂钩：支持在主模拟管线前插入可开关模块（季节、灾害、随机事件等）
export const extensionHooks: ExtensionHook[] = [
  {
    id: 'season-system',
    enabled: true,
    apply: seasonEffect,
  },
  {
    id: 'disaster-system-placeholder',
    enabled: false,
    apply: (state) => state,
  },
];

export function runExtensionHooks(state: EcosystemState): EcosystemState {
  return extensionHooks.reduce((current, hook) => {
    if (!hook.enabled) return current;
    return hook.apply(current);
  }, state);
}
