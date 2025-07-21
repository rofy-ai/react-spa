import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic, log } from "./vite";
import { spawn, ChildProcess } from "child_process";
import path from "path";
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();

// ✅ Allow Vite dev server on 5174 to call the Express server on 5001
app.use(cors());

// Handle preflight requests (important for POST with JSON)
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let viteProcess: ChildProcess | null = null;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userAppDir = path.resolve(__dirname, "../client");

// Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

if (app.get("env") === "development") {
  console.log("Development mode detected, setting up Vite middleware");
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:5173',
      changeOrigin: true,
      ws: true,
      // Skip proxy for /api/* routes
      pathFilter: (path, req) => {
        return !/^\/api(\/|$)/.test(path);
      }
    })
  );
}

// Vite restart endpoint
app.post("/api/restart-vite", (req, res) => {
  restartViteDevServer();
  res.json({ status: "vite restarted" });
});

// Start Vite in a child process
function startViteDevServer() {
  const vite = spawn("npx", ["vite"], {
    cwd: userAppDir,
    stdio: "inherit",
    env: { ...process.env, FORCE_COLOR: "1" },
  });

  vite.on("exit", (code, signal) => {
    log(`vite exited with code ${code}, signal ${signal}`);
  });

  vite.on("error", (err) => {
    log("vite process error:", err);
  });

  viteProcess = vite;
}

function stopViteDevServer() {
  if (viteProcess) {
    viteProcess.kill("SIGTERM");
    viteProcess = null;
  }
}

function restartViteDevServer() {
  stopViteDevServer();
  startViteDevServer();
}

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  // If in development, start Vite in child process
  if (app.get("env") === "development") {
    startViteDevServer();
  } else {
    serveStatic(app);
  }

  const port = 5001;

  server.listen({ port, host: "0.0.0.0" }, () => {
    log(`serving on port ${port}`);
  });
})();
