import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { promises as fs } from "fs";
import path from "path";
import { pathToFileURL } from "url";

const HTTP_METHODS = ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"] as const;

function wrap<H extends (req: Request, res: Response, next?: NextFunction) => any>(handler: H) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const maybePromise = handler(req, res, next);
      if (maybePromise instanceof Promise) await maybePromise;
      if (!res.headersSent) res.status(204).end();
    } catch (err) {
      next(err as Error);
    }
  };
}

function isRouter(obj: unknown): obj is { use: Function } {
  return typeof obj === "function" && typeof (obj as any).use === "function";
}

export async function registerBackendRoutes(app: Express): Promise<Server> {
  const userApiDir =
    process.env.NODE_ENV === "production"
      ? path.resolve(process.cwd(), "dist/server/apis") // compiled .js
      : path.resolve(process.cwd(), "server/apis");     // raw .ts in dev

  app.get("/__health", (_req, res) => res.json({ status: "ok" }));

  try {
    const files = await fs.readdir(userApiDir);

    for (const file of files) {
      if (!/\.(c?[jt]s|m?[jt]s)$/i.test(file)) continue;

      const routePath = `/api/${file.replace(/\.(c?[jt]s|m?[jt]s)$/i, "")}`;

      // normalize extension to .js for production
      const resolvedFile =
        process.env.NODE_ENV === "production"
          ? file.replace(/\.(c?[jt]s|m?[jt]s)$/i, ".js")
          : file;

      const fullPath = path.join(userApiDir, resolvedFile);
      const moduleUrl = `${pathToFileURL(fullPath).href}?t=${Date.now()}`;

      try {
        const mod = await import(moduleUrl);

        let registered = false;
        for (const VERB of HTTP_METHODS) {
          const fn = mod[VERB];
          if (typeof fn === "function") {
            (app as any)[VERB.toLowerCase()](routePath, wrap(fn));
            registered = true;
          }
        }

        if (!registered && mod.default) {
          if (isRouter(mod.default)) {
            app.use(routePath, mod.default);
          } else if (typeof mod.default === "function") {
            app.all(routePath, wrap(mod.default));
          } else {
            console.warn(`⚠️  ${file}: default export is neither Router nor function`);
          }
        }

        console.log(`✅ Routes ready at ${routePath}`);
      } catch (err) {
        console.error(`❌ Failed loading ${file}:`, err);
      }
    }
  } catch (err) {
    console.error("❌ Error scanning api folder:", err);
  }

  return createServer(app);
}
