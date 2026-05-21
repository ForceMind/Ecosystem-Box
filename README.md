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
<<<<<<< ours
<<<<<<< ours
<<<<<<< ours
=======
=======
>>>>>>> theirs
=======
>>>>>>> theirs


## 已完成特性（当前版本）

- 分阶段解锁生态链：草 → 昆虫 → 兔子 → 狐狸 → 狼 → 分解者。
- 支持 1x / 2x / 4x 演化速度，支持暂停与重置。
- 左侧世界视图支持气候色调、降雨效果、压力叠层与生物多样性光点。
- 右侧面板支持实时事件、物种趋势、核心指标与环境调节。
- 提供结局面板与“重新开始”按钮，支持快速复盘。


## 扩展架构与已接入能力

当前版本新增 `src/simulation/extensions.ts` 扩展挂钩机制：

- `extensionHooks`：可注册并开关扩展模块。
- `runExtensionHooks`：在年度演化开始前统一执行扩展逻辑。

这使后续接入季节系统、灾害系统和特殊事件时，不需要重写主模拟管线。


- 已启用季节扩展：每 4 年形成一个轻量季节循环，自动微调降雨与温度。
<<<<<<< ours
<<<<<<< ours
>>>>>>> theirs
=======
>>>>>>> theirs
=======
>>>>>>> theirs
