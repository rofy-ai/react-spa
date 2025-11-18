import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";

export async function registerBackendRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/__health", (_req, res) => res.json({ status: "ok" }));

  // Ping API endpoint
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "pong", timestamp: new Date().toISOString() });
  });

  // Add more API routes here as needed
  // Example:
  // app.post("/api/users", async (req, res) => {
  //   // Handle user creation
  //   res.json({ success: true });
  // });

  console.log("✅ Backend routes registered");

  return createServer(app);
}
