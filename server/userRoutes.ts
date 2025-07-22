import type { Express } from "express";
import { createServer, type Server } from "http";
import { promises as fs } from "fs";
import path from "path";

export async function registerUserRoutes(app: Express): Promise<Server> {

  const httpServer = createServer(app);
  return httpServer;
}

