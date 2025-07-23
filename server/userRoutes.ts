import type { Express } from "express";
import { createServer, type Server } from "http";
import { promises as fs } from "fs";
import path from "path";
import { pathToFileURL } from "url";

export async function registerUserRoutes(app: Express): Promise<Server> {
  const userApiDir = path.resolve(process.cwd(), "server/apis"); // adjust as needed

  app.get("/__health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Dynamically register all user-defined handlers in apis folder
  try {
    const files = await fs.readdir(userApiDir);

    for (const file of files) {
      if (!file.endsWith(".ts") && !file.endsWith(".js")) continue;

      const routePath = `/api/${file.replace(/\.(ts|js)$/, "")}`;
      const fullPath = path.join(userApiDir, file);
      const moduleUrl = `${pathToFileURL(fullPath).href}?t=${Date.now()}`;

      try {
        const mod = await import(moduleUrl);
        const handler = mod.default;
        if (typeof handler === "function") {
          app.all(routePath, handler);
          console.log(`✅ Registered user route: ${routePath}`);
        } else {
          console.warn(`⚠️ Skipped ${file}: No default function export`);
        }
      } catch (err) {
        console.error(`❌ Failed to load handler for ${file}:`, err);
      }
    }
  } catch (err) {
    console.error("❌ Error loading user API routes:", err);
  }

  const httpServer = createServer(app);
  return httpServer;
}
