---
name: html-slides
description: 生成精品级 HTML 演示文稿（单文件），含 8 套策展级风格、25+ 注册版式、数据可视化原语、WebGL 背景、Speaker View。当用户需要制作演讲 / 分享 / Pitch Deck / 发布会风格的网页 PPT 时使用。
---

# html-slides · 制作 PPT 与 HTML Presentation

> **特色**: 策展级配色 × 版式骨架库 × 数据可视化原语 × 中英双语深度排版

## 做什么

生成一份**单文件 HTML**的横向翻页演示文稿，提供 8 种可选的视觉风格：

| # | 风格 | 美学锚点 | 适合 |
|---|------|----------|------|
| 1 | 墨刊 · Ink Editorial | Monocle × e-ink | 人文、行业观察、文化 |
| 2 | 瑞士 · Swiss Grid | Vignelli × Helvetica | 科技产品、数据汇报 |
| 3 | 暗植 · Dark Botanical | 画廊 × 品牌 | 品牌发布、艺术 |
| 4 | 信号 · Bold Signal | TED × 发布会 | 商业 Pitch |
| 5 | 纸墨 · Paper & Ink | 独立出版物 | 教育、文学 |
| 6 | 电压 · Creative Voltage | 设计工作室 | 创意提案 |
| 7 | 素简 · Calm Minimal | 无印 × Apple | 产品说明 |
| 8 | 赛博 · Neon Cyber | 终端 × 黑客 | 技术大会 |

**共享特性**：横向翻页（← → / Space / 滚轮 / 触屏）、ESC 索引、S 键 Speaker View、B 键低功耗、WebGL 背景、Lucide 图标、Motion One 动效。

## 何时使用

**合适**：演讲、行业分享、产品发布、Pitch Deck、年度总结、技术大会
**不合适**：大段表格/图表叠加（用 PPT）、培训课件（信息密度不够）、多人协作编辑

---

## 工作流

### Step 1 · 需求澄清（动手前必做）

**如果用户已给完整大纲 + 图片处理要求**，可跳过直接进 Step 2。

**如果用户只给了主题或模糊想法**，用以下 7 问逐个对齐：

| # | 问题 | 决定 |
|---|------|------|
| 1 | **选择风格**（展示 8 种 + 描述） | template 文件 |
| 2 | **选择配色**（该风格下 2-3 个方案） | CSS Token Set |
| 3 | **受众和场景** | 语言风格和深度 |
| 4 | **分享时长**（15min→10页, 30min→20页, 45min→25-30页） | 页数 |
| 5 | **有无素材**（文档/数据/旧 PPT/文章链接） | 内容来源 |
| 6 | **有无图片/截图** + 处理需求 | 图文版式选择 |
| 7 | **硬约束**（必须/不能包含） | 护栏 |

#### 风格选择参考

| 如果用户说… | 推荐 |
|---|---|
| "杂志感" / "人文" / 不指定 | 1 · 墨刊 |
| "瑞士风" / "Swiss" / "极简网格" / "数据驱动" | 2 · 瑞士 |
| "高端" / "品牌" / "画廊" | 3 · 暗植 |
| "发布会" / "Pitch" / "TED" | 4 · 信号 |
| "教育" / "文学" / "editorial" | 5 · 纸墨 |
| "创意" / "设计" / "工作室" | 6 · 电压 |
| "简洁" / "Apple" / "无印" | 7 · 素简 |
| "技术大会" / "开发者" / "Hacker" | 8 · 赛博 |

#### 大纲协助

如果用户没有大纲，用叙事弧模板：

```
钩子(Hook)       → 1 页   : 抛一个反差 / 问题 / 硬数据
定调(Context)    → 1-2 页 : 说明背景 / 你是谁
主体(Core)       → 3-5 页 : 核心内容，穿插不同版式
转折(Shift)      → 1 页   : 打破预期
收束(Takeaway)   → 1-2 页 : 金句 / 行动建议
```

#### 图片约定

- 文件夹：`images/`（和 `index.html` 同级）
- 命名：`{页号}-{语义}.{ext}`，如 `01-cover.jpg`
- 规格：≥ 1600px 宽，JPG 照片 / PNG 透明图，总大小 ≤ 10MB

### Step 2 · 拷贝模板

根据 Step 1 选定的风格，拷贝对应的模板到目标位置。**目前已实现的模板**：

```bash
mkdir -p "项目/XXX/ppt/images"

# 墨刊 · Ink Editorial
cp "<SKILL_ROOT>/assets/template-editorial.html" "项目/XXX/ppt/index.html"
```

> 其他 7 种风格的模板正在开发中。如果用户选择了尚未实现的风格，基于 template-editorial.html 修改 CSS Token 即可适配。

**拷贝后立刻做**：
1. 替换 `<title>` 标签中的 `[必填]` 文字
2. 按 `references/themes.md` 替换 `:root` 配色块

#### 配色规则（硬性）

- 一份 deck 只用一套方案，不允许混搭
- 不接受用户自定义 hex 值——展示可选方案让选
- 打开 `references/themes.md`，找到对应风格和方案的 `:root` 块整体替换

### Step 3 · 填充内容

#### 3.0 · 预检：类名必须在模板 `<style>` 里有定义

**这是所有生成问题的源头**。模板的 `<style>` 是类名的唯一来源。

**动手前**：
1. 先 Read 当前模板的 `<style>` 块
2. 对照 `references/layouts.md` 的 Pre-flight 清单，确认类名都存在
3. 如果缺失，在模板 `<style>` 里补上
4. 不要发明新类名，需要自定义用 inline style

#### 3.1 · 规划主题节奏

**在挑版式之前**，先列出每页的 `data-theme` 并检查节奏：

- 每页 `<section>` 必须标注 `data-theme="light"` 或 `data-theme="dark"`
- **禁止连续 3 页以上同主题**
- 8 页以上必须有 ≥1 暗页 + ≥1 亮页
- 每 3-4 页插入 1 个 hero 级页面（加 `class="slide hero"`）

#### 3.2 · 挑版式

**不要从零写 slide**。打开 `references/layouts.md`，里面有 25 种版式骨架。

**4 大类**：

| 类别 | 版式 | 数量 |
|------|------|------|
| 通用 | U01 Cover / U02 Section / U03 Closing / U04 Quote / U05 Split / U06 Compare / U07 Pipeline / U08 Three Pillars | 8 |
| 数据 | D01 Stat Grid / D02 KPI Tower / D03 H-Bar / D04 V-Timeline / D05 H-Timeline / D06 Matrix / D07 Spec Sheet / D08 KPI Hero | 8 |
| 图文 | M01 Lead Image / M02 Image Grid / M03 Image Hero / M04 Screenshot / M05 Gallery / M06 System Diagram | 6 |
| 扩展 | X01 Code / X02 Rowline / X03 Feature Cards | 3 |

**每个 slide 必须写 `data-layout="XXX"`**：

```html
<section class="slide" data-layout="D01" data-theme="light">
  <!-- 从 layouts.md 粘贴骨架，改文案 -->
</section>
```

**版式多样性硬规则**：
- 7-8 页 deck 至少 5 种不同版式
- 10+ 页至少 7 种不同版式
- 不允许连续 3 页同一类

#### 3.3 · 图片比例规范

| 场景 | 推荐比例 |
|------|----------|
| Hero 顶图 | 21:9，`height: 35vh` |
| 左文右图 | 16:10 或 4:3，`max-height: 56vh` |
| 多图网格 | 统一 `height: 26vh` |
| 截图美化 | 16:10，`object-fit: contain` |
| 全屏主视觉 | 16:9，`max-height: 64vh` |

**六条图片硬规则**：
1. 多图网格只用 `height:Nvh`，**禁用 `aspect-ratio`**
2. `object-position: top center`（只裁底部）
3. 同组图片统一高度
4. 底部安全区：内容不超过 93vh
5. 截图用 `object-fit: contain`
6. 无图时用 `.img-slot` 占位

#### 3.4 · 中文大标题字号分档

| 标题形态 | 推荐字号 |
|----------|----------|
| 1 行 ≤ 6 字 | `min(7vw, 12vh)` |
| 1 行 7-8 字 | `min(6.4vw, 11.2vh)` |
| 2 行 每行 ≤ 8 字 | `min(5.8vw, 10.2vh)` |
| 2 行 任一行 9-12 字 | `min(5.2vw, 9.2vh)` |
| 3 行或更长 | `min(4.6vw, 8.2vh)` |

### Step 4 · 自检

运行质量校验：

```bash
node <SKILL_ROOT>/scripts/validate.mjs index.html
```

然后打开 `references/checklist.md` 逐项对照 P0/P1/P2/P3 检查项。

**P0 级别必须全部通过**才能交付：
- 每个 slide 有 `data-layout` + `data-theme`
- 零 emoji（用 Lucide 图标）
- 图片在 `.frame-img` 容器内
- 占位符已替换
- 配色一致

### Step 5 · 预览

```bash
open index.html
```

不需要本地服务器。图片走相对路径 `images/xxx.png`。

**导航方式**：← → / Space 翻页 / 滚轮 / 触屏 / ESC 索引 / S 演讲者视图 / B 低功耗模式

### Step 6 · 分享与导出（可选）

生成后问用户是否需要分享：

- **部署到 URL**: `bash <SKILL_ROOT>/scripts/deploy.sh ./path/`（Vercel）
- **导出 PDF**: `bash <SKILL_ROOT>/scripts/export-pdf.sh index.html output.pdf`

---

## 六条铁律

| # | 铁律 | 违反后果 |
|---|------|----------|
| 1 | **每页 100dvh，禁止滚动** | 排版崩溃 |
| 2 | **版式必须注册** — `data-layout` | 无质量保证 |
| 3 | **配色只能选不能编** | 画面变丑 |
| 4 | **图片只裁底部** | 内容丢失 |
| 5 | **中文大标题必须分档** | 标题溢出 |
| 6 | **不用 emoji，只用图标** | 不专业 |

---

## 资源文件导览

```
html-slides/
├── SKILL.md                          ← 你正在读
├── assets/
│   ├── template-editorial.html       ← 墨刊风格模板（种子文件）
│   └── screenshot-backgrounds/       ← 截图美化背景
├── references/
│   ├── themes.md                     ← 8 风格 × 2-3 配色 = ~20 套 CSS Token
│   ├── layouts.md                    ← 25 版式骨架代码（可直接粘贴）
│   └── checklist.md                  ← 质量检查清单（P0-P3 分级）
├── scripts/
│   └── validate.mjs                  ← 质量校验脚本
└── examples/
    └── demo-editorial.html           ← 完整示例 deck（10 页）
```

**加载顺序建议**：
1. 读完 SKILL.md（本文件）
2. 确定风格后读 `references/themes.md` 选配色
3. **动手前 Read 对应模板的 `<style>` 块**
4. 读 `references/layouts.md` 挑版式骨架
5. 生成后运行 `node scripts/validate.mjs`
6. 读 `references/checklist.md` 逐项自检
