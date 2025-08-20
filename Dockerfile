# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS base
LABEL fly_launch_runtime="Node.js"

# Node.js app lives here in the image
WORKDIR /usr/src/app
ENV NODE_ENV="development"

# ---------- Build stage ----------
FROM base AS build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# (Optional) build for prod:
# RUN npm run build && npm prune --omit=dev

# ---------- Final image ----------
FROM base
# Copy built app into image
COPY --from=build /usr/src/app /usr/src/app

# Bake a seed archive we can explode into /data on first boot
RUN tar -C /usr/src/app -cf /seed.tar .

EXPOSE 5001

# 👇 Seed /data only if empty, then run from /data
CMD bash -lc '\
  if [ -z "$(ls -A /data 2>/dev/null || true)" ]; then \
    echo "[seed] /data empty → extracting seed…"; \
    mkdir -p /data && tar -xf /seed.tar -C /data; \
    echo "[seed] done."; \
  fi; \
  cd /data && npm run dev-server \
'
