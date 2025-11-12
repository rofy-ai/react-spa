FROM node:20

# --- Bake the seed into the image ---
WORKDIR /app

# Layer-friendly install: first lockfiles, then the rest
COPY package*.json ./
# For a dev server you likely need dev deps; drop --omit=dev if you use them
RUN npm install --legacy-peer-deps

# Now add the app source (src, public, etc.)
COPY . .

# Create startup script (MongoDB will be installed dynamically via dbConnect tool)
RUN echo '#!/bin/bash\n\
    # Start the application\n\
    exec npm run dev-server\n' > /app/start.sh \
    && chmod +x /app/start.sh

# Expose the Express server port and MongoDB port (27017 kept for dynamic MongoDB)
EXPOSE 5001 27017

# Default command
CMD ["/app/start.sh"]