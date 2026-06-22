# 动效指南 · Animation Recipes

> Anime.js v4 运行时 + 12 个稳定 Recipe + 生成决策树

---

## 动效引擎

模板使用 **Anime.js v4.4.1 UMD**。选择 Anime.js 而不是 GSAP 作为默认引擎，是因为 html-slides 的首要约束是单文件、零构建、低依赖和 Agent 稳定生成；Anime.js 的 timeline、stagger、splitText、spring、scrambleText 与对象数值动画已经覆盖大多数 slide 场景。

运行时加载顺序：

```js
const sources = [
  'https://cdn.jsdelivr.net/npm/animejs@4.4.1/dist/bundles/anime.umd.min.js',
  './anime.umd.min.js',
];
```

默认 CDN 优先，避免普通在线演示出现本地 fallback 的 404 噪音；需要离线演示时，把 `anime.umd.min.js` 放到 `index.html` 同级即可。两者都失败时，模板会立即显示所有 `[data-anim]` 内容，不阻塞演示。

### 生成约束

- 只使用模板已有 recipe，不临时写大段自定义动画。
- 默认用 `data-layout` 自动选择 recipe；只有需要覆盖默认行为时才写 `data-animate`。
- 使用 Anime.js v4 参数名：`duration` 是毫秒，缓动写 `ease: 'out(4)'` / `ease: spring(...)`，回调用 `onRender` / `onComplete`。
- 不引入 GSAP，除非用户明确要求复杂 morph、ScrollTrigger 或 GSAP 专属插件。
- 不为了动画牺牲可读性：所有内容在 `prefers-reduced-motion`、低功耗模式和 CDN 失败时都必须完整可见。

---

## Recipe 总览

| Recipe | 触发方式 | 效果 | 适用版式 |
|---|---|---|---|
| `cascade` | 默认兜底 | DOM 顺序 timeline 淡入 | 普通正文页 |
| `hero` | `.hero` 且无更具体 recipe | 标题 splitText 逐字 + 分层入场 | U01, U02, U03 |
| `quote` | `data-animate="quote"` | 引文逐行揭示 | U04 |
| `directional` | `data-animate="directional"` | 左右分屏对向入场 | U05, U06 |
| `pipeline` | `data-animate="pipeline"` | 按右键逐步点亮 | U07 |
| `counter` | D01 / D08 自动 | 数字滚动 + 数据卡片弹入 | D01, D08 |
| `bar-grow` | D02 / D03 自动 | 柱形/条形图依次生长 + 数字滚动 | D02, D03 |
| `timeline-dots` | D04 / D05 自动 | 时间线节点逐个点亮 | D04, D05 |
| `matrix-scan` | D06 自动 | 矩阵格从左上扫描出现 | D06 |
| `card-spring` | U08 / X03 自动 | 卡片弹性入场 | U08, X03 |
| `stagger-grid` | M02 自动 | 图片/网格从中心波浪展开 | M02 |
| `svg-draw` | M06 自动 | SVG 描边绘制；无 SVG 时层级 stagger | M06 |
| `scramble` | `data-animate="scramble"` | 科技感文字解码 | 赛博主题章节/封面 |

---

## Recipe 决策树

```
这页是什么类型?
│
├─ U07 流程逐步揭示 ─────────────→ pipeline
├─ U04 金句/引言 ────────────────→ quote
├─ U05/U06 左右对比 ─────────────→ directional
├─ D01/D08 核心数字 ─────────────→ counter
├─ D02/D03 柱图/条图 ────────────→ bar-grow
├─ D04/D05 时间线 ───────────────→ timeline-dots
├─ D06 矩阵 ────────────────────→ matrix-scan
├─ U08/X03 卡片组 ───────────────→ card-spring
├─ M02 多图网格 ─────────────────→ stagger-grid
├─ M06 架构/系统图 ──────────────→ svg-draw
├─ 赛博主题短标题/代码感章节 ────→ scramble
├─ 封面/章节/收束 (.hero) ───────→ hero
└─ 其他所有页面 ─────────────────→ cascade
```

---

## Authoring 模板

### `counter` · 数字滚动

适用于 `.stat-num`、`.num-mega`、`.bar-value`、`.bar-val`、`[data-count]`。

```html
<section class="slide" data-layout="D01" data-theme="light" data-animate="counter">
  <div class="stat-card" data-anim>
    <span class="stat-label">Revenue</span>
    <span class="stat-num">1.2<i class="num-unit">B</i></span>
    <span class="stat-note">ARR, source: company filing</span>
  </div>
</section>
```

复杂数字优先显式写 `data-count`，避免 Agent 解析错前后缀：

```html
<span class="stat-num" data-count="12800" data-prefix="$" data-suffix=" ARR">$12,800 ARR</span>
```

注意：不要为“好看”编造数字。没有来源的数值要标注 mock 或换成定性表述。

### `bar-grow` · 柱图/条图生长

目标值必须保留在 `.bar-fill` 的 inline style 上，运行时会读取它再从 0 动到目标。

```html
<section class="slide" data-layout="D03" data-theme="light" data-animate="bar-grow">
  <div class="h-bar-chart" data-anim>
    <div class="bar-row">
      <span class="bar-name">项目 A</span>
      <div class="bar-track"><div class="bar-fill" style="width:92%"></div></div>
      <span class="bar-val">92%</span>
    </div>
  </div>
</section>
```

竖向柱图使用 `height:N%`，横向条图使用 `width:N%`。

### `timeline-dots` · 时间线节点

时间线页不需要给每个节点单独加 `data-anim`；recipe 会自动处理 `.tl-node` / `.tl-h-node`。

```html
<section class="slide" data-layout="D04" data-theme="light" data-animate="timeline-dots">
  <div class="timeline-v nav-safe-bottom" data-anim>
    <div class="tl-node">...</div>
    <div class="tl-node">...</div>
  </div>
</section>
```

### `matrix-scan` · 矩阵扫描

用于 D06。保持 `.matrix-fill` 和 `.matrix-cell` 结构，不要把矩阵写成表格。

```html
<section class="slide" data-layout="D06" data-theme="dark" data-animate="matrix-scan">
  <div class="matrix-fill nav-safe-bottom" data-anim>
    <div class="matrix-cell"><span class="kicker">01</span><br><strong>能力一</strong></div>
  </div>
</section>
```

### `hero` · 标题逐字

封面/章节页的标题保持为简单文本或 `<br>` 分行。不要在主标题内部塞复杂 HTML；splitText 需要可拆的文本节点。

```html
<section class="slide hero" data-layout="U01" data-theme="dark">
  <h1 class="h-hero" data-anim>AI Infrastructure<br>2026</h1>
</section>
```

### `scramble` · 科技解码

只在赛博风、代码感或终端感页面使用。它会改写 `innerHTML`，所以目标文本里不要放图标、链接或复杂内联标签。

```html
<section class="slide hero" data-layout="U02" data-theme="dark" data-animate="scramble">
  <h2 class="h-xl" data-anim>MODEL OPS</h2>
</section>
```

---

## data-anim 属性值参考

| 值 | 含义 | 用在哪里 |
|---|---|---|
| 无值 `data-anim` | 普通入场元素 | 大部分元素 |
| `"left"` | 从左侧进入 | `directional` 左栏 |
| `"right"` | 从右侧进入 | `directional` 右栏 |
| `"line"` | 引文逐行揭示 | `quote` 引文行 |
| `"step"` | 按键逐步点亮 | `pipeline` 步骤 |

---

## 降级策略

| 场景 | 处理 |
|---|---|
| Anime.js 加载失败 | 所有内容立即显示 |
| WebGL 不支持 | canvas 空白透明，不影响内容 |
| `prefers-reduced-motion` | JS 动画跳过，CSS transition 缩短 |
| B 键低功耗模式 | WebGL 停止 + 动画跳过 + 当前页内容直接显示 |
| PDF 导出 | 导出脚本会关闭 deck transition 并强制显示 `[data-anim]` |

---

## 何时考虑 GSAP

GSAP 的 timeline、SplitText、MorphSVG、DrawSVG 和插件生态仍然更强；`gsap-skills` 的价值在于“把库用法写成 Agent 可加载的结构化技能”。但 html-slides 默认不引入 GSAP，除非出现这些明确需求：

- 用户指定 GSAP。
- 需要复杂 SVG morph、路径运动或跨布局 FLIP。
- 需要长页面滚动叙事，而不是横向翻页 deck。

在这些场景下，先向用户说明额外体积和插件注册成本，再局部使用 GSAP。
