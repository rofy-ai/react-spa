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
- **Drizzle ORM** with Neon (PostgreSQL)
- **Express Sessions** with authentication
- **Passport.js** for auth strategies
- **WebSocket** support

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
│   ├── apis/                # API route handlers (auto-loaded)
│   ├── db/
│   │   ├── models/          # Database models/schemas
│   │   └── connection.ts    # Database connection setup
│   ├── lib/                 # Server utilities
│   ├── middleware/          # Express middleware
│   └── index.ts             # Main server entry point
└── package.json             # Root package.json with workspaces
```

## Development Workflow

- Use `npm run dev` to start both client and server in development
- Client runs on Vite dev server with HMR
- Server uses nodemon with tsx for TypeScript execution
- Database changes managed through Drizzle migrations

## Package Management

- **Monorepo Structure**: All dependencies are managed in the root `package.json`
- **Workspace Configuration**: The client folder is configured as a workspace
- **Shared Dependencies**: Both client and server share the same `node_modules` and dependency versions
- **Client Package.json**: The `client/package.json` only contains scripts - all dependencies are inherited from the root

## Port Configuration

- **Main Server**: Port `5001` - Express server that handles API routing and static file serving
- **Frontend Dev Server**: Port `5173` - Vite development server for the React app
- **Backend API Server**: Port `5002` - Separate Express process for user-defined API routes
- **Development Setup**: The main server (5001) proxies frontend requests to Vite (5173) and API requests to the backend server (5002)

## Code Conventions

- Use TypeScript for all new files
- Follow React functional component patterns with hooks
- Use Tailwind CSS for styling
- Implement proper error handling and loading states
- Use TanStack Query for server state management
- Follow the existing folder structure and naming conventions

## FORBIDDEN FILES (never modify):

- `server/backend-entry.ts`
- `server/backend-routes.ts`
- `server/backend-server.ts`
- `server/vite.ts`
- `package-lock.json`
- `node_modules/`

## Key Features

- Full-stack TypeScript
- Modern React patterns with hooks
- Database integration with Drizzle ORM
- Authentication system ready
- Component library with shadcn/ui
- Responsive design with Tailwind CSS
- WebSocket support for real-time features
