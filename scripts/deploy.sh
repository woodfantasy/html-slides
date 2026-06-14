#!/usr/bin/env bash
# html-slides Deploy Script
# Deploys a presentation to Vercel for public sharing.
#
# Usage: bash deploy.sh ./path/to/deck/
# Requirements: npx (comes with Node.js)
#
# The directory must contain at least an index.html file.
# Images and other assets are deployed alongside.

set -euo pipefail

DIR="${1:-.}"

if [ ! -f "$DIR/index.html" ]; then
  echo "❌ Error: No index.html found in $DIR"
  echo "Usage: bash deploy.sh ./path/to/deck/"
  exit 1
fi

echo "🚀 Deploying $DIR to Vercel..."
echo ""

# Count assets
HTML_COUNT=$(find "$DIR" -name '*.html' | wc -l | tr -d ' ')
IMG_COUNT=$(find "$DIR" -name '*.jpg' -o -name '*.png' -o -name '*.webp' -o -name '*.svg' 2>/dev/null | wc -l | tr -d ' ')
TOTAL_SIZE=$(du -sh "$DIR" | cut -f1)

echo "📦 Package:"
echo "   HTML files: $HTML_COUNT"
echo "   Images:     $IMG_COUNT"
echo "   Total size: $TOTAL_SIZE"
echo ""

# Deploy with Vercel
cd "$DIR"
npx -y vercel --prod --yes 2>&1 | tee /dev/stderr | grep -o 'https://[^ ]*' | tail -1

echo ""
echo "✅ Deployed! Share the URL above."
