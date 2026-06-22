#!/usr/bin/env node
/**
 * html-slides Quality Validator
 * 
 * Checks a generated deck against the design kernel rules:
 * - P0: Layout registration, theme annotation, emoji, image constraints, color consistency
 * - P1: Brand alignment, theme rhythm, layout diversity, hero cadence, content density, ghost safety
 * - P2: Brand metadata completeness, font fallback, alt text, animation markers
 *
 * Usage: node validate.mjs path/to/index.html [--fix] [--theme]
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const REGISTERED_LAYOUTS = [
  'U01', 'U02', 'U03', 'U04', 'U05', 'U06', 'U07', 'U08',
  'D01', 'D02', 'D03', 'D04', 'D05', 'D06', 'D07', 'D08',
  'M01', 'M02', 'M03', 'M04', 'M05', 'M06',
  'X01', 'X02', 'X03',
];

const ALLOWED_ANIMATIONS = [
  'cascade', 'hero', 'quote', 'directional', 'pipeline',
  'counter', 'bar-grow', 'timeline-dots', 'matrix-scan',
  'card-spring', 'stagger-grid', 'svg-draw', 'scramble',
];

const RECOMMENDED_ANIMATIONS = {
  U04: 'quote',
  U05: 'directional',
  U06: 'directional',
  U07: 'pipeline',
  U08: 'card-spring',
  D01: 'counter',
  D02: 'bar-grow',
  D03: 'bar-grow',
  D04: 'timeline-dots',
  D05: 'timeline-dots',
  D06: 'matrix-scan',
  D08: 'counter',
  M02: 'stagger-grid',
  M06: 'svg-draw',
  X03: 'card-spring',
};

// Emoji regex (most common ranges)
const EMOJI_RE = /[\u{1F600}-\u{1F9FF}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{27BF}]|[\u{FE00}-\u{FE0F}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{2702}-\u{27B0}]/gu;

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getAttr(tag, attrName) {
  const attrRe = new RegExp(`${escapeRegExp(attrName)}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i');
  const match = tag.match(attrRe);
  if (!match) return null;
  return match[2] ?? match[3] ?? match[4] ?? '';
}

function normalizeHex(value) {
  if (!value) return null;
  const match = value.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (!match) return null;

  const hex = match[1].toLowerCase();
  if (hex.length === 3) {
    return `#${hex.split('').map(ch => ch + ch).join('')}`;
  }
  return `#${hex}`;
}

class Validator {
  constructor(filePath) {
    this.filePath = resolve(filePath);
    this.html = readFileSync(this.filePath, 'utf-8');
    this.errors = { P0: [], P1: [], P2: [], P3: [] };
    this.warnings = 0;
  }

  run() {
    console.log(`\n🔍 Validating: ${this.filePath}\n`);

    this.checkLayoutRegistration();
    this.checkThemeAnnotation();
    this.checkEmoji();
    this.checkImageConstraints();
    this.checkPlaceholders();
    this.checkColorConsistency();
    this.checkBrandMetadata();
    this.checkThemeRhythm();
    this.checkLayoutDiversity();
    this.checkHeroCadence();
    this.checkContentDensity();
    this.checkGhostSafety();
    this.checkFontFallback();
    this.checkAltText();
    this.checkAnimationMarkers();
    this.checkAnimationRecipes();

    this.report();
  }

  // --- P0 Checks ---

  checkLayoutRegistration() {
    const slideRe = /<section\b[^>]*class="[^"]*slide[^"]*"[^>]*>/gi;
    let match;
    let slideIndex = 0;

    while ((match = slideRe.exec(this.html)) !== null) {
      slideIndex++;
      const tag = match[0];
      const layoutMatch = tag.match(/data-layout="([^"]*)"/);

      if (!layoutMatch) {
        this.errors.P0.push(`Slide ${slideIndex}: Missing data-layout attribute`);
      } else if (!REGISTERED_LAYOUTS.includes(layoutMatch[1])) {
        this.errors.P0.push(`Slide ${slideIndex}: Unregistered layout "${layoutMatch[1]}". Must be one of: ${REGISTERED_LAYOUTS.join(', ')}`);
      }
    }

    if (slideIndex === 0) {
      this.errors.P0.push('No slides found (no <section class="slide"> elements)');
    }
  }

  checkThemeAnnotation() {
    const slideRe = /<section\b[^>]*class="[^"]*slide[^"]*"[^>]*>/gi;
    let match;
    let slideIndex = 0;

    while ((match = slideRe.exec(this.html)) !== null) {
      slideIndex++;
      const tag = match[0];
      if (!tag.includes('data-theme=')) {
        this.errors.P0.push(`Slide ${slideIndex}: Missing data-theme attribute (must be "light" or "dark")`);
      }
    }
  }

  checkEmoji() {
    // Only check within slide content, not in <style> or <script>
    const contentOnly = this.html
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '');

    const emojiMatches = contentOnly.match(EMOJI_RE);
    if (emojiMatches) {
      const unique = [...new Set(emojiMatches)];
      this.errors.P0.push(`Found ${emojiMatches.length} emoji(s): ${unique.join(' ')}. Use Lucide icons instead.`);
    }
  }

  checkImageConstraints() {
    const imgRe = /<img\b[^>]*>/gi;
    let match;
    let imgIndex = 0;

    while ((match = imgRe.exec(this.html)) !== null) {
      imgIndex++;
      const tag = match[0];
      const pos = this.html.lastIndexOf('<', match.index - 1);

      // Check if img is inside a frame-img container (look backwards for parent)
      const precedingHtml = this.html.substring(Math.max(0, match.index - 500), match.index);
      if (!precedingHtml.includes('frame-img') && !precedingHtml.includes('img-slot')) {
        this.errors.P0.push(`Image ${imgIndex}: <img> not inside a .frame-img container. All images must be wrapped.`);
      }
    }
  }

  checkPlaceholders() {
    if (this.html.includes('[必填]')) {
      this.errors.P0.push('Placeholder "[必填]" still present. Replace all placeholder text.');
    }
  }

  checkColorConsistency() {
    // Check for raw hex colors outside of :root and comments
    const contentOnly = this.html
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<meta\b[^>]*>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '');

    const hexRe = /#[0-9A-Fa-f]{3,8}\b/g;
    const hexMatches = contentOnly.match(hexRe);
    if (hexMatches && hexMatches.length > 0) {
      this.errors.P0.push(`Found ${hexMatches.length} raw hex color(s) in slide content: ${[...new Set(hexMatches)].slice(0, 5).join(', ')}. Use CSS variables instead.`);
    }
  }

  // --- P1 Checks ---

  getMetaContent(name) {
    const metaRe = /<meta\b[^>]*>/gi;
    let match;
    while ((match = metaRe.exec(this.html)) !== null) {
      const tag = match[0];
      if (getAttr(tag, 'name') === name) {
        return getAttr(tag, 'content')?.trim() ?? '';
      }
    }
    return null;
  }

  getCssVar(name) {
    const re = new RegExp(`--${escapeRegExp(name)}\\s*:\\s*([^;]+);`, 'i');
    return this.html.match(re)?.[1]?.trim() ?? null;
  }

  resolveCssValue(value, seen = new Set()) {
    if (!value) return null;
    const trimmed = value.trim();
    const varMatch = trimmed.match(/^var\(\s*--([A-Za-z0-9_-]+)\s*\)$/);
    if (!varMatch) return trimmed;

    const varName = varMatch[1];
    if (seen.has(varName)) return trimmed;
    seen.add(varName);

    return this.resolveCssValue(this.getCssVar(varName), seen);
  }

  getVisibleText() {
    const body = this.html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? this.html;
    const brandSurfaceAttrs = [];
    const tagRe = /<[^>]+>/gi;
    let tagMatch;
    while ((tagMatch = tagRe.exec(body)) !== null) {
      const tag = tagMatch[0];
      for (const attr of ['alt', 'aria-label', 'title', 'src']) {
        const value = getAttr(tag, attr);
        if (value) brandSurfaceAttrs.push(value);
      }
    }

    const visibleText = body
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    return `${visibleText} ${brandSurfaceAttrs.join(' ')}`.trim();
  }

  checkBrandMetadata() {
    const deckBrand = this.getMetaContent('deck-brand');
    const metaPrimary = this.getMetaContent('brand-primary');
    const brandSource = this.getMetaContent('brand-source');
    const cssBrandPrimary = this.getCssVar('brand-primary');
    const hasBrandSignal = Boolean(
      deckBrand || metaPrimary || brandSource || cssBrandPrimary || /\bdata-brand\s*=/.test(this.html)
    );

    if (!hasBrandSignal) return;

    if (!deckBrand) {
      this.errors.P2.push('Brand metadata: missing <meta name="deck-brand"> while brand tokens or brand metadata are present.');
    }

    if (!metaPrimary && !cssBrandPrimary) {
      this.errors.P2.push('Brand metadata: missing brand-primary. Add <meta name="brand-primary"> or --brand-primary.');
    }

    if (!brandSource) {
      this.errors.P2.push('Brand metadata: missing <meta name="brand-source">. Record user-provided, official-site, brand-guide, ir-site, screenshot, or unverified.');
    }

    const brandPrimaryRaw = cssBrandPrimary || metaPrimary;
    const brandPrimary = normalizeHex(this.resolveCssValue(brandPrimaryRaw));
    const accent = normalizeHex(this.resolveCssValue(this.getCssVar('accent')));

    if (brandPrimaryRaw && !brandPrimary) {
      this.errors.P2.push(`Brand metadata: brand primary "${brandPrimaryRaw}" is not a plain hex color.`);
    }

    if (brandPrimary && accent && brandPrimary !== accent) {
      this.errors.P1.push(
        `Brand color mismatch: --accent resolves to ${accent}, but brand primary is ${brandPrimary}. Brand decks must map --accent to --brand-primary.`
      );
    }

    if (deckBrand) {
      const visibleText = this.getVisibleText().toLowerCase();
      const brandText = deckBrand.toLowerCase();
      if (brandText.length >= 2 && !visibleText.includes(brandText)) {
        this.errors.P1.push(
          `Brand visibility: deck-brand "${deckBrand}" is not visible in slide body text. Cover or chrome should show the brand name or logo.`
        );
      }
    }
  }

  checkThemeRhythm() {
    const themes = [];
    const slideRe = /<section\b[^>]*class="[^"]*slide[^"]*"[^>]*data-theme="(light|dark)"[^>]*>/gi;
    let match;
    while ((match = slideRe.exec(this.html)) !== null) {
      themes.push(match[1]);
    }
    // Also check reverse attribute order
    const slideRe2 = /<section\b[^>]*data-theme="(light|dark)"[^>]*class="[^"]*slide[^"]*"[^>]*>/gi;
    while ((match = slideRe2.exec(this.html)) !== null) {
      themes.push(match[1]);
    }

    // Check consecutive
    for (let i = 0; i <= themes.length - 3; i++) {
      if (themes[i] === themes[i + 1] && themes[i + 1] === themes[i + 2]) {
        this.errors.P1.push(`Theme rhythm: 3+ consecutive "${themes[i]}" slides starting at slide ${i + 1}`);
      }
    }

    // Check mix
    if (themes.length >= 8) {
      if (!themes.includes('dark')) this.errors.P1.push('Theme rhythm: No dark slides in a deck with 8+ slides');
      if (!themes.includes('light')) this.errors.P1.push('Theme rhythm: No light slides in a deck with 8+ slides');
    }
  }

  checkLayoutDiversity() {
    const layouts = [];
    const layoutRe = /data-layout="([^"]*)"/gi;
    let match;
    while ((match = layoutRe.exec(this.html)) !== null) {
      layouts.push(match[1]);
    }

    const unique = new Set(layouts);
    const total = layouts.length;

    if (total >= 7 && total <= 8 && unique.size < 5) {
      this.errors.P1.push(`Layout diversity: ${unique.size} unique layouts for ${total} slides (need ≥5)`);
    }
    if (total >= 10 && unique.size < 7) {
      this.errors.P1.push(`Layout diversity: ${unique.size} unique layouts for ${total} slides (need ≥7)`);
    }
  }

  checkHeroCadence() {
    const slideRe = /<section\b[^>]*class="([^"]*)"[^>]*>/gi;
    let match;
    let slides = [];

    while ((match = slideRe.exec(this.html)) !== null) {
      if (match[1].includes('slide')) {
        slides.push(match[1].includes('hero'));
      }
    }

    if (slides.length >= 8) {
      let maxGap = 0, currentGap = 0;
      for (const isHero of slides) {
        if (isHero) { maxGap = Math.max(maxGap, currentGap); currentGap = 0; }
        else currentGap++;
      }
      maxGap = Math.max(maxGap, currentGap);
      if (maxGap > 4) {
        this.errors.P1.push(`Hero cadence: ${maxGap} consecutive non-hero slides (recommend hero every 3-4)`);
      }
    }
  }

  // --- P1 Checks (continued) ---

  checkContentDensity() {
    // Extract individual slide sections
    const slideRe = /<section\b[^>]*class="[^"]*slide[^"]*"[^>]*>([\s\S]*?)<\/section>/gi;
    let match;
    let slideIndex = 0;
    const MAX_CHARS_PER_SLIDE = 400; // Approximate safe limit before overflow risk

    while ((match = slideRe.exec(this.html)) !== null) {
      slideIndex++;
      const slideContent = match[1]
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<[^>]+>/g, '')       // Strip HTML tags
        .replace(/\s+/g, ' ')          // Normalize whitespace
        .trim();

      if (slideContent.length > MAX_CHARS_PER_SLIDE) {
        this.errors.P1.push(
          `Slide ${slideIndex}: Content density ${slideContent.length} chars (safe limit ~${MAX_CHARS_PER_SLIDE}). Risk of text overflow/clipping.`
        );
      }
    }
  }

  checkGhostSafety() {
    // Check ghost elements have proper z-index and are partially off-screen
    const ghostRe = /<[^>]*class="[^"]*ghost[^"]*"[^>]*>/gi;
    let match;
    let ghostIndex = 0;

    while ((match = ghostRe.exec(this.html)) !== null) {
      ghostIndex++;
      const tag = match[0];

      // Check z-index is explicitly set to -1 or 0
      if (!tag.includes('z-index')) {
        // Check CSS class definition in the style block
        const styleMatch = this.html.match(/.ghost\s*\{[^}]*\}/);
        if (styleMatch && !styleMatch[0].includes('z-index')) {
          this.errors.P1.push(
            `Ghost ${ghostIndex}: Missing z-index in .ghost CSS rule. Ghost text may overlap content. Add z-index: -1.`
          );
        }
      }

      // Check inline style has negative positioning (should be partially off-screen)
      const styleAttr = tag.match(/style="([^"]*)"/);
      if (styleAttr) {
        const hasNegOffset = /(-\d+v[hw]|-\d+%)/.test(styleAttr[1]);
        if (!hasNegOffset) {
          this.errors.P1.push(
            `Ghost ${ghostIndex}: No negative offset in positioning. Ghost should be partially off-screen to avoid content overlap.`
          );
        }
      }
    }
  }

  checkFontFallback() {
    // Check serif-zh fallback chain includes platform-appropriate fonts
    const serifMatch = this.html.match(/--serif-zh:\s*([^;]+);/);
    if (serifMatch) {
      const chain = serifMatch[1];
      // macOS ships with "Songti SC", not "SimSun"
      if (!chain.includes('Songti SC') && chain.includes('SimSun')) {
        this.errors.P2.push(
          'Font fallback: --serif-zh chain missing "Songti SC" (macOS built-in serif). Add it before "SimSun" for cross-platform coverage.'
        );
      }
      // Minimum chain length check
      const fontCount = chain.split(',').length;
      if (fontCount < 4) {
        this.errors.P2.push(
          `Font fallback: --serif-zh has only ${fontCount} fonts. Recommend ≥4 for robust cross-platform coverage.`
        );
      }
    }
  }

  // --- P2 Checks ---

  checkAltText() {
    const imgRe = /<img\b([^>]*)>/gi;
    let match;
    let missing = 0;

    while ((match = imgRe.exec(this.html)) !== null) {
      if (!match[1].includes('alt=')) missing++;
    }

    if (missing > 0) {
      this.errors.P2.push(`${missing} <img> tag(s) missing alt attribute`);
    }
  }

  checkAnimationMarkers() {
    const slides = this.html.match(/<section\b[^>]*class="[^"]*slide[^"]*"[^>]*>[\s\S]*?<\/section>/gi) || [];
    let noAnim = 0;

    for (const slide of slides) {
      if (!slide.includes('data-anim')) noAnim++;
    }

    if (noAnim > 0) {
      this.errors.P2.push(`${noAnim} slide(s) have no data-anim markers (no entry animation)`);
    }
  }

  checkAnimationRecipes() {
    const slideRe = /<section\b[^>]*class="[^"]*slide[^"]*"[^>]*>/gi;
    let match;
    let slideIndex = 0;

    while ((match = slideRe.exec(this.html)) !== null) {
      slideIndex++;
      const tag = match[0];
      const layout = tag.match(/data-layout="([^"]*)"/)?.[1];
      const animation = tag.match(/data-animate="([^"]*)"/)?.[1];

      if (animation && !ALLOWED_ANIMATIONS.includes(animation)) {
        this.errors.P2.push(
          `Slide ${slideIndex}: Unknown data-animate="${animation}". Use one of: ${ALLOWED_ANIMATIONS.join(', ')}`
        );
      }

      const recommended = layout ? RECOMMENDED_ANIMATIONS[layout] : null;
      if (recommended && !animation) {
        this.errors.P3.push(
          `Slide ${slideIndex}: Layout ${layout} auto-selects "${recommended}"; consider adding data-animate="${recommended}" for clarity.`
        );
      } else if (recommended && animation && animation !== recommended) {
        this.errors.P3.push(
          `Slide ${slideIndex}: Layout ${layout} usually uses "${recommended}", currently "${animation}". Keep only if intentional.`
        );
      }
    }
  }

  // --- Report ---

  report() {
    const levels = ['P0', 'P1', 'P2', 'P3'];
    const icons = { P0: '🔴', P1: '🟠', P2: '🟡', P3: '🔵' };
    const labels = { P0: 'FATAL', P1: 'SEVERE', P2: 'WARNING', P3: 'INFO' };
    let totalErrors = 0;

    for (const level of levels) {
      const issues = this.errors[level];
      if (issues.length === 0) continue;
      totalErrors += issues.length;

      console.log(`${icons[level]} ${labels[level]} (${issues.length}):`);
      for (const issue of issues) {
        console.log(`   ${issue}`);
      }
      console.log('');
    }

    if (totalErrors === 0) {
      console.log('✅ All checks passed!\n');
    } else {
      const p0Count = this.errors.P0.length;
      console.log(`\n📊 Total: ${totalErrors} issue(s) found`);
      if (p0Count > 0) {
        console.log(`   🔴 ${p0Count} P0 FATAL — must fix before delivery`);
      }
      console.log('');
    }

    // Exit code
    process.exit(this.errors.P0.length > 0 ? 1 : 0);
  }
}

// --- CLI ---
const args = process.argv.slice(2);
const filePath = args.find(a => !a.startsWith('--'));

if (!filePath) {
  console.error('Usage: node validate.mjs <path-to-index.html>');
  process.exit(1);
}

if (!existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

new Validator(filePath).run();
