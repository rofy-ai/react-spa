FROM node:20-alpine

# Install MongoDB and Playwright dependencies
RUN apk add --no-cache \
    mongodb \
    mongodb-tools \
    # Playwright browser dependencies
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    # Additional dependencies for Playwright
    wget \
    xvfb \
    dbus \
    fontconfig \
    && rm -rf /var/cache/apk/*

# Set Playwright to use system-installed Chromium
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 \
    PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Create MongoDB data directory
RUN mkdir -p /data/db && chown -R node:node /data/db

# --- Bake the seed into the image ---
WORKDIR /app

# Layer-friendly install: first lockfiles, then the rest
COPY package*.json ./
# For a dev server you likely need dev deps; drop --omit=dev if you use them
RUN npm ci --legacy-peer-deps

# Install Playwright (if not in package.json)
RUN npx playwright install-deps || true

# Now add the app source (src, public, etc.)
COPY . .

# Make the startup script executable
RUN chmod +x /app/start-services.sh

# Expose the Express server port
EXPOSE 5001
# Expose MongoDB port
EXPOSE 27017

# Default command; can be overridden by Machines config if you want
CMD ["/app/start-services.sh"]
