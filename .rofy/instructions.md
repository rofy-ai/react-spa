**Short, focused guidance to help an AI edit and navigate this repository**

## Template Overview

This is a full-stack React Single Page Application Template with a Node.js/Express backend. The template uses a monorepo structure with workspaces.

## Template Structure
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
│   └── tailwind.config.ts         # Tailwind config file
├── server/                   # Backend Express app
│   ├── backend-routes.ts # Contains backend apis implementation
│   ├── db/
│   │   ├── models/          # Database models/schemas
│   │   └── connection.ts    # Database connection setup
│   ├── lib/                 # Server utilities
│   ├── middleware/          # Express middleware
└── package.json             # Root package.json with workspaces
```

## Key Features
- Full-stack TypeScript
- Modern React patterns with hooks
- Component library with shadcn/ui
- Responsive design with Tailwind CSS
- Express backend with nodeJS
