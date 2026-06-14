# 主题色参考 · Theme Tokens

> 8 套策展级风格，每套 2-3 个配色方案。  
> 一份 deck 只用一套方案，不允许混搭或自定义 hex。

---

## 1. 墨刊 · Ink Editorial

**字体**: `Noto Serif SC` + `Playfair Display` (Display) / `IBM Plex Sans` (Body) / `IBM Plex Mono` (Mono)  
**美学**: 电子杂志 × 电子墨水，衬线标题 + 非衬线正文 + 等宽元数据  
**模板**: `assets/template-editorial.html`

### 1A · 经典墨水（默认）

```css
:root {
  --ink: #0A0A0B; --ink-rgb: 10, 10, 11;
  --paper: #F5F1EB; --paper-rgb: 245, 241, 235;
  --accent: #2D5A88; --accent-rgb: 45, 90, 136;
  --paper-tint: #EDE8E0;
  --ink-muted: rgba(var(--ink-rgb), 0.55);
  --ink-faint: rgba(var(--ink-rgb), 0.08);
}
```

适合：通用、商业发布、不知道选啥的默认

### 1B · 靛蓝瓷

```css
:root {
  --ink: #0C1220; --ink-rgb: 12, 18, 32;
  --paper: #F0F2F7; --paper-rgb: 240, 242, 247;
  --accent: #3B5998; --accent-rgb: 59, 89, 152;
  --paper-tint: #E4E8F0;
  --ink-muted: rgba(var(--ink-rgb), 0.55);
  --ink-faint: rgba(var(--ink-rgb), 0.08);
}
```

适合：科技、研究、数据、技术发布会

### 1C · 森林墨

```css
:root {
  --ink: #0D1410; --ink-rgb: 13, 20, 16;
  --paper: #F2F0E8; --paper-rgb: 242, 240, 232;
  --accent: #3A6B4E; --accent-rgb: 58, 107, 78;
  --paper-tint: #E6E4D8;
  --ink-muted: rgba(var(--ink-rgb), 0.55);
  --ink-faint: rgba(var(--ink-rgb), 0.08);
}
```

适合：自然、可持续、文化、非虚构

---

## 2. 瑞士 · Swiss Grid

**字体**: `Inter` + `Helvetica Neue` (Display) / `Noto Sans SC` (Body) / `IBM Plex Mono` (Mono)  
**美学**: 极致字号对比 + 12 列网格 + 单 accent 功能色 + 直角纯色  
**模板**: `assets/template-swiss.html`

### 2A · 克莱因蓝 IKB（默认）

```css
:root {
  --ink: #0A0A0A; --ink-rgb: 10, 10, 10;
  --paper: #FAFAF8; --paper-rgb: 250, 250, 248;
  --accent: #002FA7; --accent-rgb: 0, 47, 167;
  --paper-tint: #F0F0EE;
  --ink-muted: rgba(var(--ink-rgb), 0.55);
  --ink-faint: rgba(var(--ink-rgb), 0.06);
}
```

### 2B · 柠檬黄

```css
:root {
  --ink: #0A0A0A; --ink-rgb: 10, 10, 10;
  --paper: #FAFAF8; --paper-rgb: 250, 250, 248;
  --accent: #D4E000; --accent-rgb: 212, 224, 0;
  --paper-tint: #F0F0EE;
  --ink-muted: rgba(var(--ink-rgb), 0.55);
  --ink-faint: rgba(var(--ink-rgb), 0.06);
}
```

### 2C · 安全橙

```css
:root {
  --ink: #0A0A0A; --ink-rgb: 10, 10, 10;
  --paper: #FAFAF8; --paper-rgb: 250, 250, 248;
  --accent: #FF6B00; --accent-rgb: 255, 107, 0;
  --paper-tint: #F0F0EE;
  --ink-muted: rgba(var(--ink-rgb), 0.55);
  --ink-faint: rgba(var(--ink-rgb), 0.06);
}
```

---

## 3. 暗植 · Dark Botanical

**字体**: `Cormorant` (Display) / `IBM Plex Sans` (Body) / `IBM Plex Mono` (Mono)  
**美学**: 暗底 + 暖金色系 + 抽象渐变圆 + 衬线展示字  
**模板**: `assets/template-botanical.html`

### 3A · 暗金（默认）

```css
:root {
  --ink: #0F0F0F; --ink-rgb: 15, 15, 15;
  --paper: #E8E4DF; --paper-rgb: 232, 228, 223;
  --accent: #D4A574; --accent-rgb: 212, 165, 116;
  --paper-tint: #2A2520;
  --ink-muted: rgba(var(--paper-rgb), 0.55);
  --ink-faint: rgba(var(--paper-rgb), 0.08);
}
```

### 3B · 暗玫瑰

```css
:root {
  --ink: #100D0E; --ink-rgb: 16, 13, 14;
  --paper: #F0E5E0; --paper-rgb: 240, 229, 224;
  --accent: #C87A80; --accent-rgb: 200, 122, 128;
  --paper-tint: #2A2224;
  --ink-muted: rgba(var(--paper-rgb), 0.55);
  --ink-faint: rgba(var(--paper-rgb), 0.08);
}
```

---

## 4. 信号 · Bold Signal

**字体**: `Archivo Black` (Display) / `Space Grotesk` (Body) / `IBM Plex Mono` (Mono)  
**美学**: 暗底 + 大色块卡片 + 章节编号 + 粗黑体  
**模板**: `assets/template-signal.html`

### 4A · 橙信号（默认）

```css
:root {
  --ink: #1A1A1A; --ink-rgb: 26, 26, 26;
  --paper: #FFFFFF; --paper-rgb: 255, 255, 255;
  --accent: #FF5722; --accent-rgb: 255, 87, 34;
  --paper-tint: #2D2D2D;
  --ink-muted: rgba(var(--paper-rgb), 0.55);
  --ink-faint: rgba(var(--paper-rgb), 0.08);
}
```

### 4B · 蓝信号

```css
:root {
  --ink: #0A0A1A; --ink-rgb: 10, 10, 26;
  --paper: #FFFFFF; --paper-rgb: 255, 255, 255;
  --accent: #4361EE; --accent-rgb: 67, 97, 238;
  --paper-tint: #1A1A2D;
  --ink-muted: rgba(var(--paper-rgb), 0.55);
  --ink-faint: rgba(var(--paper-rgb), 0.08);
}
```

---

## 5. 纸墨 · Paper & Ink

**字体**: `Cormorant Garamond` + `Source Serif 4` (Display) / `Work Sans` (Body) / `IBM Plex Mono` (Mono)  
**美学**: 暖纸色 + 衬线为主 + 首字下沉 + 分割线  
**模板**: `assets/template-paper.html`

### 5A · 暖纸（默认）

```css
:root {
  --ink: #1A1A1A; --ink-rgb: 26, 26, 26;
  --paper: #FAF9F7; --paper-rgb: 250, 249, 247;
  --accent: #C41E3A; --accent-rgb: 196, 30, 58;
  --paper-tint: #F0EFEC;
  --ink-muted: rgba(var(--ink-rgb), 0.55);
  --ink-faint: rgba(var(--ink-rgb), 0.08);
}
```

### 5B · 冷白

```css
:root {
  --ink: #1C1C1E; --ink-rgb: 28, 28, 30;
  --paper: #FEFEFE; --paper-rgb: 254, 254, 254;
  --accent: #2C3E50; --accent-rgb: 44, 62, 80;
  --paper-tint: #F2F2F4;
  --ink-muted: rgba(var(--ink-rgb), 0.55);
  --ink-faint: rgba(var(--ink-rgb), 0.08);
}
```

---

## 6. 电压 · Creative Voltage

**字体**: `Syne` (Display) / `Space Mono` (Body) / `Space Mono` (Mono)  
**美学**: 暗底 + 双面板分屏 + 半色调纹理 + 霓虹点缀  
**模板**: `assets/template-voltage.html`

### 6A · 电蓝（默认）

```css
:root {
  --ink: #1A1A2E; --ink-rgb: 26, 26, 46;
  --paper: #E8E8F0; --paper-rgb: 232, 232, 240;
  --accent: #0066FF; --accent-rgb: 0, 102, 255;
  --accent-2: #D4FF00; /* 霓虹黄（仅此风格有双 accent） */
  --paper-tint: #28283E;
  --ink-muted: rgba(var(--paper-rgb), 0.55);
  --ink-faint: rgba(var(--paper-rgb), 0.08);
}
```

### 6B · 电紫

```css
:root {
  --ink: #1A1020; --ink-rgb: 26, 16, 32;
  --paper: #F0E8F0; --paper-rgb: 240, 232, 240;
  --accent: #8B5CF6; --accent-rgb: 139, 92, 246;
  --accent-2: #00FFD4;
  --paper-tint: #2A2035;
  --ink-muted: rgba(var(--paper-rgb), 0.55);
  --ink-faint: rgba(var(--paper-rgb), 0.08);
}
```

---

## 7. 素简 · Calm Minimal

**字体**: `Plus Jakarta Sans` (Display + Body) / `IBM Plex Mono` (Mono)  
**美学**: 极致留白 + 细线条 + 缓慢动效 + 亮底  
**模板**: `assets/template-minimal.html`

### 7A · 云白（默认）

```css
:root {
  --ink: #1A1A1A; --ink-rgb: 26, 26, 26;
  --paper: #FAFAFA; --paper-rgb: 250, 250, 250;
  --accent: #2D2D2D; --accent-rgb: 45, 45, 45;
  --paper-tint: #F0F0F0;
  --ink-muted: rgba(var(--ink-rgb), 0.45);
  --ink-faint: rgba(var(--ink-rgb), 0.06);
}
```

### 7B · 暖灰

```css
:root {
  --ink: #2C2C2A; --ink-rgb: 44, 44, 42;
  --paper: #F8F6F2; --paper-rgb: 248, 246, 242;
  --accent: #6B6B66; --accent-rgb: 107, 107, 102;
  --paper-tint: #EEEAE4;
  --ink-muted: rgba(var(--ink-rgb), 0.45);
  --ink-faint: rgba(var(--ink-rgb), 0.06);
}
```

---

## 8. 赛博 · Neon Cyber

**字体**: `JetBrains Mono` (Display + Body + Mono)  
**美学**: 暗底 + 终端绿/霓虹蓝 + 粒子背景 + 扫描线  
**模板**: `assets/template-cyber.html`

### 8A · 终端绿（默认）

```css
:root {
  --ink: #0D1117; --ink-rgb: 13, 17, 23;
  --paper: #C9D1D9; --paper-rgb: 201, 209, 217;
  --accent: #39D353; --accent-rgb: 57, 211, 83;
  --paper-tint: #161B22;
  --ink-muted: rgba(var(--paper-rgb), 0.55);
  --ink-faint: rgba(var(--paper-rgb), 0.08);
}
```

### 8B · 霓虹蓝

```css
:root {
  --ink: #0A0F1C; --ink-rgb: 10, 15, 28;
  --paper: #D0D8E8; --paper-rgb: 208, 216, 232;
  --accent: #00FFCC; --accent-rgb: 0, 255, 204;
  --paper-tint: #141A28;
  --ink-muted: rgba(var(--paper-rgb), 0.55);
  --ink-faint: rgba(var(--paper-rgb), 0.08);
}
```

---

## 选色决策表

| 如果用户说… | 推荐 |
|---|---|
| "杂志感" / "人文" / 不指定 | 1A 经典墨水 |
| "瑞士风" / "Swiss" / "极简网格" | 2A 克莱因蓝 |
| "高端" / "品牌" / "画廊" | 3A 暗金 |
| "发布会" / "Pitch" / "TED" | 4A 橙信号 |
| "教育" / "文学" / "editorial" | 5A 暖纸 |
| "创意" / "设计" / "工作室" | 6A 电蓝 |
| "简洁" / "Apple" / "无印" | 7A 云白 |
| "技术大会" / "开发者" / "Hacker" | 8A 终端绿 |
| 数据密集内容 | 2 瑞士 or 4 信号 |
| 大量人文图片 | 1 墨刊 or 5 纸墨 |
| AI 产品发布 | 2B/4A/8B |
