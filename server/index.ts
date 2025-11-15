import express, { type Request, type Response, type NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { serveStatic, log } from "./vite.js";
import { spawn, ChildProcess, fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import http from "http";
import 'dotenv/config';

const allowedRoutes = [
  '/api/rofyDownloadFiles',
  '/api/rofyUpdateFiles',
  '/api/restart-backend',
  '/api/restart-vite',
  '/api/restart-all',
  '/api/rofyLogs'
];

const app = express();

// ✅ Allow Vite dev server on 5174 to call the Express server on 5001
app.use(cors());
app.options("*", cors());

let previewHost: string | null = null;

// 🔁 Only handle /api/rofyUpdateFiles locally; proxy all other /api/* to 5002
app.use(async (req, res, next) => {
  if (!previewHost) {
    previewHost = req.headers.host || '';
  }
  if (
    allowedRoutes.includes(req.originalUrl) ||
    req.originalUrl.startsWith("/api/downloads/")
  ) {
    return next();
  }

  if (req.originalUrl.startsWith("/api/")) {
    const alive = await isUserApiAlive();
    if (!alive) {
      return res.status(502).json({ 
        error: "Backend API server is currently unavailable",
        details: "The backend process may have crashed or failed to start. Check server logs for details.",
        timestamp: new Date().toISOString()
      });
    }

    console.log(`Proxying to 5002: ${req.method} ${req.originalUrl}`);
    return createProxyMiddleware({
      target: "http://localhost:5002",
      changeOrigin: true,
      on: {
        error: (err: any, req: any, res: any) => {
          console.error('❌ Proxy error:', err.message);
          const typedRes = res as express.Response;
          typedRes.status(502).json({
            error: "Failed to proxy request to backend",
            details: err.message,
            path: req.url,
            timestamp: new Date().toISOString()
          });
        },
        proxyRes: (proxyRes: any, req: any, res: any) => {
          // Log error responses from backend
          if (proxyRes.statusCode && proxyRes.statusCode >= 400) {
            console.error(`❌ Backend returned ${proxyRes.statusCode} for ${req.method} ${req.url}`);
          }
        }
      }
    })(req, res, next);
  }

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let viteProcess: ChildProcess | null = null;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userAppDir = path.resolve(__dirname, "../client");

let userApiProcess: ChildProcess | null = null;

function shrinkError(rawError:string|Error): string {
  const text = typeof rawError === "string" ? rawError : rawError.stack || String(rawError);

  const lines = text.split("\n");

  // 1. Keep the first line (always has error message)
  const firstLine = lines[0];

  // 2. Grab any inline codeframe block (lines that look like " 37 | foo")
  const codeframe = lines.filter(l => /^\s*\d+\s*\|/.test(l) || /^\s*>/.test(l)).join("\n");

  // 3. Grab framework/plugin hint lines (vite, plugin, module, caused by)
  const hints = lines.filter(l =>
    /(Module|Caused by|File:|Request URL:)/i.test(l)
  ).join("\n");

  // 4. Compose output without stack trace "at ..."
  return [firstLine, codeframe].filter(Boolean).join("\n\n");
}

function stripAnsi(str: string): string {
  return str.replace(
    // regex to match ANSI escape codes
    /\u001b\[[0-9;]*m/g,
    ''
  );
}

function extractChatId(): string | null {
  if (!previewHost) return null;
  const m = previewHost.toLowerCase().match(/^preview-([^.]+)\./);
  return m ? m[1] : null;
}

function logErrors(message: string) {
  const shrunk = shrinkError(message);
  const stripAnsiString = stripAnsi(shrunk);
  const chatId = extractChatId();
  
  fetch('https://api.rezzo.ai/reviewer/review-errors', {
    method: 'POST',
    body: JSON.stringify({ chatId, errorLogs: [stripAnsiString] }),
    headers: { 'Content-Type': 'application/json' }
  }).catch(err => {
    console.error("Failed to send log:", err);
  });
}

// 🧠 Start user API server in separate process (isolated)
function startUserApiServer() {
  try {
    const scriptPath =
      process.env.NODE_ENV === "production"
        ? path.join(__dirname, "backend-entry.js") // dist/server/backend-entry.js
        : path.join(__dirname, "../server/backend-entry.ts");
    const child = fork(scriptPath, [], {
      stdio: ['ignore', 'ignore', 'pipe', 'ipc'], // add 'ipc' here for fork
      env: { ...process.env, FORCE_COLOR: "1" },
    });
    userApiProcess = child;

    // Listen for IPC messages from child process
    child.on('message', (msg: any) => {
      if (msg.type === 'error') {
        console.error('❌ Backend error:', msg.error);
        if (msg.stack) {
          console.error('Stack:', msg.stack);
        }
        logErrors(`${msg.error}\n${msg.stack || ''}`);
      } else if (msg.type === 'ready') {
        console.log('✅ User API server ready on port 5002');
      }
    });

    child.stderr?.on('data', (buf) => {
      const block = buf.toString();
      console.error("❌ Backend stderr:", block);
      if (!block.trim()) return;
      logErrors(block.trim());
    });

    child.on('exit', (code, signal) => {
      console.error(`❌ Backend process exited with code ${code}, signal ${signal}`);
      userApiProcess = null;
      // Auto-restart on unexpected exit
      if (code !== 0 && code !== null) {
        console.log('🔄 Auto-restarting backend in 2 seconds...');
        setTimeout(() => {
          startUserApiServer();
        }, 2000);
      }
    });

    console.log("✅ User API server process forked");
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
  const devServer = spawn("npm", ["run", "dev"], {
    cwd: userAppDir,
    stdio: ['ignore', 'pipe', 'pipe'], // inherit for main process, pipe for logging
    env: { ...process.env, FORCE_COLOR: "1", PORT: "5173" },
  });

  devServer.on("exit", (code, signal) => {
    log(`dev server exited with code ${code}, signal ${signal}`);
  });

  devServer.on("error", (err: any) => {
    log("dev server process error:", err);
  });

  devServer.stderr.on('data', buf => {
    const block = buf.toString();
    console.log("INSIDE HERE", block);
    if (!block.trim()) return;
    logErrors(block.trim());
  });

  viteProcess = devServer;
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

/* ----------------------------
   HTML injection helpers
----------------------------- */
function isNavigationRequest(req: import("http").IncomingMessage) {
  const h = req.headers;
  const accept = String(h["accept"] || "");
  const dest = String(h["sec-fetch-dest"] || "");
  const mode = String(h["sec-fetch-mode"] || "");
  const site = String(h["sec-fetch-site"] || "");
  return (
    req.method === "GET" &&
    accept.includes("text/html") &&
    dest === "iframe" &&
    mode === "navigate" &&
    (site === "none" || site === "same-origin" || site === "cross-site" || site === "same-site")
  );
}

function injectHeadTag(html: string) {
  if (html.includes('data-rofy="console-capture"')) return html;
  const tag = `<script type="module" src="https://preview.rezzo.dev/js/reviewer.js" data-rofy="console-capture" defer></script>`;
  if (html.includes("</head>")) return html.replace("</head>", `${tag}</head>`);
  if (html.includes("</body>")) return html.replace("</body>", `${tag}</body>`);
  return `${html}\n${tag}`;
}


/* ---------------------------------------
   Static assets / downloads
---------------------------------------- */
app.use('/api/downloads', express.static(path.join(__dirname, '../public/downloads')));

// Register all routes and middleware before starting the server
(async () => {
  await registerRoutes(app);
  console.log("Routes registered");

  // Error handler should be after all routes
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    startViteDevServer();
  } else {
    serveStatic(app);
  }

  // 🧠 Start the user API process
  startUserApiServer();

  const port = 5001;
  app.listen({ port, host: "0.0.0.0" }, () => {
    log(`Main server listening on port ${port}`);
  });
})();

// 🔁 Restart both frontend and backend servers
app.post("/api/restart-all", async (req, res) => {
  try {
    console.log("🔄 Restarting all servers...");
    
    // Stop both servers first
    stopUserApiServer();
    if (app.get("env") === "development") {
      stopViteDevServer();
    }
    
    // Wait for clean shutdown
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Start both servers
    if (app.get("env") === "development") {
      startViteDevServer();
    }
    startUserApiServer();
    
    // Wait for backend to be ready
    let backendReady = false;
    for (let i = 0; i < 10; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      backendReady = await isUserApiAlive();
      if (backendReady) break;
    }
    
    console.log("✅ All servers restarted successfully");
    
    res.json({ 
      status: "success",
      message: "Both frontend (5173) and backend (5002) servers restarted",
      timestamp: new Date().toISOString(),
      services: {
        vite: app.get("env") === "development" ? "restarted" : "not in dev mode",
        backend: backendReady ? "ready" : "starting (may take a few seconds)"
      }
    });
  } catch (err: any) {
    console.error("❌ Failed to restart servers:", err);
    res.status(500).json({ 
      status: "error",
      message: err.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 🔁 Vite restart endpoint
app.post("/api/restart-vite", (req, res) => {
  if (app.get("env") !== "development") {
    return res.status(400).json({ 
      status: "error",
      message: "Vite restart only available in development mode" 
    });
  }
  
  console.log("🔄 Restarting Vite dev server...");
  restartViteDevServer();
  res.json({ 
    status: "success",
    message: "Vite dev server (5173) restarted",
    timestamp: new Date().toISOString()
  });
});

app.post("/api/restart-backend", async (req, res) => {
  console.log("🔄 Restarting backend API server...");
  stopUserApiServer();
  
  // Wait for clean shutdown
  await new Promise(resolve => setTimeout(resolve, 500));
  
  startUserApiServer();
  res.json({ 
    status: "success",
    message: "Backend API server (5002) restarted",
    timestamp: new Date().toISOString()
  });
});


/* ---------------------------------------
   Dev: Proxy app shell & inject on navs
---------------------------------------- */
if (app.get("env") === "development") {
  console.log("Development mode detected, setting up Vite middleware");

  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:5173",
      changeOrigin: true,
      ws: true,
      selfHandleResponse: true,
      on: {
        proxyReq: (proxyReq, req, _res) => {
          // Force identity encoding for ALL HTML requests
          if (req.headers.accept?.includes('text/html')) {
            proxyReq.setHeader("accept-encoding", "identity");
          }
        },
        proxyRes: (proxyRes, req, res) => {
          // Check if this is an HTML response (not just navigation)
          const isHtml = proxyRes.headers['content-type']?.includes('text/html');
          const isNav = isNavigationRequest(req);

          // Only inject into HTML responses for navigation requests
          if (!isHtml || !isNav) {
            res.writeHead(proxyRes.statusCode || 200, proxyRes.headers as any);
            proxyRes.pipe(res);
            return;
          }

          const chunks: Buffer[] = [];
          proxyRes.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
          proxyRes.on("end", () => {
            let body = Buffer.concat(chunks).toString("utf8");
            body = injectHeadTag(body);            

            // Fix headers for the modified payload
            const headers = { ...(proxyRes.headers as any) };
            delete headers["content-length"];
            delete headers["content-encoding"];
            headers["content-type"] = "text/html; charset=utf-8";
            headers["cache-control"] = "no-store, no-cache, must-revalidate";

            res.writeHead(proxyRes.statusCode || 200, headers);
            res.end(body, "utf8");
          });
        },
      },
    })
  );
}
