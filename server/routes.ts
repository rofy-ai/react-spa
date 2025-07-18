import type { Express } from "express";
import { createServer, type Server } from "http";
import { promises as fs } from "fs";
import path from "path";

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

  // BEGIN SERVER
  app.post("/api/updateFile", async (req, res) => {
    try {
      const { filePath: relativePath, content } = req.body;

      // Validate input
      if (!relativePath || typeof relativePath !== 'string') {
        return res.status(400).json({
          error: "Missing or invalid file path",
          message: "File path is required and must be a string"
        });
      }

      if (content === undefined || content === null) {
        return res.status(400).json({
          error: "Missing content",
          message: "File content is required"
        });
      }

      // Security check: prevent directory traversal attacks
      const normalizedPath = path.normalize(relativePath);
      if (normalizedPath.includes('..') || path.isAbsolute(normalizedPath)) {
        return res.status(403).json({
          error: "Invalid file path",
          message: "File path cannot contain '..' or be absolute"
        });
      }

      // Resolve to absolute path within the project directory
      const projectRoot = process.cwd();
      const absolutePath = path.join(projectRoot, normalizedPath);

      // Ensure the file is within the project directory
      const resolvedPath = path.resolve(absolutePath);
      const resolvedProjectRoot = path.resolve(projectRoot);
      if (!resolvedPath.startsWith(resolvedProjectRoot)) {
        return res.status(403).json({
          error: "Access denied",
          message: "File must be within the project directory"
        });
      }

      // Create directory if it doesn't exist
      const dir = path.dirname(absolutePath);
      await fs.mkdir(dir, { recursive: true });

      // Write the file
      await fs.writeFile(absolutePath, content, 'utf8');

      res.json({
        message: "File updated successfully",
        filePath: relativePath,
        timestamp: new Date().toISOString(),
      });

    } catch (error) {
      console.error("Error updating file:", error);
      res.status(500).json({ 
        error: "Failed to update file", 
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  // END SERVER

  const httpServer = createServer(app);
  return httpServer;
}

