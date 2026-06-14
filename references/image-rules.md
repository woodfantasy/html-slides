# 图片规则 · Image Pipeline

> 六条硬规则 + 标准比例表 + 截图美化指南

---

## 六条硬规则

### Rule 1 · 多图网格只用 `height:Nvh`

**禁用 `aspect-ratio`**。网格内 `aspect-ratio` 会撑破容器，导致 overflow。

```css
/* ✅ 正确 */
.frame-img.h-26 img { height: 26vh; width: 100%; object-fit: cover; }

/* ❌ 错误 */
.frame-img img { aspect-ratio: 16/9; }
```

### Rule 2 · 只裁底部

所有 `<img>` 默认：

```css
object-position: top center; /* 保护顶部和左右，只裁底部 */
```

### Rule 3 · 同组图片统一高度

同一 `grid-3` 或 `grid-4` 内的图片，必须用同一个 `h-XX` class。

```html
<!-- ✅ 正确：统一 h-26 -->
<div class="grid-3">
  <div class="frame-img h-26"><img src="a.jpg"></div>
  <div class="frame-img h-26"><img src="b.jpg"></div>
  <div class="frame-img h-26"><img src="c.jpg"></div>
</div>

<!-- ❌ 错误：混用不同高度 -->
<div class="grid-3">
  <div class="frame-img h-26"><img src="a.jpg"></div>
  <div class="frame-img h-35"><img src="b.jpg"></div>
  <div class="frame-img h-22"><img src="c.jpg"></div>
</div>
```

### Rule 4 · 底部安全区 93vh

内容最低处不超过 93vh。给底部导航点留空间。

对于垂直填充度高的版式，加 `.nav-safe-bottom`。

### Rule 5 · 截图用 `object-fit: contain`

信息图、截图、UI 截图中的文字不可被裁切：

```html
<div class="frame-img fit-contain" style="max-height:60vh;background:var(--ink-faint)">
  <img src="screenshot.png" alt="描述" style="border-radius:4px">
</div>
```

### Rule 6 · 无图时用占位符

```html
<div class="img-slot" style="height:30vh">
  <!-- 虚线框 + 加号 -->
</div>
```

---

## 标准比例表

| 场景 | 推荐比例 | CSS Class / 写法 | 高度限制 |
|------|----------|-------------------|----------|
| Hero 顶图 | 21:9 | `.frame-img.r-21x9` | `height: 35vh` |
| 左文右图 | 16:10 或 4:3 | `.frame-img.h-35` | `max-height: 56vh` |
| 多图网格 (3列) | 统一 | `.frame-img.h-26` | 26vh |
| 多图网格 (2列) | 统一 | `.frame-img.h-35` | 35vh |
| 截图美化 | 16:10 | `.frame-img.fit-contain` | `max-height: 60vh` |
| 全屏主视觉 | 16:9 | `.frame-img.r-16x9` | `max-height: 64vh` |
| 方形 | 1:1 | `width: 12vh; height: 12vh` | - |

---

## 图片文件规范

- **目录**：`images/`（和 `index.html` 同级）
- **命名**：`{页号}-{语义}.{ext}`，如 `01-cover.jpg`、`05-architecture.png`
- **格式**：JPG（照片）/ PNG（透明图/截图）/ WebP（优化后）/ SVG（图标/图表）
- **分辨率**：≥ 1600px 宽（2x 屏幕）
- **总大小**：单个 deck 的图片总量控制在 10MB 以内
- **alt 文本**：所有 `<img>` 必须有描述性 alt 属性

---

## 截图美化

### 基本用法

```html
<!-- M04 Screenshot Frame 版式 -->
<div class="frame-img fit-contain" style="max-height:60vh;max-width:85%;background:var(--ink-faint);padding:var(--sp-5)">
  <img src="images/04-screenshot.png" alt="Product Screenshot" style="border-radius:4px">
</div>
```

### 美化技巧

1. **内边距**：`padding: var(--sp-5)` 给截图留呼吸空间
2. **圆角**：`border-radius: 4px` 柔化边缘
3. **阴影**（暗底）：`box-shadow: 0 8px 32px rgba(0,0,0,0.3)`
4. **背景色**：用 `var(--ink-faint)` 或 `var(--paper-tint)` 而非自定义色
