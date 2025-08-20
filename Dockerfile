# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS base
LABEL fly_launch_runtime="Node.js"

WORKDIR /usr/src/app
ENV NODE_ENV="development"

FROM base AS build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package-lock.json package.json ./
RUN npm ci --include=dev
COPY . .

FROM base
COPY --from=build /usr/src/app /usr/src/app

EXPOSE 5001

# ✅ Seed /data once, then cd /data and start the server there
CMD bash -c '\
  if [ -z "$(ls -A /data 2>/dev/null || true)" ]; then \
    echo "[docker CMD] /data empty; seeding from /usr/src/app …"; \
    mkdir -p /data; \
    cp -a /usr/src/app/. /data/; \
    echo "[docker CMD] seed complete."; \
  fi; \
  echo "[docker CMD] cd /data && npm run dev-server"; \
  cd /data && npm run dev-server \
'
