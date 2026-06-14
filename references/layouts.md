# 版式骨架库 · Layout Skeletons

> 25 个注册版式，每个都是完整可粘贴的 `<section>` 代码块。  
> AI 只需要选版式 → 粘贴骨架 → 改文案和图片路径。  
> **不允许临时发明未注册版式。**

---

## Pre-flight 检查

写 slide 代码前，确认你要用的版式 class 在当前模板的 `<style>` 里有定义：

**通用 (所有模板共享)**:
`slide` / `hero` / `chrome` / `foot` / `slide-body` / `h-hero` / `h-hero-en` / `h-xl` / `h-md` / `h-sub` / `display-zh` / `lead` / `body-zh` / `body-serif` / `kicker` / `meta` / `num-mega` / `num-big` / `num-mid` / `num-unit` / `hi` / `callout` / `q-big` / `cite` / `stat-card` / `stat-label` / `stat-num` / `stat-note` / `bar-tower-row` / `bar-tower` / `bar-fill` / `bar-label` / `bar-value` / `h-bar-chart` / `bar-row` / `bar-name` / `bar-track` / `bar-val` / `timeline-v` / `tl-node` / `tl-date` / `tl-title` / `tl-desc` / `timeline-h` / `tl-h-node` / `tl-h-axis` / `matrix-fill` / `matrix-cell` / `rowline` / `pillar` / `tag` / `feature-card` / `frame-img` / `fit-contain` / `h-26` / `h-22` / `h-35` / `r-21x9` / `r-16x9` / `r-16x10` / `img-slot` / `frame-cap` / `code-block` / `ghost` / `sys-diagram` / `sys-layer` / `loop-diagram` / `loop-node` / `grid-2-7-5` / `grid-2-6-6` / `grid-2-8-4` / `grid-2-5-7` / `grid-3` / `grid-4` / `grid-6` / `nav-safe-bottom` / `nav-safe-bottom-tight`

---

## 主题节奏规划

**在挑版式之前**，先列出每页的 `data-theme` 并检查节奏：

- 每页必须标注 `data-theme="light"` 或 `data-theme="dark"`
- **禁止连续 3 页以上同主题**
- 8 页以上必须有 ≥1 暗页 + ≥1 亮页
- 每 3-4 页插入 1 个 hero 级页面（加 `class="slide hero"`）

**示例规划表**（10 页 deck）：

| 页码 | 版式 | 主题 | hero? |
|------|------|------|-------|
| 1 | U01 Cover | dark | ✓ |
| 2 | U05 Split | light | |
| 3 | D01 Stat | light | |
| 4 | U02 Section | dark | ✓ |
| 5 | M01 Image+Text | light | |
| 6 | D04 Timeline | dark | |
| 7 | U04 Quote | light | ✓ |
| 8 | U06 Compare | dark | |
| 9 | D08 KPI Hero | light | ✓ |
| 10 | U03 Closing | dark | ✓ |

---

## 通用版式 U01-U08

---

### U01 · Cover 封面页

```html
<section class="slide hero" data-layout="U01" data-theme="dark">
  <div class="chrome" data-anim>
    <span>Brand Name</span>
    <span>2026.06</span>
  </div>
  <div class="slide-body" style="justify-content:center;align-items:flex-start;gap:var(--sp-6)">
    <span class="kicker" data-anim>Kicker · 标签</span>
    <h1 class="h-hero" data-anim>
      演示标题
    </h1>
    <p class="lead" data-anim style="max-width:55ch">
      一句话描述这个演示的核心内容，不超过两行。
    </p>
  </div>
  <div class="foot" data-anim>
    <span>演讲者姓名</span>
    <span>01 / 10</span>
  </div>
</section>
```

---

### U02 · Section Break 章节过渡

```html
<section class="slide hero" data-layout="U02" data-theme="dark">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Chapter</span>
  </div>
  <div class="slide-body" style="justify-content:center;align-items:flex-start;gap:var(--sp-5)">
    <span class="kicker" data-anim>Part 01</span>
    <h2 class="h-xl" data-anim>
      章节标题
    </h2>
    <p class="body-zh" data-anim style="max-width:40ch;opacity:0.6">
      引导语，简述本章将讨论什么。
    </p>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>03 / 10</span>
  </div>
</section>
```

---

### U03 · Closing 收束页

```html
<section class="slide hero" data-layout="U03" data-theme="dark">
  <div class="chrome" data-anim>
    <span>Brand</span>
  </div>
  <div class="slide-body" style="justify-content:center;align-items:center;text-align:center;gap:var(--sp-7)">
    <h2 class="h-hero" data-anim>谢谢</h2>
    <p class="body-zh" data-anim style="opacity:0.6;max-width:35ch">
      联系方式或下一步行动号召
    </p>
    <div data-anim style="display:flex;gap:var(--sp-5);align-items:center">
      <span class="tag">email@example.com</span>
      <span class="tag">@handle</span>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>10 / 10</span>
  </div>
</section>
```

---

### U04 · Big Quote 金句/引言

```html
<section class="slide hero" data-layout="U04" data-theme="light" data-animate="quote">
  <div class="chrome" data-anim>
    <span>Brand</span>
  </div>
  <div class="slide-body" style="justify-content:center;gap:var(--sp-6)">
    <div class="callout">
      <p class="q-big" data-anim="line">
        第一行引文，控制在整体
      </p>
      <p class="q-big" data-anim="line">
        不超过三行的范围。
      </p>
      <span class="cite" data-anim>— 引用来源</span>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>07 / 10</span>
  </div>
</section>
```

---

### U05 · Split Statement 左右分屏论点

```html
<section class="slide" data-layout="U05" data-theme="light" data-animate="directional">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Section</span>
  </div>
  <div class="slide-body">
    <div class="grid-2-5-7">
      <div data-anim="left" style="display:flex;flex-direction:column;gap:var(--sp-5)">
        <span class="kicker">Topic</span>
        <h2 class="h-xl">核心论点</h2>
      </div>
      <div data-anim="right" style="display:flex;flex-direction:column;gap:var(--sp-5)">
        <p class="body-zh">
          详细阐述第一段。这里展开核心论点的第一个维度，
          用具体的数据或案例支撑。
        </p>
        <p class="body-zh" style="opacity:0.7">
          第二段补充说明。提供额外的背景信息或补充论据，
          帮助听众理解完整图景。
        </p>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>04 / 10</span>
  </div>
</section>
```

---

### U06 · Before/After 并列对比

```html
<section class="slide" data-layout="U06" data-theme="dark" data-animate="directional">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Comparison</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-6)">
    <h2 class="h-md" data-anim>对比标题</h2>
    <div class="grid-2-6-6">
      <div data-anim="left" style="display:flex;flex-direction:column;gap:var(--sp-5);padding-right:var(--sp-6);border-right:1px solid var(--divider)">
        <span class="kicker">Before</span>
        <p class="body-zh">旧模式的描述。传统方法的痛点、
        低效之处、用户的真实抱怨。</p>
        <div class="stat-card">
          <span class="stat-label">效率</span>
          <span class="stat-num">23%</span>
          <span class="stat-note">远低于行业平均</span>
        </div>
      </div>
      <div data-anim="right" style="display:flex;flex-direction:column;gap:var(--sp-5)">
        <span class="kicker">After</span>
        <p class="body-zh">新方案的描述。改进后的流程、
        提升的具体指标、用户的正面反馈。</p>
        <div class="stat-card">
          <span class="stat-label">效率</span>
          <span class="stat-num">87%</span>
          <span class="stat-note">提升 3.8 倍</span>
        </div>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>06 / 10</span>
  </div>
</section>
```

---

### U07 · Pipeline 流程/步骤

```html
<section class="slide" data-layout="U07" data-theme="light" data-animate="pipeline">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Process</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-6)">
    <h2 class="h-md" data-anim>工作流程</h2>
    <div class="grid-3" style="gap:var(--sp-6)">
      <div class="pillar" data-anim="step">
        <span class="kicker">Step 01</span>
        <span class="t">第一步标题</span>
        <span class="d">简要描述这个步骤做什么、产出什么。</span>
      </div>
      <div class="pillar" data-anim="step">
        <span class="kicker">Step 02</span>
        <span class="t">第二步标题</span>
        <span class="d">简要描述这个步骤做什么、产出什么。</span>
      </div>
      <div class="pillar" data-anim="step">
        <span class="kicker">Step 03</span>
        <span class="t">第三步标题</span>
        <span class="d">简要描述这个步骤做什么、产出什么。</span>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>05 / 10</span>
  </div>
</section>
```

---

### U08 · Three Pillars 三支柱

```html
<section class="slide" data-layout="U08" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Framework</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-7)">
    <h2 class="h-md" data-anim>三大支柱</h2>
    <div class="grid-3">
      <div class="pillar" data-anim>
        <i data-lucide="zap" class="ico-md"></i>
        <span class="t">支柱一</span>
        <span class="d">详细描述第一个核心概念或支柱的内容。</span>
      </div>
      <div class="pillar" data-anim>
        <i data-lucide="shield" class="ico-md"></i>
        <span class="t">支柱二</span>
        <span class="d">详细描述第二个核心概念或支柱的内容。</span>
      </div>
      <div class="pillar" data-anim>
        <i data-lucide="target" class="ico-md"></i>
        <span class="t">支柱三</span>
        <span class="d">详细描述第三个核心概念或支柱的内容。</span>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>08 / 10</span>
  </div>
</section>
```

---

## 数据版式 D01-D08

---

### D01 · Stat Grid 数据大字报

```html
<section class="slide" data-layout="D01" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Data</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-7)">
    <h2 class="h-md" data-anim>核心指标</h2>
    <div class="grid-3">
      <div class="stat-card" data-anim>
        <span class="stat-label">指标一</span>
        <span class="stat-num">1.2<i class="num-unit">M</i></span>
        <span class="stat-note">同比增长 48%</span>
      </div>
      <div class="stat-card" data-anim>
        <span class="stat-label">指标二</span>
        <span class="stat-num">94<i class="num-unit">%</i></span>
        <span class="stat-note">用户满意度</span>
      </div>
      <div class="stat-card" data-anim>
        <span class="stat-label">指标三</span>
        <span class="stat-num">64<i class="num-unit">天</i></span>
        <span class="stat-note">平均交付周期</span>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>03 / 10</span>
  </div>
</section>
```

---

### D02 · KPI Tower 塔式柱图

```html
<section class="slide" data-layout="D02" data-theme="dark">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Metrics</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-6)">
    <h2 class="h-md" data-anim>柱状对比</h2>
    <div class="bar-tower-row nav-safe-bottom" data-anim>
      <div class="bar-tower">
        <span class="bar-value">24</span>
        <div class="bar-fill" style="height:30%"></div>
        <span class="bar-label">Q1</span>
      </div>
      <div class="bar-tower">
        <span class="bar-value">41</span>
        <div class="bar-fill" style="height:51%"></div>
        <span class="bar-label">Q2</span>
      </div>
      <div class="bar-tower">
        <span class="bar-value">67</span>
        <div class="bar-fill" style="height:84%"></div>
        <span class="bar-label">Q3</span>
      </div>
      <div class="bar-tower">
        <span class="bar-value">80</span>
        <div class="bar-fill" style="height:100%"></div>
        <span class="bar-label">Q4</span>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>05 / 10</span>
  </div>
</section>
```

---

### D03 · H-Bar Chart 横向排名

```html
<section class="slide" data-layout="D03" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Ranking</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-7)">
    <h2 class="h-md" data-anim>排名对比</h2>
    <div class="h-bar-chart" data-anim>
      <div class="bar-row">
        <span class="bar-name">项目 A</span>
        <div class="bar-track"><div class="bar-fill" style="width:92%"></div></div>
        <span class="bar-val">92%</span>
      </div>
      <div class="bar-row">
        <span class="bar-name">项目 B</span>
        <div class="bar-track"><div class="bar-fill" style="width:78%"></div></div>
        <span class="bar-val">78%</span>
      </div>
      <div class="bar-row">
        <span class="bar-name">项目 C</span>
        <div class="bar-track"><div class="bar-fill" style="width:65%"></div></div>
        <span class="bar-val">65%</span>
      </div>
      <div class="bar-row">
        <span class="bar-name">项目 D</span>
        <div class="bar-track"><div class="bar-fill" style="width:43%"></div></div>
        <span class="bar-val">43%</span>
      </div>
      <div class="bar-row">
        <span class="bar-name">项目 E</span>
        <div class="bar-track"><div class="bar-fill" style="width:28%"></div></div>
        <span class="bar-val">28%</span>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>06 / 10</span>
  </div>
</section>
```

---

### D04 · V-Timeline 垂直时间线

```html
<section class="slide" data-layout="D04" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Timeline</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-6)">
    <h2 class="h-md" data-anim>发展历程</h2>
    <div class="timeline-v nav-safe-bottom" data-anim>
      <div class="tl-node">
        <span class="tl-date">2022</span>
        <span class="tl-title">里程碑一</span>
        <span class="tl-desc">项目启动，完成核心技术验证。</span>
      </div>
      <div class="tl-node">
        <span class="tl-date">2023</span>
        <span class="tl-title">里程碑二</span>
        <span class="tl-desc">首个版本上线，获得种子用户。</span>
      </div>
      <div class="tl-node">
        <span class="tl-date">2024</span>
        <span class="tl-title">里程碑三</span>
        <span class="tl-desc">规模化增长，完成 A 轮融资。</span>
      </div>
      <div class="tl-node">
        <span class="tl-date">2025</span>
        <span class="tl-title">里程碑四</span>
        <span class="tl-desc">国际化拓展，进入新市场。</span>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>04 / 10</span>
  </div>
</section>
```

---

### D05 · H-Timeline 水平时间线

```html
<section class="slide" data-layout="D05" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Process</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-7)">
    <h2 class="h-md" data-anim>流程步骤</h2>
    <div class="timeline-h" data-anim>
      <div class="tl-h-node">
        <span class="tl-date">Phase 1</span>
        <span class="tl-title">研究发现</span>
        <span class="tl-desc">用户调研、竞品分析</span>
      </div>
      <div class="tl-h-node">
        <span class="tl-date">Phase 2</span>
        <span class="tl-title">设计定义</span>
        <span class="tl-desc">原型设计、用户测试</span>
      </div>
      <div class="tl-h-node">
        <span class="tl-date">Phase 3</span>
        <span class="tl-title">开发交付</span>
        <span class="tl-desc">迭代开发、质量保证</span>
      </div>
      <div class="tl-h-node">
        <span class="tl-date">Phase 4</span>
        <span class="tl-title">上线迭代</span>
        <span class="tl-desc">发布上线、数据驱动优化</span>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>07 / 10</span>
  </div>
</section>
```

---

### D06 · Matrix 矩阵网格

```html
<section class="slide" data-layout="D06" data-theme="dark">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Matrix</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-6)">
    <div style="display:flex;justify-content:space-between;align-items:flex-end" data-anim>
      <h2 class="h-md">能力矩阵</h2>
      <div class="stat-card" style="text-align:right">
        <span class="stat-label">Total</span>
        <span class="stat-num" style="font-size:clamp(1.5rem,3vw,2.5rem)">12</span>
      </div>
    </div>
    <div class="matrix-fill nav-safe-bottom" data-anim>
      <div class="matrix-cell"><span class="kicker">01</span><br><strong>能力一</strong></div>
      <div class="matrix-cell"><span class="kicker">02</span><br><strong>能力二</strong></div>
      <div class="matrix-cell"><span class="kicker">03</span><br><strong>能力三</strong></div>
      <div class="matrix-cell"><span class="kicker">04</span><br><strong>能力四</strong></div>
      <div class="matrix-cell"><span class="kicker">05</span><br><strong>能力五</strong></div>
      <div class="matrix-cell"><span class="kicker">06</span><br><strong>能力六</strong></div>
      <div class="matrix-cell"><span class="kicker">07</span><br><strong>能力七</strong></div>
      <div class="matrix-cell"><span class="kicker">08</span><br><strong>能力八</strong></div>
      <div class="matrix-cell"><span class="kicker">09</span><br><strong>能力九</strong></div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>08 / 10</span>
  </div>
</section>
```

---

### D07 · Spec Sheet 规格表

```html
<section class="slide" data-layout="D07" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Specs</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-6)">
    <h2 class="h-md" data-anim>技术规格</h2>
    <div class="nav-safe-bottom" data-anim>
      <div class="rowline"><span class="k">参数一</span><span class="v">具体数值或描述</span><span class="m">Unit</span></div>
      <div class="rowline"><span class="k">参数二</span><span class="v">具体数值或描述</span><span class="m">Unit</span></div>
      <div class="rowline"><span class="k">参数三</span><span class="v">具体数值或描述</span><span class="m">Unit</span></div>
      <div class="rowline"><span class="k">参数四</span><span class="v">具体数值或描述</span><span class="m">Unit</span></div>
      <div class="rowline"><span class="k">参数五</span><span class="v">具体数值或描述</span><span class="m">Unit</span></div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>09 / 10</span>
  </div>
</section>
```

---

### D08 · KPI Hero 大数字 Hero

```html
<section class="slide hero" data-layout="D08" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Key Metric</span>
  </div>
  <div class="slide-body" style="justify-content:center;align-items:flex-start;gap:var(--sp-5)">
    <span class="kicker" data-anim>核心指标</span>
    <div data-anim>
      <span class="num-mega">64<i class="num-unit" style="font-size:0.3em">天</i></span>
    </div>
    <p class="lead" data-anim style="max-width:50ch;opacity:0.65">
      一句话解释这个数字为什么重要，它代表了什么趋势。
    </p>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>09 / 10</span>
  </div>
</section>
```

---

## 图文版式 M01-M06

---

### M01 · Lead Image + Text 左文右图

```html
<section class="slide" data-layout="M01" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Feature</span>
  </div>
  <div class="slide-body">
    <div class="grid-2-7-5">
      <div data-anim style="display:flex;flex-direction:column;gap:var(--sp-5)">
        <span class="kicker">Feature</span>
        <h2 class="h-md">左文右图标题</h2>
        <p class="body-zh">
          详细描述内容。这里是图文混排的经典版式，
          左侧放文字说明，右侧放图片或截图。
        </p>
      </div>
      <div data-anim>
        <figure class="tile">
          <div class="frame-img h-35">
            <img src="images/example.jpg" alt="描述">
          </div>
          <figcaption class="frame-cap">
            <span class="pf"><span class="idx">fig.01</span>图片说明</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>05 / 10</span>
  </div>
</section>
```

---

### M02 · Image Grid 多图网格

```html
<section class="slide" data-layout="M02" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Gallery</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-6)">
    <h2 class="h-md" data-anim>多图展示</h2>
    <div class="grid-3 nav-safe-bottom" data-anim>
      <figure class="tile">
        <div class="frame-img h-26"><img src="images/01.jpg" alt="图一"></div>
        <figcaption class="frame-cap"><span class="pf"><span class="idx">01</span>说明一</span></figcaption>
      </figure>
      <figure class="tile">
        <div class="frame-img h-26"><img src="images/02.jpg" alt="图二"></div>
        <figcaption class="frame-cap"><span class="pf"><span class="idx">02</span>说明二</span></figcaption>
      </figure>
      <figure class="tile">
        <div class="frame-img h-26"><img src="images/03.jpg" alt="图三"></div>
        <figcaption class="frame-cap"><span class="pf"><span class="idx">03</span>说明三</span></figcaption>
      </figure>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>06 / 10</span>
  </div>
</section>
```

---

### M03 · Image Hero 全幅顶图

```html
<section class="slide" data-layout="M03" data-theme="dark">
  <div class="frame-img r-21x9" data-anim style="margin:calc(-1 * clamp(1.5rem, 3.5vw, 4rem));margin-bottom:0;flex-shrink:0">
    <img src="images/hero.jpg" alt="Hero Image">
  </div>
  <div class="slide-body" style="gap:var(--sp-5);padding-top:var(--sp-6)">
    <h2 class="h-md" data-anim>图片标题</h2>
    <div class="grid-3" data-anim>
      <div class="stat-card">
        <span class="stat-label">指标 A</span>
        <span class="stat-num" style="font-size:clamp(1.5rem,3vw,2.5rem)">128</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">指标 B</span>
        <span class="stat-num" style="font-size:clamp(1.5rem,3vw,2.5rem)">94%</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">指标 C</span>
        <span class="stat-num" style="font-size:clamp(1.5rem,3vw,2.5rem)">3.2x</span>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>07 / 10</span>
  </div>
</section>
```

---

### M04 · Screenshot Frame 截图美化

```html
<section class="slide" data-layout="M04" data-theme="dark">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Demo</span>
  </div>
  <div class="slide-body" style="justify-content:center;align-items:center;gap:var(--sp-6)">
    <h2 class="h-sub" data-anim style="text-align:center">产品截图</h2>
    <div class="frame-img fit-contain" data-anim style="max-height:60vh;max-width:85%;background:var(--ink-faint);padding:var(--sp-5)">
      <img src="images/screenshot.png" alt="Product Screenshot" style="border-radius:4px">
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>04 / 10</span>
  </div>
</section>
```

---

### M05 · Gallery Strip 横向画廊条

```html
<section class="slide" data-layout="M05" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Gallery</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-6)">
    <h2 class="h-md" data-anim>横向画廊</h2>
    <div data-anim style="display:flex;gap:var(--sp-4);overflow:hidden" class="nav-safe-bottom">
      <figure class="tile" style="flex:1;min-width:0">
        <div class="frame-img h-35"><img src="images/g1.jpg" alt=""></div>
        <figcaption class="frame-cap"><span class="pf">图一</span></figcaption>
      </figure>
      <figure class="tile" style="flex:1;min-width:0">
        <div class="frame-img h-35"><img src="images/g2.jpg" alt=""></div>
        <figcaption class="frame-cap"><span class="pf">图二</span></figcaption>
      </figure>
      <figure class="tile" style="flex:1;min-width:0">
        <div class="frame-img h-35"><img src="images/g3.jpg" alt=""></div>
        <figcaption class="frame-cap"><span class="pf">图三</span></figcaption>
      </figure>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>05 / 10</span>
  </div>
</section>
```

---

### M06 · System Diagram 架构/系统图

```html
<section class="slide" data-layout="M06" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Architecture</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-7)">
    <h2 class="h-md" data-anim>系统架构</h2>
    <div class="sys-diagram nav-safe-bottom" data-anim>
      <div class="sys-layer">
        <span class="sys-label">应用层</span>
        <div class="sys-items">
          <span class="sys-item">Web App</span>
          <span class="sys-item">Mobile App</span>
          <span class="sys-item">Admin Panel</span>
        </div>
      </div>
      <div class="sys-layer">
        <span class="sys-label">服务层</span>
        <div class="sys-items">
          <span class="sys-item">API Gateway</span>
          <span class="sys-item">Auth Service</span>
          <span class="sys-item">Business Logic</span>
          <span class="sys-item">Search</span>
        </div>
      </div>
      <div class="sys-layer">
        <span class="sys-label">数据层</span>
        <div class="sys-items">
          <span class="sys-item">PostgreSQL</span>
          <span class="sys-item">Redis</span>
          <span class="sys-item">S3</span>
        </div>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>06 / 10</span>
  </div>
</section>
```

---

## 扩展版式 X01-X03

---

### X01 · Code Slide 代码展示

```html
<section class="slide" data-layout="X01" data-theme="dark">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Code</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-6)">
    <h2 class="h-md" data-anim>代码示例</h2>
    <div class="code-block" data-anim>
<span class="keyword">const</span> <span class="function">createSlide</span> = (layout, theme) => {
  <span class="keyword">const</span> section = document.createElement(<span class="string">'section'</span>);
  section.className = <span class="string">'slide'</span>;
  section.dataset.layout = layout;
  section.dataset.theme = theme;
  <span class="keyword">return</span> section;
};
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>07 / 10</span>
  </div>
</section>
```

---

### X02 · Rowline Table 表格行列表

```html
<section class="slide" data-layout="X02" data-theme="light">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Details</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-6)">
    <h2 class="h-md" data-anim>详细信息</h2>
    <div class="nav-safe-bottom" data-anim>
      <div class="rowline"><span class="k">关键词一</span><span class="v">详细描述信息</span><span class="m">Type A</span></div>
      <div class="rowline"><span class="k">关键词二</span><span class="v">详细描述信息</span><span class="m">Type B</span></div>
      <div class="rowline"><span class="k">关键词三</span><span class="v">详细描述信息</span><span class="m">Type A</span></div>
      <div class="rowline"><span class="k">关键词四</span><span class="v">详细描述信息</span><span class="m">Type C</span></div>
      <div class="rowline"><span class="k">关键词五</span><span class="v">详细描述信息</span><span class="m">Type B</span></div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>06 / 10</span>
  </div>
</section>
```

---

### X03 · Feature Cards 特性卡片

```html
<section class="slide" data-layout="X03" data-theme="dark">
  <div class="chrome" data-anim>
    <span>Brand</span>
    <span>Features</span>
  </div>
  <div class="slide-body" style="gap:var(--sp-7)">
    <h2 class="h-md" data-anim>核心特性</h2>
    <div class="grid-4" data-anim>
      <div class="feature-card">
        <i data-lucide="sparkles" class="ico-md"></i>
        <strong class="h-sub">特性一</strong>
        <p class="body-zh" style="opacity:0.65">简要描述这个特性的核心价值和用户收益。</p>
      </div>
      <div class="feature-card">
        <i data-lucide="layers" class="ico-md"></i>
        <strong class="h-sub">特性二</strong>
        <p class="body-zh" style="opacity:0.65">简要描述这个特性的核心价值和用户收益。</p>
      </div>
      <div class="feature-card">
        <i data-lucide="rocket" class="ico-md"></i>
        <strong class="h-sub">特性三</strong>
        <p class="body-zh" style="opacity:0.65">简要描述这个特性的核心价值和用户收益。</p>
      </div>
      <div class="feature-card">
        <i data-lucide="shield-check" class="ico-md"></i>
        <strong class="h-sub">特性四</strong>
        <p class="body-zh" style="opacity:0.65">简要描述这个特性的核心价值和用户收益。</p>
      </div>
    </div>
  </div>
  <div class="foot" data-anim>
    <span>Brand Name</span>
    <span>08 / 10</span>
  </div>
</section>
```

---

## 版式选择决策树

```
用户给了什么内容?
│
├─ 标题 / 开场 ─────────→ U01 Cover
├─ 新章节 ──────────────→ U02 Section Break
├─ 结尾 / 致谢 ─────────→ U03 Closing
├─ 一句金句 ────────────→ U04 Big Quote
├─ 一个论点 + 展开 ─────→ U05 Split Statement
├─ A vs B 对比 ─────────→ U06 Before/After
├─ 3-6 步流程 ──────────→ U07 Pipeline 或 D05 H-Timeline
├─ 3 个等权概念 ────────→ U08 Three Pillars
├─ 4-6 个 KPI 数字 ─────→ D01 Stat Grid
├─ 4 项高低对比 ────────→ D02 KPI Tower
├─ 5-10 项排名 ─────────→ D03 H-Bar Chart
├─ 时间线 (垂直) ───────→ D04 V-Timeline
├─ 8-12 项分类 ─────────→ D06 Matrix
├─ 技术参数 ────────────→ D07 Spec Sheet
├─ 一个核心大数字 ──────→ D08 KPI Hero
├─ 一张图 + 文字 ───────→ M01 Lead Image + Text
├─ 3-6 张图 ────────────→ M02 Image Grid 或 M05 Gallery Strip
├─ 全幅大图 ────────────→ M03 Image Hero
├─ 产品截图 ────────────→ M04 Screenshot Frame
├─ 架构图 ──────────────→ M06 System Diagram
├─ 代码示例 ────────────→ X01 Code Slide
├─ 关键词-描述对 ───────→ X02 Rowline Table
└─ 4 个特性 ────────────→ X03 Feature Cards
```
