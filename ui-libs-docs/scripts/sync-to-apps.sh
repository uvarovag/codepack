#!/usr/bin/env bash
# Copies the generated doc (out/ui-libs, minus the _skeletons working dir)
# into both app repos' docs/ui-libs/, replacing whatever was there before.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$SCRIPT_DIR/../out/ui-libs"
APPS=(
  "$SCRIPT_DIR/../../../cssupportchat/app-cssupport-ext"
  "$SCRIPT_DIR/../../../cssupportchat/app-routing-ext"
)

for app in "${APPS[@]}"; do
  # Fail loudly rather than mkdir -p a stray docs/ tree into a missing repo.
  if [ ! -d "$app" ]; then
    echo "app repo not found: $app" >&2
    exit 1
  fi
  dest="$app/docs/ui-libs"
  rm -rf "$dest"
  mkdir -p "$dest"
  rsync -a --exclude '_skeletons' "$SRC/" "$dest/"
  echo "synced -> $dest ($(find "$dest" -name '*.md' | wc -l | tr -d ' ') files)"
done
