# Code Writing Rules

## Tech Stack

### Frontend (Client)
- **React 19** with TypeScript (FIXED, NEVER MODIFY)
- **Vite** for build tooling (FIXED, NEVER MODIFY)
- **TypeScript** (FIXED, NEVER MODIFY)

### Backend (Server)
- **Node.js** with **Express** (FIXED, NEVER MODIFY)
- **TypeScript** (FIXED, NEVER MODIFY)

** CRITICAL: ALWAYS WRITE BACKEND APIS FOLLOWING THESE RULES **

**⚠️ NEVER MODIFY THE `registerBackendRoutes` FUNCTION SIGNATURE OR STRUCTURE**
- DO NOT change the function name, parameters, or return type
- DO NOT modify the existing health check endpoint (`/__health`)
- DO NOT remove or modify the `createServer(app)` return statement
- DO NOT remove or modify the console.log statement

**✅ ALWAYS ADD NEW API ROUTES INSIDE THE FUNCTION BODY**
- Add new routes AFTER the existing endpoints
- Add new routes BEFORE the `console.log` and `return` statements
- Follow the same pattern as existing routes

**Example Structure (DO NOT MODIFY THIS TEMPLATE):**
```typescript
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";

export async function registerBackendRoutes(app: Express): Promise<Server> {
  // Health check endpoint (DO NOT MODIFY)
  app.get("/__health", (_req, res) => res.json({ status: "ok" }));

  // Ping API endpoint (DO NOT MODIFY)
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "pong", timestamp: new Date().toISOString() });
  });

  // ============================================
  // ADD NEW API ROUTES BELOW THIS LINE
  // ============================================
  
  // Example: Create user
  // app.post("/api/users", async (req, res) => {
  //   try {
  //     // Handle user creation logic
  //     res.json({ success: true, user: req.body });
  //   } catch (error) {
  //     res.status(500).json({ error: "Failed to create user" });
  //   }
  // });

  // Example: Get users
  // app.get("/api/users", async (_req, res) => {
  //   try {
  //     // Handle fetching users
  //     res.json({ users: [] });
  //   } catch (error) {
  //     res.status(500).json({ error: "Failed to fetch users" });
  //   }
  // });

  // ============================================
  // ADD NEW API ROUTES ABOVE THIS LINE
  // ============================================

  console.log("✅ Backend routes registered"); // DO NOT MODIFY
  return createServer(app); // DO NOT MODIFY
}
```

**When adding new endpoints:**
1. Always add them in the designated section between the comment markers
2. Use proper HTTP methods (GET, POST, PUT, DELETE, PATCH)
3. Always include try-catch blocks for async operations
4. Always send appropriate status codes
5. Follow RESTful naming conventions (e.g., `/api/resource-name`)

## Code Conventions
- Use TypeScript for all new files
- Follow React functional component patterns with hooks
- Use Tailwind CSS for styling
- Implement proper error handling and loading states
- Use TanStack Query for server state management
- Follow the existing folder structure and naming conventions
- If a file is getting larger than 300 lines of code, break it down into smaller chunks across files.

## FORBIDDEN FILES (never modify):
- `server/backend-entry.ts`
- `server/backend-server.ts`
- `server/vite.ts`
- `node_modules/`
- `server/index.ts`
- `server/routes.ts`,
- `server/zip.ts`,
- `server/vite.ts`,
- `Dockerfile`,
- `.dockerignore`,
- `dist`,
- `public/rofy_downloads`,
- `client/eslint.config.js`,
- `client/tsconfig.app.json`,
- `client/tsconfig.json`,
- `client/tsconfig.node.json`
- `.rofy/rules.md`

## Package Management (never modify)
- **Monorepo Structure**: All dependencies are managed in the root `package.json`
- **Workspace Configuration**: The client folder is configured as a workspace
- **Shared Dependencies**: Both client and server share the same `node_modules` and dependency versions
- **Client Package.json**: The `client/package.json` only contains scripts - all dependencies are inherited from the root
