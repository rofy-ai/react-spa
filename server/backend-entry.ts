import express from "express";
import { registerBackendRoutes } from "./backend-routes.js";

// Global error handlers - catch ALL errors
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  if (process.send) {
    process.send({ 
      type: 'error', 
      error: error.message, 
      stack: error.stack,
      name: error.name 
    });
  }
  // Don't exit - keep the process alive
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  if (process.send) {
    process.send({ 
      type: 'error', 
      error: String(reason),
      stack: reason instanceof Error ? reason.stack : undefined
    });
  }
  // Don't exit - keep the process alive
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Health check route for main server
app.get("/__health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

(async () => {
  try {
    const server = await registerBackendRoutes(app);
    
    // Global Express error handler - must be AFTER all routes
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('❌ Express error handler:', err);
      
      if (process.send) {
        process.send({ 
          type: 'error',
          error: err.message || String(err),
          stack: err.stack,
          path: req.path
        });
      }
      
      res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        path: req.path,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      });
    });
    
    const port = 5002;
    server.listen(port, () => {
      console.log(`✅ User API server running on port ${port}`);
      if (process.send) {
        process.send({ type: 'ready' });
      }
    });
  } catch (err) {
    console.error("❌ Failed to start user API server:", err);
    if (process.send) {
      process.send({ 
        type: 'error', 
        error: err instanceof Error ? err.message : String(err),
        stack: err instanceof Error ? err.stack : undefined
      });
    }
    process.exit(1); // exit if user routes fail
  }
})();
