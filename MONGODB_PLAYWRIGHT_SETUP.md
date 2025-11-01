# MongoDB and Playwright Setup

This project now includes MongoDB and Playwright for database functionality and end-to-end testing.

## What's Installed

### MongoDB

- **Version**: Latest from Alpine package manager
- **Port**: 27017 (exposed)
- **Data Directory**: `/data/db`
- **Connection String**: `mongodb://localhost:27017`

### Playwright

- **Version**: ^1.48.0
- **Browser**: Chromium (system-installed in Docker)
- **Configuration**: `playwright.config.ts`

## Usage

### Running the Application

The Docker container automatically starts:

1. MongoDB server (in the background)
2. Your Node.js application

```bash
docker build -t react-spa .
docker run -p 5001:5001 -p 27017:27017 react-spa
```

### Connecting to MongoDB

From within the container or your application:

```javascript
const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
```

### Running Playwright Tests

Inside the container:

```bash
npm run test          # Run all tests
npm run test:ui       # Run with UI mode
npm run test:headed   # Run with browser visible
```

### Test Directory Structure

```
tests/
  ├── example.spec.ts    # Sample test file
  └── ...                # Add more test files here
```

## Environment Variables

You can set these environment variables:

- `MONGODB_URI`: MongoDB connection string (default: `mongodb://localhost:27017`)
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`: Path to Chromium (auto-set in Docker)

## Notes

- MongoDB starts automatically when the container starts
- MongoDB data persists in `/data/db` (consider mounting a volume for persistence)
- Playwright uses the system-installed Chromium browser in the Alpine container
- Tests are configured to run against `http://localhost:5001`

## Adding MongoDB to Your Application

Install the MongoDB driver if needed:

```bash
npm install mongodb
```

Example usage in your server code:

```typescript
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connectDB() {
  await client.connect();
  const db = client.db("your-database-name");
  return db;
}
```

## Volume Mounting for MongoDB Persistence

To persist MongoDB data across container restarts:

```bash
docker run -p 5001:5001 -p 27017:27017 -v mongodb_data:/data/db react-spa
```
