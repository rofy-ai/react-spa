# Bollywood News Application

## Overview

This is a full-stack web application focused on Bollywood news aggregation and display. The application fetches news from external APIs (NewsAPI), stores them in a PostgreSQL database, and presents them through a modern React frontend with categorization, search functionality, and bookmarking features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with a clear separation between client (frontend) and server (backend) code:

- **Frontend**: React with TypeScript, Vite build tool, TailwindCSS for styling
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **External API**: NewsAPI for fetching Bollywood news
- **UI Framework**: shadcn/ui components with Radix UI primitives

## Key Components

### Frontend Architecture
- **React Router**: Using Wouter for client-side routing
- **State Management**: TanStack Query for server state management
- **Styling**: TailwindCSS with custom Bollywood-themed color variables
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Build Tool**: Vite with TypeScript support

### Backend Architecture
- **Express Server**: RESTful API with TypeScript
- **Database Layer**: Drizzle ORM with PostgreSQL
- **Storage Abstraction**: Interface-based storage layer supporting both memory and database implementations
- **API Integration**: NewsAPI client for fetching external news data

### Database Schema
- **news_articles table**: Stores news articles with fields for title, description, content, URL, image URL, publication date, source, category, keywords, and bookmark status
- **Drizzle ORM**: Provides type-safe database operations and migrations

## Data Flow

1. **News Fetching**: Server fetches news from NewsAPI based on category and search parameters
2. **Data Storage**: News articles are stored in PostgreSQL via Drizzle ORM
3. **Client Requests**: React frontend makes API calls to the Express server
4. **State Management**: TanStack Query handles caching, loading states, and data synchronization
5. **User Interactions**: Bookmarking, searching, and category filtering trigger API calls and UI updates

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Headless UI components
- **tailwindcss**: Utility-first CSS framework
- **express**: Web application framework
- **vite**: Build tool and development server

### API Integration
- **NewsAPI**: External service for fetching Bollywood news content
- Requires API key configuration via environment variables

## Deployment Strategy

The application is configured for both development and production environments:

### Development
- **Vite Dev Server**: Hot module replacement and fast refresh
- **Express Server**: Runs alongside Vite in development mode
- **Database**: Connects to PostgreSQL via DATABASE_URL environment variable

### Production Build
- **Client Build**: Vite builds optimized React application to `dist/public`
- **Server Build**: esbuild compiles Express server to `dist/index.js`
- **Static Serving**: Express serves built client files in production

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string
- **NEWS_API_KEY**: API key for NewsAPI access
- **NODE_ENV**: Environment mode (development/production)

The application uses a hybrid approach where the Express server both provides API endpoints and serves the built React application, making it suitable for deployment on platforms that support Node.js applications.