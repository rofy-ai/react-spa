# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.18.0
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /usr/src/app

# Set production environment
# ENV NODE_ENV="production"
ENV NODE_ENV="development"


# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
COPY package-lock.json package.json ./
RUN npm ci --include=dev

# Copy application code
COPY . .

# For development, we don't need to build, just run with tsx
# Build application (uncomment for production)
# RUN npm run build

# Keep development dependencies for dev environment
# RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /usr/src/app /usr/src/app

# Start the server by default, this can be overwritten at runtime
EXPOSE 5001
# For development
CMD [ "npm", "run", "dev" ]
# For production (uncomment and comment above)
# CMD [ "npm", "start" ]
