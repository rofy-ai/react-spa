#!/usr/bin/env bash
set -euo pipefail

APPSEED="${APPSEED:-/opt/appseed}"     # baked into the image
WORKDIR="${WORKDIR:-/data}"            # mounted volume path
APP_ROOT="${APP_ROOT:-}"               # optional subdir under WORKDIR that has package.json (e.g. apps/server)

echo "[entrypoint] WORKDIR=${WORKDIR}  APPSEED=${APPSEED}  APP_ROOT=${APP_ROOT:-<none>}"

/bin/mkdir -p "${WORKDIR}"

# Wait until volume is mounted (defensive)
for i in {1..30}; do
  if grep -qs " ${WORKDIR} " /proc/mounts; then break; fi
  echo "[entrypoint] waiting for ${WORKDIR} mount…"
  sleep 1
done

# Seed only if this looks like a fresh volume (no package.json at target root)
TARGET_ROOT="${WORKDIR}"
if [ -n "${APP_ROOT}" ]; then
  # If you provided a subdir, package.json will be checked under that subdir
  TARGET_ROOT="${WORKDIR}/${APP_ROOT}"
fi

if [ ! -f "${TARGET_ROOT}/package.json" ]; then
  echo "[seed] package.json not found at ${TARGET_ROOT} → seeding from ${APPSEED}"
  /bin/mkdir -p "${TARGET_ROOT}"

  # Non-clobber copy (first boot: full copy; later boots: skips existing files)
  # If you’re copying the entire app tree, this puts it under WORKDIR
  # If APP_ROOT is set to 'apps/server', make sure your source tree includes that path.
  rsync -a --ignore-existing "${APPSEED}/" "${WORKDIR}/"

  # Verify again after copy
  if [ ! -f "${TARGET_ROOT}/package.json" ]; then
  echo "[seed] package.json not found at ${TARGET_ROOT} → seeding from ${APPSEED}"
  cp -an "${APPSEED}/." "${WORKDIR}/"
  if [ ! -f "${TARGET_ROOT}/package.json" ]; then
    echo "[seed][ERROR] Still no package.json at ${TARGET_ROOT}"
    ls -la "${TARGET_ROOT}" || true
    exit 1
  fi
  echo "[seed] done"
else
  echo "[seed] package.json exists at ${TARGET_ROOT} → skipping seed"
fi

# Run from the correct app directory
if [ -n "${APP_ROOT}" ]; then
  cd "${TARGET_ROOT}"
else
  cd "${WORKDIR}"
fi

echo "[entrypoint] pwd=$(pwd) → exec: $*"
exec "$@"
