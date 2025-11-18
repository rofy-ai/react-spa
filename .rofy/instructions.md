# React SPA Project Instructions

## Project Overview

This is a full-stack React Single Page Application with a Node.js/Express backend. The project uses a monorepo structure with workspaces.

## Tech Stack

### Frontend (Client)

- **React 19** with TypeScript
- **Vite** for build tooling
- **Wouter** for routing (instead of React Router)
- **TanStack Query** for server state management
- **Tailwind CSS** for styling
- **shadcn/ui** components (Radix UI primitives)
- **React Hook Form** with Zod validation
- **Framer Motion** for animations

### Backend (Server)

- **Node.js** with **Express**
- **TypeScript**
- **Mongo DB** with Mongoose

## Project Structure

```
react-spa/
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── pages/            # Page components (routed)
│   │   ├── components/       # Reusable React components
│   │   │   └── ui/          # shadcn/ui component library
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities, API clients, configs
│   │   └── stores/          # State management (if applicable)
│   └── package.json         # Client dependencies (empty - uses workspace)
├── server/                   # Backend Express app
│   ├── backend-routes.ts # Contains backend apis implementation
│   ├── db/
│   │   ├── models/          # Database models/schemas
│   │   └── connection.ts    # Database connection setup
│   ├── lib/                 # Server utilities
│   ├── middleware/          # Express middleware
└── package.json             # Root package.json with workspaces
```

## Package Management

- **Monorepo Structure**: All dependencies are managed in the root `package.json`
- **Workspace Configuration**: The client folder is configured as a workspace
- **Shared Dependencies**: Both client and server share the same `node_modules` and dependency versions
- **Client Package.json**: The `client/package.json` only contains scripts - all dependencies are inherited from the root

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

## Key Features

- Full-stack TypeScript
- Modern React patterns with hooks
- Database integration with Mongoose and MongoDB
- Component library with shadcn/ui
- Responsive design with Tailwind CSS
- WebSocket support for real-time features
