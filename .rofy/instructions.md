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
- **WebSocket** support

### API pattern (exact patterns to follow)
- Base API: `/api` exposed by backend.
- APIs in `server/apis/` are auto-loaded.
- All api files are generated in the `server/apis/{api-name}.ts` file.

### Example API pattern
  **Create API route** (server/apis/tasks.ts):
  ```typescript
  import { Router } from 'express';
  import { type Request, type Response } from 'express';
  import { Task } from '../db/models/task';
  const router = Router();
  // GET /api/tasks
  router.get('/', async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find();
      res.json({ tasks });
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  });
  // POST /api/tasks
  router.post('/', async (req: Request, res: Response) => {
    try {
      const { title, userId } = req.body;
      const task = await Task.create({ title, userId, completed: false });
      res.status(201).json({ task });
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Failed to create task' });
    }
  });
  // PUT /api/tasks/:id
  router.put('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.json({ task });
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Failed to update task' });
    }
  });
  // DELETE /api/tasks/:id
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndDelete(id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ error: 'Failed to delete task' });
    }
  });
  export default router;
  ```


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
- `server/backend-routes.ts`
- `server/backend-server.ts`
- `server/vite.ts`
- `node_modules/`

## Key Features

- Full-stack TypeScript
- Modern React patterns with hooks
- Database integration with Mongoose and MongoDB
- Component library with shadcn/ui
- Responsive design with Tailwind CSS
- WebSocket support for real-time features
