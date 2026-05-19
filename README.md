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
- 生态每年自动演化，按阶段解锁物种。
- 通过控制环境压力与多样性追求长期稳定。

## 核心生态公式（摘要）

- 草：受降雨、肥力、昆虫促进，受高温和兔子啃食影响。
- 昆虫：受草和适温增长，受疾病风险压制。
- 兔子：受草增长，受狐狸/狼捕食与疾病影响。
- 狐狸/狼：受猎物驱动并在食物不足时衰退。
- 分解者：消耗死亡生物量并恢复土壤肥力。

完整逻辑见 `src/simulation/ecosystem.ts`。

## 物种解锁机制

按阶段依次解锁：Grass → Insects → Rabbits → Foxes → Wolves → Decomposers。

## 胜利与失败

- 100 年达到基础/复杂/完美胜利。
- 草归零、压力爆表、链路断裂或长期崩溃判定失败。

## 未来扩展

已预留可扩展模拟结构，可扩展季节、灾害、外来物种、任务系统、图鉴/科技树与多生态箱。
