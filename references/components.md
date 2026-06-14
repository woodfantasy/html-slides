# 组件手册 · Component Reference

> 所有可用的 CSS 组件及其用法。
> 这些 class 在模板 `<style>` 中定义，可在任何版式的 `<section>` 中使用。

---

## 排版组件

### 标题系列

| Class | 用途 | 字体 | 字号 |
|-------|------|------|------|
| `.h-hero` | Hero 级大标题 | serif | `min(6.4vw, 11.2vh)` |
| `.h-hero-en` | 英文 Hero 标题 | serif-en | `clamp(3rem, 8vw, 7rem)` |
| `.h-xl` | 节标题 | serif | `min(4.6vw, 8.2vh)` |
| `.h-md` | 段标题 | serif | `min(3.2vw, 5.6vh)` |
| `.h-sub` | 小标题 | serif | `clamp(1rem, 1.9vw, 1.6rem)` |

### 正文系列

| Class | 用途 | 字体 | 字号 |
|-------|------|------|------|
| `.lead` | 引导段落 (大正文) | serif | `clamp(0.9rem, 1.9vw, 1.5rem)` |
| `.body-zh` | 中文正文 | sans | `clamp(0.75rem, 1.22vw, 1.05rem)` |
| `.body-serif` | 衬线正文 | serif | same as body-zh |

### 元数据系列

| Class | 用途 | 字体 | 特征 |
|-------|------|------|------|
| `.kicker` | 标签/分类 | mono | uppercase, letter-spacing 0.12em |
| `.meta` | 元数据 | mono | uppercase, letter-spacing 0.1em |
| `.tag` | 标签卡片 | sans | 带边框的 inline-block |

### 数字系列

| Class | 用途 | 字号 |
|-------|------|------|
| `.num-mega` | 超大展示数字 | `min(10vw, 18vh)` |
| `.num-big` | 大数字 | `min(5.5vw, 10vh)` |
| `.num-mid` | 中等数字 | `clamp(2rem, 4vw, 3.5rem)` |
| `.num-unit` | 数字单位后缀 | `0.4em` (相对父级) |

### 装饰系列

| Class | 用途 |
|-------|------|
| `.hi` | 底部高亮标注 (荧光笔效果) |
| `.ghost` | 巨型背景字 (4% 不透明度) |
| `em.en` | 英文斜体强调 |

---

## 数据组件

### `.stat-card` — KPI 卡片

```html
<div class="stat-card">
  <span class="stat-label">指标名</span>
  <span class="stat-num">1.2<i class="num-unit">M</i></span>
  <span class="stat-note">同比增长 48%</span>
</div>
```

### `.bar-tower-row` — 塔式柱图

```html
<div class="bar-tower-row">
  <div class="bar-tower">
    <span class="bar-value">24</span>
    <div class="bar-fill" style="height:30%"></div>
    <span class="bar-label">Q1</span>
  </div>
  <!-- 更多 bar-tower... -->
</div>
```

### `.h-bar-chart` — 横向柱图

```html
<div class="h-bar-chart">
  <div class="bar-row">
    <span class="bar-name">项目 A</span>
    <div class="bar-track"><div class="bar-fill" style="width:92%"></div></div>
    <span class="bar-val">92%</span>
  </div>
</div>
```

### `.timeline-v` — 垂直时间线

```html
<div class="timeline-v">
  <div class="tl-node">
    <span class="tl-date">2022</span>
    <span class="tl-title">里程碑</span>
    <span class="tl-desc">描述</span>
  </div>
</div>
```

### `.timeline-h` — 水平时间线

```html
<div class="timeline-h">
  <div class="tl-h-node">
    <span class="tl-date">Phase 1</span>
    <span class="tl-title">标题</span>
    <span class="tl-desc">描述</span>
  </div>
</div>
```

### `.matrix-fill` — 矩阵网格

```html
<div class="matrix-fill">
  <div class="matrix-cell"><span class="kicker">01</span><br><strong>项目</strong></div>
</div>
```

### `.rowline` — 三列规格行

```html
<div class="rowline">
  <span class="k">关键词</span>
  <span class="v">值</span>
  <span class="m">单位</span>
</div>
```

---

## 结构组件

### `.pillar` — 支柱/卡片

```html
<div class="pillar">
  <i data-lucide="icon-name" class="ico-md"></i>
  <span class="t">标题</span>
  <span class="d">描述</span>
</div>
```

### `.feature-card` — 特性卡片 (带背景)

```html
<div class="feature-card">
  <i data-lucide="icon-name" class="ico-md"></i>
  <strong class="h-sub">特性名</strong>
  <p class="body-zh" style="opacity:0.65">描述</p>
</div>
```

### `.callout` — 引文块

```html
<div class="callout">
  <p class="q-big">引文内容</p>
  <span class="cite">— 来源</span>
</div>
```

### `.code-block` — 代码块

```html
<div class="code-block">
<span class="keyword">const</span> x = <span class="string">'hello'</span>;
</div>
```

---

## 图片组件

### `.frame-img` — 图片容器

```html
<div class="frame-img h-26">
  <img src="images/photo.jpg" alt="描述">
</div>
```

**高度 class**：`.h-22` (22vh) / `.h-26` (26vh) / `.h-35` (35vh)  
**比例 class**：`.r-21x9` / `.r-16x9` / `.r-16x10`  
**模式 class**：`.fit-contain` (object-fit: contain)

### `.frame-cap` — 图片说明

```html
<figure class="tile">
  <div class="frame-img h-26"><img src="..." alt=""></div>
  <figcaption class="frame-cap">
    <span class="pf"><span class="idx">fig.01</span>说明文字</span>
  </figcaption>
</figure>
```

### `.img-slot` — 图片占位符

```html
<div class="img-slot" style="height:30vh"></div>
```

---

## 布局/页面组件

### `.chrome` — 页面顶部元数据栏

```html
<div class="chrome" data-anim>
  <span>Brand Name</span>
  <span>Section</span>
</div>
```

### `.foot` — 页面底部信息栏

```html
<div class="foot" data-anim>
  <span>Brand Name</span>
  <span>01 / 10</span>
</div>
```

### `.slide-body` — 内容主体容器

```html
<div class="slide-body" style="gap:var(--sp-7)">
  <!-- 内容 -->
</div>
```

### 网格系统

| Class | 列分配 | 用途 |
|-------|--------|------|
| `.grid-2-7-5` | 7fr 5fr | 左重右轻 |
| `.grid-2-6-6` | 1fr 1fr | 等分对比 |
| `.grid-2-5-7` | 5fr 7fr | 左轻右重 |
| `.grid-2-8-4` | 8fr 4fr | 左宽右窄 |
| `.grid-3` | repeat(3, 1fr) | 三等分 |
| `.grid-4` | repeat(2, 1fr) | 2×2 网格 |
| `.grid-6` | repeat(3, 1fr) | 3×2 网格 |

### 安全区

| Class | 用途 |
|-------|------|
| `.nav-safe-bottom` | 底部安全区 (max-height: 93vh) |
| `.nav-safe-bottom-tight` | 更紧的底部安全区 |

---

## 图标

使用 **Lucide Icons**，通过 CDN 加载。

```html
<!-- 引入 -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

<!-- 使用 -->
<i data-lucide="icon-name" class="ico-md"></i>

<!-- 初始化 (在 JS 中) -->
lucide.createIcons();
```

### 尺寸 class

| Class | 大小 |
|-------|------|
| `.ico-lg` | clamp(28px, 3.5vw, 44px) |
| `.ico-md` | clamp(20px, 2.5vw, 32px) |

### 常用图标

`zap` / `shield` / `target` / `lock` / `layout-grid` / `wrench` / `palette` / `bar-chart-3` / `monitor` / `shield-check` / `sparkles` / `layers` / `rocket` / `arrow-right` / `check` / `x`
