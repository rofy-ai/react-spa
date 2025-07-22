import type { Express } from "express";
import { createServer, type Server } from "http";
import { promises as fs } from "fs";
import path from "path";

interface FileUpdatePayload {
  filePath: string;
  content: string;
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/glytUpdateFiles", async (req, res) => {
    const files: FileUpdatePayload[] = req.body;

    if (!Array.isArray(files)) {
      return res.status(400).json({
        error: "Invalid input",
        message: "Request body must be an array of file objects",
      });
    }

    const results: any[] = [];

    for (const file of files) {
      const { filePath: relativePath, content } = file;

      try {
        if (!relativePath || typeof relativePath !== "string") {
          throw new Error("Missing or invalid file path");
        }

        if (content === undefined || content === null) {
          throw new Error("Missing content");
        }

        const normalizedPath = path.normalize(relativePath);
        if (normalizedPath.includes("..") || path.isAbsolute(normalizedPath)) {
          throw new Error("Invalid file path (cannot contain '..' or be absolute)");
        }

        const projectRoot = process.cwd();
        const absolutePath = path.join(projectRoot, normalizedPath);

        const resolvedPath = path.resolve(absolutePath);
        const resolvedProjectRoot = path.resolve(projectRoot);
        if (!resolvedPath.startsWith(resolvedProjectRoot)) {
          throw new Error("Access denied: path must be within project directory");
        }

        const dir = path.dirname(absolutePath);
        await fs.mkdir(dir, { recursive: true });
        await fs.writeFile(absolutePath, content, "utf8");

        results.push({
          filePath: relativePath,
          status: "success",
          timestamp: new Date().toISOString(),
        });
      } catch (err) {
        results.push({
          filePath: file.filePath,
          status: "error",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      }
    }

    res.json({ results });
  });

  const httpServer = createServer(app);
  return httpServer;
}
