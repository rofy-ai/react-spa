#!/usr/bin/env bash
set -euo pipefail

APPSEED="${APPSEED:-/opt/appseed}"   # baked-in source (image)
WORKDIR="${WORKDIR:-/data}"          # mounted volume

echo "[entrypoint] WORKDIR=${WORKDIR} APPSEED=${APPSEED}"

# (Optional but safe) wait until the volume mount is visible
for i in {1..30}; do
  if grep -qs " ${WORKDIR} " /proc/mounts; then break; fi
  echo "[entrypoint] waiting for ${WORKDIR} mount…"
  sleep 1
done

mkdir -p "$WORKDIR"

if [ ! -f "${WORKDIR}/package.json" ]; then
  echo "[seed] package.json not found in ${WORKDIR} → seeding from ${APPSEED}"
  # copy without overwriting anything that might already be there
  # (first boot: effectively a full copy; later: still safe)
  cp -an "${APPSEED}/." "${WORKDIR}/"
  echo "[seed] done"
else
  echo "[seed] package.json exists in ${WORKDIR} → skipping seed"
fi

echo "[entrypoint] exec: $*"
exec "$@"
