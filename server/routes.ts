import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {

  // Fetch and cache latest Bollywood news
  app.get("/api/hello", async (req, res) => {
    try {
      res.json({
        message: "Hello from the server!",
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      console.error("Error fetching news:", error);
      res.status(500).json({ 
        error: "Failed to fetch news", 
        message: error instanceof Error ? error.message : "Unknown error",
        articles: [],
        totalResults: 0,
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

