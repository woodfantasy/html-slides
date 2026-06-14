# 质量检查清单 · Checklist

> 生成完 deck 后逐项对照。**P0 级别必须全部通过**才能交付。

---

## P0 · 致命（不通过则不交付）

- [ ] **版式注册**: 每个 `<section class="slide">` 都有 `data-layout="XXX"`，且 XXX 在 `layouts.md` 中已注册
- [ ] **主题标注**: 每个 `<section>` 都有 `data-theme="light"` 或 `data-theme="dark"`
- [ ] **零 emoji**: `grep -P '[\x{1F600}-\x{1F9FF}]' index.html` 应返回空。用 Lucide 图标替代
- [ ] **图片有约束**: 所有 `<img>` 都在 `.frame-img` 容器内，容器有 `h-XX` 或 `r-XX` 或 `max-height`
- [ ] **内容不溢出**: 打开浏览器，逐页检查无内容被裁切或超出 100vh
- [ ] **字体分工正确**: 大标题用 `--serif`(衬线风格) 或对应风格字体，正文用 `--sans`，元数据用 `--mono`
- [ ] **占位符已替换**: `<title>` 标签不含 `[必填]`
- [ ] **配色一致**: 整个 deck 使用同一套配色方案，无自定义 hex 出现

## P1 · 严重（需要修复后交付）

- [ ] **主题节奏**: 无连续 3 页以上同一 `data-theme`
- [ ] **版式多样性**: 7-8 页 >= 5 种不同版式, 10+ 页 >= 7 种
- [ ] **Hero 节奏**: 每 3-4 页有至少 1 个 `.hero` 页
- [ ] **内容密度**: 单页可见文字不超过 ~400 字符，超过时考虑拆页或精简
- [ ] **Ghost 安全**: `.ghost` CSS 规则包含 `z-index: -1`，ghost 元素的 inline style 包含负偏移（如 `top:-5vh`）
- [ ] **图片比例标准**: 使用标准比例 (21:9, 16:9, 16:10, 4:3, 3:2, 1:1)，无奇葩比例
- [ ] **底部安全区**: 内容最低处不超过 93vh，数据组件加了 `.nav-safe-bottom`
- [ ] **中文标题字号分档**: 中文大标题按字数选了正确的 `min(vw, vh)` 值
- [ ] **导航点颜色**: 暗页用亮色点，亮页用暗色点（引擎自动处理，但检查一下）

## P2 · 警告（建议修复）

- [ ] **chrome/foot 存在**: 除 hero cover 外，每页都有 `chrome` 和 `foot`
- [ ] **页码正确**: foot 里的页码与实际一致
- [ ] **图片 alt**: 所有 `<img>` 有 alt 描述
- [ ] **动效标记**: 需要动效的元素有 `data-anim` 属性
- [ ] **字体 fallback 链**: `--serif-zh` 至少包含 4 个字体，含 macOS 的 `Songti SC` 和 Windows 的 `SimSun`
- [ ] **Speaker Notes**: 关键页有 `<!-- speaker: 笔记 -->` 注释
- [ ] **低功耗可用**: 按 `B` 键后所有内容可见，无黑屏
- [ ] **Lucide 初始化**: `lucide.createIcons()` 在 JS 中被调用

## P3 · 建议（可选优化）

- [ ] **动效 recipe 多样**: 不是所有页都用 cascade，至少用了 2 种不同 recipe
- [ ] **Ghost 背景字**: hero 页适当使用巨型背景字增加层次
- [ ] **Kicker 一致**: 元数据标签风格统一（全大写、统一格式）
- [ ] **图片命名**: 图片文件名遵循 `{页号}-{语义}.{ext}` 规范
- [ ] **ESC 索引**: 按 ESC 后缩略图网格正确显示

---

## 快速 grep 命令

```bash
# 检查 P0: 未注册版式
grep -n 'class="slide' index.html | grep -v 'data-layout'

# 检查 P0: 缺少主题
grep -n 'class="slide' index.html | grep -v 'data-theme'

# 检查 P0: emoji
grep -P '[\x{1F000}-\x{1FFFF}]|[\x{2600}-\x{27BF}]' index.html

# 检查 P0: 占位符
grep '\[必填\]' index.html

# 检查 P1: 主题节奏 (列出所有主题序列)
grep -o 'data-theme="[^"]*"' index.html

# 检查 P1: 版式多样性 (列出所有版式)
grep -o 'data-layout="[^"]*"' index.html | sort | uniq -c | sort -rn

# 检查 P2: 缺 alt 的图片
grep '<img' index.html | grep -v 'alt='
```
