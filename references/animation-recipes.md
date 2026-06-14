# 动效指南 · Animation Recipes

> 5 种 Recipe + 决策树 + WebGL 背景控制

---

## 动效引擎

使用 **Motion One**（~4KB），本地 + CDN 双保险策略：

```js
let motion;
try { motion = await import('./assets/motion.min.js'); }
catch(e1) {
  try { motion = await import('https://cdn.jsdelivr.net/npm/motion@11/+esm'); }
  catch(e2) {
    // 降级：直接显示全部内容
    document.querySelectorAll('[data-anim]').forEach(el => {
      el.style.opacity = '1'; el.style.transform = 'none';
    });
  }
}
```

---

## 5 种 Recipe

### 1. `cascade` (默认)

**触发**：不加 `data-animate` 属性的普通 slide  
**行为**：子元素按 DOM 顺序 stagger 淡入，75ms 间隔  
**适用**：大多数正文页 (U05, U06, U08, D01, D03, D06, D07, X02, X03)

```html
<section class="slide" data-layout="D01" data-theme="light">
  <div class="chrome" data-anim>...</div>          <!-- 第 1 个 -->
  <div class="slide-body" style="gap:var(--sp-7)">
    <h2 class="h-md" data-anim>标题</h2>           <!-- 第 2 个 -->
    <div class="grid-3">
      <div class="stat-card" data-anim>...</div>    <!-- 第 3 个 -->
      <div class="stat-card" data-anim>...</div>    <!-- 第 4 个 -->
      <div class="stat-card" data-anim>...</div>    <!-- 第 5 个 -->
    </div>
  </div>
</section>
```

动画参数：`opacity [0→1], translateY [20px→0], duration 0.5s, easing expo-out`

---

### 2. `hero`

**触发**：slide 有 `.hero` class 时自动触发  
**行为**：慢节奏仪式感，160ms 间隔 (cascade 的 2 倍)  
**适用**：U01 Cover, U02 Section, U03 Closing

动画参数：`opacity [0→1], translateY [30px→0], duration 0.8s, easing expo-out`

---

### 3. `quote`

**触发**：`data-animate="quote"`  
**行为**：引文逐行揭示，每行之间 550ms 长间隔  
**适用**：U04 Big Quote

```html
<section class="slide hero" data-layout="U04" data-theme="light" data-animate="quote">
  <div class="callout">
    <p class="q-big" data-anim="line">第一行引文</p>      <!-- 550ms 后 -->
    <p class="q-big" data-anim="line">第二行引文</p>      <!-- 又 550ms -->
    <span class="cite" data-anim>— 来源</span>            <!-- cascade -->
  </div>
</section>
```

注意：`data-anim="line"` 标记的元素走慢速逐行，其他 `data-anim` 走正常 cascade。

---

### 4. `directional`

**触发**：`data-animate="directional"`  
**行为**：左侧内容从左滑入，右侧从右滑入  
**适用**：U05 Split Statement, U06 Before/After

```html
<section class="slide" data-layout="U05" data-theme="light" data-animate="directional">
  <div class="grid-2-5-7">
    <div data-anim="left">左侧内容</div>     <!-- translateX [-30px→0] -->
    <div data-anim="right">右侧内容</div>    <!-- translateX [30px→0] -->
  </div>
</section>
```

非 left/right 的 `data-anim` 元素走正常 cascade。左右之间有 300ms 间隔。

---

### 5. `pipeline`

**触发**：`data-animate="pipeline"`  
**行为**：按键逐步点亮，所有步骤亮完才能翻到下一页  
**适用**：U07 Pipeline

```html
<section class="slide" data-layout="U07" data-theme="light" data-animate="pipeline">
  <div class="grid-3">
    <div class="pillar" data-anim="step">Step 1</div>  <!-- 按 → 点亮 -->
    <div class="pillar" data-anim="step">Step 2</div>  <!-- 再按 → 点亮 -->
    <div class="pillar" data-anim="step">Step 3</div>  <!-- 再按 → 点亮 -->
  </div>
  <!-- 再按 → 翻页 -->
</section>
```

---

## Recipe 决策树

```
这页是什么类型?
│
├─ 封面/章节/收束 (.hero) ──→ hero (自动)
├─ 金句/引言 ────────────────→ quote
├─ 左右对比/分屏 ────────────→ directional
├─ 流程/步骤(需逐步揭示) ───→ pipeline
└─ 其他所有页面 ─────────────→ cascade (默认)
```

---

## WebGL 背景

### 工作方式

- `<canvas id="bg-canvas">` 固定在视口底层
- 仅在 `.hero` 页透出（遮罩 12-16% 不透明度）
- 正文页的 `slide[data-theme]` 背景色完全遮住画布

### 三种 Shader

| Shader | 视觉效果 | 适用风格 |
|--------|----------|----------|
| 流体 (fluid) | 缓慢流动的抽象渐变 | 墨刊, 暗植, 纸墨 |
| 等高线 (contour) | 地形图般的线条 | 瑞士, 素简 |
| 粒子网格 (particles) | 星空般的粒子连线 | 赛博, 电压, 信号 |

### 控制

- **B 键**：切换低功耗模式（停止 WebGL + 动画，显示静态内容）
- **`prefers-reduced-motion`**：自动降级
- 所有内容在无 WebGL 时完全可用

---

## data-anim 属性值参考

| 值 | 含义 | 用在哪里 |
|----|------|----------|
| (无值) `data-anim` | 普通淡入 | 大部分元素 |
| `"left"` | 从左滑入 | directional 的左侧 |
| `"right"` | 从右滑入 | directional 的右侧 |
| `"line"` | 逐行揭示(慢) | quote 的引文行 |
| `"step"` | 按键逐步(pipeline) | pipeline 的步骤 |

---

## 降级策略

| 场景 | 处理 |
|------|------|
| Motion One 加载失败 | 所有元素立即显示 (opacity:1, transform:none) |
| WebGL 不支持 | canvas 空白透明，不影响内容 |
| `prefers-reduced-motion` | transition 缩短为 0.15s，无动画 |
| B 键低功耗模式 | WebGL 停止 + 动画跳过 + 内容直接显示 |
| 窄屏 (≤600px) | Grid 降级为单列 |
