# 品牌资产协议 · Brand Assets

> 目标：当 deck 明确指向某个品牌、公司、产品、活动或 IP 时，品牌识别优先于通用风格配色。不要让“科技/数据/研究”等场景色覆盖品牌主色。

---

## 何时触发 Brand Read

只要出现以下任一情况，先做 Brand Read，再做 Design Read：

- 用户点名公司、产品、品牌、活动、IP 或创始人个人品牌
- 财报、IR、发布会、Pitch Deck、品牌复盘、竞品分析
- 用户提供 logo、官网、品牌手册、旧 PPT、截图或视觉参考
- 标题或正文中有明确品牌，例如 Bilibili、Apple、SpaceX、Tesla、OpenAI

非品牌主题（行业趋势、技术科普、读书分享）可以跳过 Brand Read，直接使用 `themes.md` 的策展配色。

---

## 信息来源优先级

按顺序使用，低优先级不得覆盖高优先级：

1. 用户提供的品牌手册、logo 文件、PPT、视觉规范
2. 品牌官网、IR 官网、Press Kit、官方产品页
3. 用户提供的截图或图片中可见的 logo/主色
4. 可信公开资料（仅用于辅助判断）
5. 无法确认时使用最接近的主题配色，并在 Brand Read 写明“品牌色未验证”

如果用户口头指定品牌色（例如“这个品牌应该用红色”），可以先按 `brand-source: user-provided` 落地，但要记录来源。后续如找到官方色，再替换。

---

## Brand Read 输出模板

在动手生成前输出一行，便于用户确认：

```text
Brand Read: 主题品牌为 [品牌名]；品牌资产来源 [用户提供/官网/IR/截图/未验证]；主识别色 [色相或 hex]；本 deck 使用 [风格名] 的版式系统，但以品牌主色覆盖 --accent。
```

示例：

```text
Brand Read: 主题品牌为 Bilibili；品牌资产来源为用户指出 logo/品牌色；主识别色为红/粉红系；本 deck 使用墨刊的版式系统，但以品牌主色覆盖 --accent，不使用通用科技蓝。
```

---

## HTML 元数据

明确品牌 deck 必须在 `<head>` 写入品牌元数据：

```html
<meta name="deck-brand" content="Brand Name">
<meta name="brand-primary" content="#RRGGBB">
<meta name="brand-source" content="user-provided | official-site | brand-guide | ir-site | screenshot | unverified">
```

规则：

- `deck-brand` 写可见品牌名，不写泛称，例如写 `Bilibili` 而不是 `Video Platform`
- `brand-primary` 必须是已确认或用户指定的主识别色
- `brand-source` 必须说明来源；不能留空
- 如果暂时无法确认品牌色，不要编 hex；先不用 `brand-primary`，并在交付说明中标记“品牌色未验证”

---

## CSS Token 覆盖

先从 `themes.md` 选择最接近内容气质的一套 `:root`，再只覆盖品牌相关 token：

```css
:root {
  /* 保留所选主题的 --ink / --paper / --paper-tint */
  --brand-primary: #RRGGBB;
  --brand-primary-rgb: R, G, B;
  --brand-secondary: #RRGGBB; /* 可选 */
  --brand-source: "official-site";
  --accent: var(--brand-primary);
  --accent-rgb: var(--brand-primary-rgb);
}
```

硬规则：

- 品牌主色优先级高于场景色，财报和数据页也一样
- 只允许覆盖 `--brand-*`、`--accent`、`--accent-rgb`，不要整套重写主题
- 不要把 logo 色随意“高级化”为蓝、黑、金或渐变
- 不能为了“科技感”默认使用蓝色，除非该品牌主识别色就是蓝色
- 多品牌 deck 使用中性色主题，单页用 logo 或小面积色条区分，避免多套主色混战

---

## 首屏品牌识别

封面或首个可见页必须满足至少两项：

- 可见品牌名或 logo
- `--accent` 使用品牌主色
- chrome / kicker / foot 出现品牌名
- Hero 图或背景素材来自品牌官方资产或用户提供素材

如果没有 logo 文件，用文字标 + 品牌色做识别，不要用无关抽象图形替代。

---

## 交付前检查

- `deck-brand`、`brand-primary`、`brand-source` 三个 meta 是否齐全
- `--accent` 是否等于 `--brand-primary`
- 首屏是否能一眼识别品牌
- 财报、IR、产品发布等场景是否仍被通用“科技蓝”覆盖
- logo 若存在，颜色未被滤镜、渐变或主题色污染
