#!/usr/bin/env bash
# html-slides PDF Export Script
# Exports a presentation to PDF using Playwright.
#
# Usage: bash export-pdf.sh index.html output.pdf [--compact]
#   --compact: Skip hero/section-break pages (shorter handout)
#
# Requirements: npx (comes with Node.js), Playwright will auto-install
#
# How it works:
# 1. Opens the HTML file in a headless Chromium browser
# 2. Takes a full-page screenshot of each slide at 1920x1080
# 3. Combines screenshots into a PDF using a helper Node script

set -euo pipefail

INPUT="${1:-}"
OUTPUT="${2:-output.pdf}"
COMPACT="${3:-}"

if [ -z "$INPUT" ] || [ ! -f "$INPUT" ]; then
  echo "❌ Error: HTML file not found"
  echo "Usage: bash export-pdf.sh <input.html> [output.pdf] [--compact]"
  exit 1
fi

ABS_INPUT="$(cd "$(dirname "$INPUT")" && pwd)/$(basename "$INPUT")"
ABS_OUTPUT="$(cd "$(dirname "$OUTPUT")" 2>/dev/null && pwd)/$(basename "$OUTPUT")" || ABS_OUTPUT="$(pwd)/$OUTPUT"

echo "📄 Exporting $INPUT → $OUTPUT"
if [ "$COMPACT" = "--compact" ]; then
  echo "   Mode: Compact (skipping hero/section pages)"
fi

# Create a temporary Node script for the export
TMPSCRIPT=$(mktemp /tmp/export-XXXXX.mjs)
cat > "$TMPSCRIPT" << 'EXPORTSCRIPT'
import { chromium } from 'playwright';
import { writeFileSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';

const [,, inputPath, outputPath, compact] = process.argv;
const isCompact = compact === '--compact';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });

  await page.goto(`file://${inputPath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Wait for fonts + WebGL

  // Get slide count
  const slideCount = await page.evaluate(() =>
    document.querySelectorAll('.slide').length
  );

  console.log(`Found ${slideCount} slides`);

  const screenshots = [];

  for (let i = 0; i < slideCount; i++) {
    // Navigate to slide
    await page.evaluate((idx) => {
      const deck = document.getElementById('deck');
      deck.style.transition = 'none';
      deck.style.transform = `translateX(${-idx * 100}vw)`;
      // Force show all content (skip animation)
      const slide = document.querySelectorAll('.slide')[idx];
      slide.querySelectorAll('[data-anim]').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    }, i);

    await page.waitForTimeout(300);

    // Skip hero/section in compact mode
    if (isCompact) {
      const isHeroSection = await page.evaluate((idx) => {
        const slide = document.querySelectorAll('.slide')[idx];
        const layout = slide?.dataset?.layout;
        return ['U01', 'U02', 'U03'].includes(layout);
      }, i);
      if (isHeroSection) {
        console.log(`  Slide ${i + 1}: Skipped (compact mode)`);
        continue;
      }
    }

    const path = `/tmp/slide-${String(i).padStart(3, '0')}.png`;
    await page.screenshot({ path, fullPage: false });
    screenshots.push(path);
    console.log(`  Slide ${i + 1}/${slideCount}: ✓`);
  }

  // Generate PDF from screenshots using a second page
  const pdfPage = await browser.newPage();
  const imgTags = screenshots.map(p =>
    `<img src="file://${p}" style="width:100%;height:100%;object-fit:contain;page-break-after:always">`
  ).join('');

  await pdfPage.setContent(`
    <html><head><style>
      @page { size: 1920px 1080px; margin: 0; }
      body { margin: 0; }
      img { display: block; }
    </style></head><body>${imgTags}</body></html>
  `);

  await pdfPage.pdf({
    path: outputPath,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  // Cleanup
  screenshots.forEach(p => { try { unlinkSync(p); } catch {} });

  await browser.close();
  console.log(`\n✅ PDF saved: ${outputPath} (${screenshots.length} pages)`);
})();
EXPORTSCRIPT

echo "📸 Capturing slides..."
npx -y playwright install chromium --with-deps 2>/dev/null || true
node "$TMPSCRIPT" "$ABS_INPUT" "$ABS_OUTPUT" "$COMPACT"
rm -f "$TMPSCRIPT"
