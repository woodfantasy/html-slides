# 中文排版规则 · Chinese Typography

> 原生中文排版，不是英文规则的翻译。

---

## 字体三层分工

每套风格必须定义三层字体，不允许只用一种：

| 层 | 角色 | 用在哪里 |
|----|------|----------|
| **Display** (展示字) | 大标题、Hero 页、金句 | `.h-hero`, `.h-xl`, `.q-big` |
| **Body** (正文字) | 正文、描述、大段阅读 | `.body-zh`, `.lead` |
| **Mono** (等宽字) | 元数据、标签、页码、kicker | `.kicker`, `.meta`, `.chrome`, `.foot` |

### 各风格字体配置

| 风格 | Display | Body | Mono |
|------|---------|------|------|
| 墨刊 | Noto Serif SC + Playfair Display | Noto Sans SC + IBM Plex Sans | IBM Plex Mono |
| 瑞士 | Inter + Helvetica Neue | Noto Sans SC + Inter | IBM Plex Mono |
| 暗植 | Cormorant | IBM Plex Sans | IBM Plex Mono |
| 信号 | Archivo Black | Space Grotesk | IBM Plex Mono |
| 纸墨 | Cormorant Garamond + Source Serif 4 | Work Sans | IBM Plex Mono |
| 电压 | Syne | Space Mono | Space Mono |
| 素简 | Plus Jakarta Sans | Plus Jakarta Sans | IBM Plex Mono |
| 赛博 | JetBrains Mono | JetBrains Mono | JetBrains Mono |

---

## 中文大标题字号分档（必做）

中文方块字视觉面积比拉丁字母大 30-50%，不能直接套英文字号规则。

### 分档表

| 标题形态 | 推荐字号 | CSS 写法 |
|----------|----------|----------|
| 1 行 ≤ 6 字 | 最大 | `font-size: min(7vw, 12vh)` |
| 1 行 7-8 字 | 大 | `font-size: min(6.4vw, 11.2vh)` |
| 2 行 每行 ≤ 8 字 | 中大 | `font-size: min(5.8vw, 10.2vh)` |
| 2 行 任一行 9-12 字 | 中 | `font-size: min(5.2vw, 9.2vh)` |
| 3 行或更长 | 最小 | `font-size: min(4.6vw, 8.2vh)` |

### 为什么用 `min(vw, vh)` 双约束

```css
/* ❌ 只约束宽度：16:9 屏幕上可能太大，4:3 屏幕上溢出 */
font-size: 7vw;

/* ✅ 双约束：既不超宽也不超高 */
font-size: min(7vw, 12vh);
```

### 实践技巧

1. **先改标题文案再改字号** — 如果标题太长，优先缩减字数
2. **2 行标题用 `<br>` 手动断行** — 不要让浏览器自动断行
3. **数字混排用 `tabular-nums`** — 对齐数字列

---

## 中英混排规则

### 中英文间距

中文和英文之间需要留空格（但不需要额外 CSS，HTML 里直接打空格即可）：

```html
<!-- ✅ -->
<p>这是一段关于 html-slides 的描述</p>

<!-- ❌ -->
<p>这是一段关于html-slides的描述</p>
```

### 英文关键词强调

在中文语境中出现的英文关键词，用 `<em class="en">` 包裹以获取衬线斜体效果：

```html
<p class="body-zh">
  我们采用了 <em class="en">Design Kernel</em> 架构，
  确保每个版式的 <em class="en">Layout Skeleton</em> 都经过注册。
</p>
```

### 引文标注

- 中文引号用「」和『』
- 书名号用《》
- 英文引号只在引用英文文献时使用

---

## 行高与段间距

| 元素 | 行高 | 段间距 |
|------|------|--------|
| 大标题 (h-hero) | 1.15 | - |
| 节标题 (h-xl) | 1.2 | - |
| 段标题 (h-md) | 1.3 | - |
| 正文 (body-zh) | 1.7 | `var(--sp-5)` 16px |
| 引文 (lead) | 1.7 | - |
| 元数据 (kicker/meta) | 1.4 | - |

### 为什么正文行高是 1.7

中文方块字无上下出头（ascender/descender），视觉上行间距比同行高的英文更紧。1.7 是中文正文的舒适阅读行高（英文通常 1.5 就够了）。

---

## 标点规范

- **禁止使用 emoji** — 用 Lucide 图标替代
- **序号**：用 `01 / 02 / 03`，不用 `1. 2. 3.`
- **省略号**：用中文省略号 `……`，不用 `...`
- **破折号**：用 `——`，不用 `--` 或 `—`
- **分隔符**：kicker 中用 `·` 或 `×`，如 `策展级 × 数据原生`

---

## 高亮标注

用 `.hi` class 给关键词加底部高亮条：

```html
<p class="lead">
  这是一段描述，其中<span class="hi">关键概念</span>会被高亮标注。
</p>
```

效果：`accent` 色 25% 不透明度的底部高亮条（类似荧光笔效果），暗页自动加深到 40%。
