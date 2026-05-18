# 项目名称：Ecosystem Box｜生态箱

请开发一个完整可运行的 Web Demo 游戏。

类型：

- 休闲益智
- 生态模拟
- 沙盒观察
- 长期成长
- 阶段式解锁

核心目标不是做一个简单的“草兔狼模拟器”，而是做一个：

> 生态复杂度逐步展开的长期平衡游戏。

玩家一开始只管理植物和环境，随着生态稳定，逐渐解锁昆虫、食草动物、食肉动物、分解者。每一层新物种出现，都会改变之前的平衡，让玩家不断重新调整系统。

---

# 一、核心体验

玩家通过调节环境变量，观察生态系统自动演化。

核心感觉是：

> 我只是调了一点雨量，结果整个生态链开始变化。

游戏应该让玩家玩很久，因为生态不是一次给完，而是逐层解锁、逐层失控、逐层再平衡。

---

# 二、技术要求

请使用：

- Vite
- React
- TypeScript
- Tailwind CSS
- framer-motion
- lucide-react

请生成完整项目代码，包括：

- package.json
- index.html
- src/main.tsx
- src/App.tsx
- src/index.css
- src/simulation/ecosystem.ts
- src/components/WorldView.tsx
- src/components/ControlPanel.tsx
- src/components/StatCard.tsx
- src/components/EventLog.tsx
- src/components/SpeciesCard.tsx
- tailwind.config.js
- postcss.config.js
- README.md

代码结构要清晰，不要把所有逻辑都堆在 App.tsx。

---

# 三、游戏世界

游戏中有这些生态元素：

## 植物

- Grass

## 食草相关

- Insects
- Rabbits

## 食肉动物

- Foxes
- Wolves

## 循环系统

- Decomposers

## 环境指标

- Rain
- Temperature
- Soil Fertility
- Ecosystem Pressure
- Biodiversity
- Dead Biomass
- Disease Risk

---

# 四、状态结构

请使用类似下面的状态结构：

```ts
export type SpeciesId =
  | "grass"
  | "insects"
  | "rabbits"
  | "foxes"
  | "wolves"
  | "decomposers";

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

  result: "playing" | "basic_win" | "perfect_win" | "collapse";
};
````

---

# 五、阶段式生态演化

游戏一开始不要给玩家完整食物链。

必须按阶段解锁。

## 阶段 1：植物阶段

初始只有：

* Grass
* Rain
* Temperature
* Soil Fertility

玩家先要让草稳定生长。

当草长期保持较高水平后，系统解锁昆虫。

---

## 阶段 2：昆虫阶段

昆虫不会只消耗资源，它们也帮助生态。

昆虫作用：

* 促进草繁殖
* 提高授粉效率
* 少量增加生物多样性
* 死亡后增加 deadBiomass

解锁条件示例：

```ts
grass > 50 && soilFertility > 40 && year > 5
```

---

## 阶段 3：兔子阶段

兔子是主要食草动物。

兔子作用：

* 吃草
* 快速繁殖
* 数量太多会造成过度啃食
* 兔子死亡后增加 deadBiomass

解锁条件示例：

```ts
grass > 65 && insects > 20 && year > 10
```

---

## 阶段 4：狐狸阶段

狐狸是第一层食肉动物。

狐狸不是一开始就有，而是在兔子过多、草地承压时出现。

解锁条件示例：

```ts
rabbits > 40 && grass < 45 && ecosystemPressure > 50
```

狐狸作用：

* 控制兔子数量
* 太多会让兔子崩溃
* 死亡后增加 deadBiomass

---

## 阶段 5：狼阶段

狼是更高层捕食者。

解锁条件示例：

```ts
rabbits > 70 && foxes > 8 && year > 40
```

狼作用：

* 抑制兔子和狐狸
* 增强系统复杂度
* 过多会造成捕食压力

---

## 阶段 6：分解者阶段

分解者负责生态循环。

解锁条件示例：

```ts
deadBiomass > 20 && soilFertility < 60
```

分解者作用：

* 消耗 deadBiomass
* 提高 soilFertility
* 降低 ecosystemPressure
* 增强恢复能力

---

# 六、核心循环

每一年执行一次：

```ts
updateClimate();
updatePlants();
updateHerbivores();
updatePredators();
updateDecomposers();
calculatePressure();
calculateBiodiversity();
calculateDiseaseRisk();
checkUnlocks();
checkWinOrCollapse();
```

请把这些逻辑放在：

```ts
src/simulation/ecosystem.ts
```

---

# 七、基础数值规则

## Grass 草

草受到这些因素影响：

* 降雨增加草
* 土壤肥力增加草
* 温度过高减少草
* 兔子吃草
* 昆虫帮助草繁殖

示例公式：

```ts
grass += rain * 0.035;
grass += soilFertility * 0.025;
grass += insects * 0.015;
grass -= rabbits * 0.45;
grass -= Math.max(0, temperature - 30) * 0.9;
grass = clamp(grass, 0, 100);
```

---

## Insects 昆虫

```ts
insects += grass * 0.025;
insects += temperature > 8 && temperature < 34 ? 1.2 : -1.2;
insects -= diseaseRisk * 0.03;
insects = clamp(insects, 0, 100);
```

---

## Rabbits 兔子

```ts
rabbits += grass * 0.025;
rabbits -= foxes * 0.55;
rabbits -= wolves * 0.3;
rabbits -= Math.max(0, 15 - grass) * 0.5;
rabbits -= diseaseRisk * 0.04;
rabbits = clamp(rabbits, 0, 150);
```

---

## Foxes 狐狸

```ts
foxes += rabbits * 0.012;
foxes -= Math.max(0, 8 - rabbits) * 0.35;
foxes -= wolves * 0.08;
foxes = clamp(foxes, 0, 60);
```

---

## Wolves 狼

```ts
wolves += (rabbits + foxes) * 0.004;
wolves -= Math.max(0, 15 - rabbits) * 0.18;
wolves = clamp(wolves, 0, 40);
```

---

## Decomposers 分解者

```ts
decomposers += deadBiomass * 0.035;
decomposers -= Math.max(0, 8 - deadBiomass) * 0.2;
deadBiomass -= decomposers * 0.25;
soilFertility += decomposers * 0.18;
decomposers = clamp(decomposers, 0, 80);
deadBiomass = clamp(deadBiomass, 0, 100);
soilFertility = clamp(soilFertility, 0, 100);
```

---

# 八、死亡生物量 deadBiomass

当动物减少时，需要增加 deadBiomass。

例如上一年兔子比今年多：

```ts
deadBiomass += Math.max(0, previous.rabbits - current.rabbits) * 0.2;
deadBiomass += Math.max(0, previous.foxes - current.foxes) * 0.3;
deadBiomass += Math.max(0, previous.wolves - current.wolves) * 0.5;
deadBiomass = clamp(deadBiomass, 0, 100);
```

---

# 九、生态压力 Ecosystem Pressure

增加核心指标：

```ts
ecosystemPressure: number // 0-100
```

压力来源：

* 草不够
* 食草动物太多
* 捕食者太多
* 干旱
* 高温
* 疾病风险高
* 生物多样性低

示例计算：

```ts
let pressure = 0;

pressure += Math.max(0, 35 - grass) * 0.8;
pressure += Math.max(0, rabbits - grass) * 0.35;
pressure += Math.max(0, foxes + wolves - rabbits * 0.25) * 1.4;
pressure += Math.max(0, 25 - rain) * 0.4;
pressure += Math.max(0, temperature - 34) * 2;
pressure += diseaseRisk * 0.4;
pressure -= biodiversity * 0.25;

ecosystemPressure = clamp(pressure, 0, 100);
```

---

# 十、生物多样性 Biodiversity

```ts
biodiversity = unlockedSpecies.length * 8 + balancedSpeciesBonus;
biodiversity = clamp(biodiversity, 0, 100);
```

balancedSpeciesBonus 可以根据以下条件增加：

```ts
if grass > 30 bonus += 8;
if insects > 10 bonus += 8;
if rabbits > 10 bonus += 8;
if foxes > 2 bonus += 8;
if wolves > 1 bonus += 8;
if decomposers > 5 bonus += 8;
```

生物多样性作用：

* 降低疾病风险
* 降低生态压力
* 提高恢复能力
* 影响最终评分

---

# 十一、疾病风险 Disease Risk

疾病风险和种群爆发有关。

```ts
diseaseRisk += Math.max(0, rabbits - 80) * 0.3;
diseaseRisk += Math.max(0, insects - 80) * 0.2;
diseaseRisk -= biodiversity * 0.15;
diseaseRisk = clamp(diseaseRisk, 0, 100);
```

疾病风险高时：

* 昆虫减少
* 兔子减少
* 生态压力增加

---

# 十二、玩家操作

Demo 阶段玩家可以操作：

1. Rain slider
   范围：0-100

2. Temperature slider
   范围：-10 到 50

3. Soil Fertility slider
   范围：0-100

4. Pause / Play

5. Reset

6. Speed Control

   * 1x
   * 2x
   * 4x

后续预留按钮，但 Demo 可以先不实现：

* Add Rabbits
* Introduce Foxes
* Start Drought
* Add Decomposers
* Restore Habitat

---

# 十三、界面要求

整体风格：

* 深色科技感
* 生态沙盒感
* 大屏模拟器感觉
* 圆角卡片
* 数据面板清晰
* 不要儿童卡通风
* 不要太花
* 不要幼稚

布局：

* 左侧：生态箱世界画面
* 右侧：控制面板和数据面板

---

# 十四、左侧 WorldView

需要展示：

* 天空背景
* 草地
* 昆虫
* 兔子
* 狐狸
* 狼
* 分解者
* 下雨效果
* 高温时天空变红
* 雨大时天空偏蓝
* 正常时天空偏绿色
* 草地高度根据 grass 数值变化
* 生态压力高时有红色警告氛围
* 生物多样性高时画面更丰富

可以暂时使用 emoji：

* 昆虫：🦋
* 兔子：🐇
* 狐狸：🦊
* 狼：🐺
* 分解者：🍄

但要用 framer-motion 让它们轻微移动。

显示数量限制：

* insects 最多显示 20 个
* rabbits 最多显示 28 个
* foxes 最多显示 10 个
* wolves 最多显示 8 个
* decomposers 最多显示 18 个

未解锁物种不要显示。

---

# 十五、右侧 ControlPanel

右侧需要展示：

## 1. 年份

例如：

```txt
Year 27
```

## 2. 生态阶段

根据已解锁物种显示：

* Plant Stage
* Insect Stage
* Herbivore Stage
* Predator Stage
* Apex Predator Stage
* Full Cycle Stage

## 3. 当前生态状态

* BALANCED
* UNSTABLE
* COLLAPSING

不同状态用不同颜色。

## 4. 核心指标

* Ecosystem Pressure
* Biodiversity
* Disease Risk
* Dead Biomass

用进度条显示。

## 5. 环境控制

* Rain
* Temperature
* Soil Fertility

使用滑杆。

## 6. 物种卡片

只展示已解锁物种。

每个物种卡片显示：

* 图标
* 名称
* 数量
* 趋势：上升 / 下降 / 稳定
* 简短说明

## 7. 实时事件日志

根据生态情况显示事件：

```ts
if grass < 15:
  "Grass ecosystem collapsing"

if insects > 70:
  "Insect bloom detected"

if rabbits < 4 && rabbits unlocked:
  "Rabbit population near extinction"

if rabbits > 80:
  "Rabbit population explosion"

if foxes > rabbits * 0.4:
  "Predator pressure rising"

if wolves > 15:
  "Apex predators dominating"

if temperature > 36:
  "Heat wave damaging ecosystem"

if ecosystemPressure > 75:
  "Ecosystem under severe pressure"

if biodiversity > 65:
  "Biodiversity stabilizing the ecosystem"

if decomposers > 20:
  "Decomposition cycle improving soil"
```

---

# 十六、解锁提示

当新物种解锁时，显示明显弹窗或 Toast：

示例：

```txt
New Species Unlocked: Rabbits

Your grassland can now support herbivores.
But herbivores will put pressure on plant growth.
```

每个新物种都要有类似说明。

---

# 十七、胜利目标

不要只做“活到100年”。

做三个层级：

## 基础胜利

生态存活 100 年。

显示：

```txt
Stable Ecosystem
You kept the ecosystem alive for 100 years.
```

## 进阶胜利

100 年前解锁至少 5 个物种。

显示：

```txt
Complex Ecosystem
You created a multi-layer food chain.
```

## 完美胜利

100 年后满足：

```ts
ecosystemPressure < 40
biodiversity > 60
grass > 30
rabbits > 10
foxes > 2
```

显示：

```txt
Perfect Ecosystem
Your world reached long-term balance.
```

---

# 十八、失败条件

出现以下情况时失败：

```ts
grass <= 0
ecosystemPressure >= 100
rabbits <= 0 && foxes > 0
biodiversity <= 5 && year > 20
collapseYears >= 10
```

失败弹窗：

```txt
Ecosystem Collapse
The food chain lost its balance.
```

按钮：

```txt
Restart
```

---

# 十九、游戏速度

增加速度控制：

* 1x：每 1000ms 过一年
* 2x：每 500ms 过一年
* 4x：每 250ms 过一年

---

# 二十、README

README 需要包含：

* 项目简介
* 安装方式
* 启动方式
* 游戏玩法
* 核心生态公式
* 物种解锁机制
* 胜利与失败条件
* 后续扩展方向

---

# 二十一、后续扩展预留

代码中请预留可扩展结构，方便以后增加：

* 季节系统
* 干旱事件
* 洪水事件
* 森林火灾
* 外来物种
* 疾病爆发
* 栖息地面积
* 不同地形
* 多生态箱
* 玩家任务系统
* 图鉴系统
* 科技树
* 全球排行榜

---

# 二十二、最重要的设计要求

这个 Demo 必须让人一眼看懂：

1. 一开始只有草和环境。
2. 草稳定后，昆虫出现。
3. 昆虫让生态更丰富。
4. 兔子出现后，草开始承压。
5. 兔子太多，捕食者出现。
6. 捕食者让系统重新平衡。
7. 分解者出现后，死亡生物重新进入土壤循环。
8. 玩家要不断调整环境，让系统保持长期稳定。

最终体验应该是：

> 一个简单生态，慢慢变成复杂世界。
> EOF
