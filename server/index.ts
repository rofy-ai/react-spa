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

    child.stderr?.on('data', (buf) => {
      const block = buf.toString();
      console.log("INSIDE HERE", block);
      if (!block.trim()) return;
      logErrors(block.trim());
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
    dest === "document" &&
    mode === "navigate" &&
    (site === "none" || site === "same-origin" || site === "cross-site")
  );
}

function injectHeadTag(html: string) {
  if (html.includes('data-rofy="console-capture"')) return html;
  const tag = `<script type="module" src="https://cdn.shopify.com/s/files/1/0823/3962/7304/files/log-viewer.js?v=1758289905" data-rofy="console-capture" defer></script>`;
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

// 🔁 Vite restart endpoint
app.post("/api/restart-vite", (req, res) => {
  restartViteDevServer();
  res.json({ status: "vite restarted" });
});

app.post("/api/restart-backend", (req, res) => {
  console.log("Restarting user API server...");
  stopUserApiServer();
  startUserApiServer();
  res.json({ status: "user API restarted" });
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
          // Force identity encoding ONLY for navigations so we can inject safely
          if (isNavigationRequest(req)) {
            proxyReq.setHeader("accept-encoding", "identity");
            console.log("[injector] Navigation detected → will inject logger");
          }
        },
        proxyRes: (proxyRes, req, res) => {
        // Only rewrite top-level navigations; stream everything else untouched
        if (!isNavigationRequest(req)) {
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
          headers["content-type"] = "text/html; charset=utf-8";
          headers["cache-control"] = "no-store";

          res.writeHead(proxyRes.statusCode || 200, headers);
          res.end(body, "utf8");
        });
      },
      },
      // keep APIs excluded at the top-level middleware; no filter needed here
    })
  );
}
