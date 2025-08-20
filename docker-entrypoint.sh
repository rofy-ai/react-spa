#!/usr/bin/env bash
set -euo pipefail

APPSEED="${APPSEED:-/opt/appseed}"   # Where the app is baked inside the image
DATADIR="${WORKDIR:-/data}"          # Where the Fly volume is mounted (you set this via Machines env)

mkdir -p "$DATADIR"

# Treat /data as empty if it contains nothing except possibly 'lost+found'
is_effectively_empty() {
  if ls -A "$DATADIR" 2>/dev/null | grep -v '^lost+found$' | read -r _; then
    return 1  # not empty
  else
    return 0  # empty
  fi
}

if is_effectively_empty; then
  echo "[seed] $DATADIR empty → copying from $APPSEED …"
  # Copy *contents* (including dotfiles). The trailing `/.` matters.
  cp -a "$APPSEED"/. "$DATADIR"/
  echo "[seed] done."
fi

cd "$DATADIR"
exec "$@"
