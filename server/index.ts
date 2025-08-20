import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic, log } from "./vite";
import { spawn, ChildProcess, fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import http from "http";

const VOLUME_ROOT = "/data/app";    

// hard-enforce CWD for the node process (main server)
try {
  process.chdir(VOLUME_ROOT);
} catch (e) {
  console.error("Failed to chdir to /data/app:", e);
}
        // <— hardcoded volume root
const CLIENT_DIR  = path.join(VOLUME_ROOT, "client");

const allowedRoutes = [
  "/api/rofyDownloadFiles",
  "/api/rofyUpdateFiles",
  "/api/restart-backend",
  "/api/rofyLogs",
];

const app = express();

// ✅ Allow Vite dev server on 5173 to call the Express server on 5001
app.use(cors());
app.options("*", cors());

// 🔁 Only handle /api/rofyUpdateFiles locally; proxy all other /api/* to 5002
app.use(async (req, res, next) => {
  if (allowedRoutes.includes(req.originalUrl) || req.originalUrl.startsWith("/api/downloads/")) {
    return next();
  }

  if (req.originalUrl.startsWith("/api/")) {
    const alive = await isUserApiAlive();
    if (!alive) {
      return res.status(502).json({ error: "User API server unavailable" });
    }

    console.log(`Proxying to 5002: ${req.method} ${req.originalUrl}`);
    return createProxyMiddleware({
      target: "http://localhost:5002",
      changeOrigin: true,
    })(req, res, next);
  }

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let viteProcess: ChildProcess | null = null;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let userApiProcess: ChildProcess | null = null;

function logErrors(message: string) {
  console.log(`[${new Date().toISOString()}] ${message}`);
  fetch("http://localhost:3000/api/logs", {
    method: "POST",
    body: JSON.stringify({ ts: Date.now(), kind: "error", data: message }),
    headers: { "Content-Type": "application/json" },
  }).catch((err) => {
    console.error("Failed to send log:", err);
  });
}

// 🧠 Start user API server in separate process (isolated)
// Runs from /data/app so it reads the live volume tree.
function startUserApiServer() {
  try {
    // Prefer the volume copy; fall back to image copy if not found
    const candidates = [
      path.join(VOLUME_ROOT, "backend-entry.js"),
      path.join(VOLUME_ROOT, "server", "backend-entry.js"),
      path.join(__dirname, "backend-entry.js"), // fallback
    ];
    const scriptPath = candidates.find(p => fs.existsSync(p))!;
    if (!scriptPath) throw new Error("backend-entry.js not found in /data/app or image");

    const child = fork(scriptPath, [], {
      stdio: ["ignore", "ignore", "pipe", "ipc"],
      cwd: VOLUME_ROOT, // ensure it reads the volume tree
      env: { ...process.env, FORCE_COLOR: "1" },
    });
    userApiProcess = child;

    child.stderr?.on("data", (buf) => {
      const block = buf.toString();
      if (!block.trim()) return;
      logErrors(block.trim());
    });

    console.log("✅ User API server process forked:", scriptPath, "(cwd: /data/app)");
  } catch (err) {
    console.error("❌ Failed to start user API server:", err);
  }
}

function stopUserApiServer() {
  if (userApiProcess) {
    userApiProcess.kill("SIGTERM");
    userApiProcess = null;
  }
}

function startViteDevServer() {
  const vite = spawn("npx", ["vite"], {
    cwd: CLIENT_DIR, // <— Vite runs inside the volume client dir
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, FORCE_COLOR: "1" },
  });

  vite.on("exit", (code, signal) => {
    log(`vite exited with code ${code}, signal ${signal}`);
  });

  vite.on("error", (err: any) => {
    log("vite process error:", err);
  });

  vite.stderr.on("data", (buf) => {
    const block = (buf.toString().match(/\[vite\]([\s\S]*?)^\s*at/m) || [])[1] ?? "";
    if (!block.trim()) return;
    logErrors(block.trim());
  });

  viteProcess = vite;
  console.log("✅ Vite dev server spawned (cwd: /data/app/client)");
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

// 💓 Check if 5002 server is alive
const isUserApiAlive = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    const req = http.get("http://localhost:5002/__health", (res) => {
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(300, () => {
      req.destroy();
      resolve(false);
    });
  });
};

// 🛡 Logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const p = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (p.startsWith("/api")) {
      let logLine = `${req.method} ${p} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        try {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        } catch {}
      }
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

// 🔁 Existing Vite dev server proxy (untouched)
if (app.get("env") === "development") {
  console.log("Development mode detected, setting up Vite middleware");
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
      ws: true,
      pathFilter: (p) => !/^\/api(\/|$)/.test(p),
    })
  );
}

// 🔁 Vite restart endpoint
app.post("/api/restart-vite", (_req, res) => {
  restartViteDevServer();
  res.json({ status: "vite restarted" });
});

app.post("/api/restart-backend", (_req, res) => {
  console.log("Restarting user API server...");
  stopUserApiServer();
  startUserApiServer();
  res.json({ status: "user API restarted" });
});

// Serve downloads from the volume
app.use("/api/downloads", express.static(path.join(VOLUME_ROOT, "public", "downloads")));

(async () => {
  const server = await registerRoutes(app);

  console.log("Serving static from:", path.join(VOLUME_ROOT, "public", "downloads"));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    startViteDevServer();
  } else {
    // If you serve built assets in production, ensure your build outputs to /data/app/dist/public
    serveStatic(app);
  }

  // 🧠 Start the user API process
  startUserApiServer();

  const port = 5001;
  server.listen({ port, host: "0.0.0.0" }, () => {
    log(`Main server listening on port ${port}`);
  });
})();
