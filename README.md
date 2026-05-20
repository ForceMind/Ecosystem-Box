# Ecosystem Box

一个基于 **Vite + React + TypeScript + Tailwind + framer-motion** 的生态沙盒模拟 Demo。

## 安装与启动

```bash
npm install
npm run dev
```

构建：

```bash
npm run build
npm run preview
```

## 游戏玩法

- 调整 Rain / Temperature / Soil Fertility。
- 每年自动模拟生态变化，物种按阶段逐步解锁。
- 观察压力、疾病、多样性指标并不断回调环境参数。

## 生态循环模块

模拟逻辑按年度函数拆分在 `src/simulation/ecosystem.ts`：

- `updateClimate`
- `updatePlants`
- `updateHerbivores`
- `updatePredators`
- `updateDecomposers`
- `calculateBiodiversity`
- `calculateDiseaseRisk`
- `calculatePressure`
- `checkUnlocks`
- `checkWinOrCollapse`

## 核心生态公式（摘要）

- 草：受降雨、肥力、昆虫促进；受高温和兔子啃食影响。
- 昆虫：受草和适温增长；受疾病风险抑制。
- 兔子：受草增长；受狐狸/狼捕食与疾病影响。
- 狐狸/狼：受猎物驱动并在食物不足时衰退。
- 分解者：消耗死亡生物量并恢复土壤肥力。

## 物种解锁机制

按阶段依次解锁：

`Grass → Insects → Rabbits → Foxes → Wolves → Decomposers`

## 胜利与失败

- 100 年后判定基础/复杂/完美胜利。
- 草归零、压力爆表、链路断裂或长期高压判定崩溃。

## 后续扩展方向

代码结构已预留扩展空间，可继续加入：

- 季节系统
- 干旱/洪水/火灾事件
- 外来物种与疾病事件
- 玩家任务系统、图鉴系统、科技树
- 多生态箱与排行榜
