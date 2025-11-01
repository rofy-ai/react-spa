FROM node:20

# Install MongoDB
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    && wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | apt-key add - \
    && echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && apt-get update \
    && apt-get install -y mongodb-org \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create MongoDB data directory
RUN mkdir -p /data/db && chown -R node:node /data/db

# --- Bake the seed into the image ---
WORKDIR /app

# Layer-friendly install: first lockfiles, then the rest
COPY package*.json ./
# For a dev server you likely need dev deps; drop --omit=dev if you use them
RUN npm install --legacy-peer-deps

# Now add the app source (src, public, etc.)
COPY . .

# Create startup script
RUN echo '#!/bin/bash\n\
    # Start MongoDB in background\n\
    mongod --fork --logpath /var/log/mongodb.log --dbpath /data/db\n\
    # Wait for MongoDB to be ready\n\
    until mongosh --eval "db.adminCommand(\"ping\")" > /dev/null 2>&1; do\n\
    echo "Waiting for MongoDB..."\n\
    sleep 2\n\
    done\n\
    echo "MongoDB is ready!"\n\
    # Start the application\n\
    exec npm run dev-server\n' > /app/start.sh \
    && chmod +x /app/start.sh

# Expose the Express server port and MongoDB port
EXPOSE 5001 27017

# Default command
CMD ["/app/start.sh"]
