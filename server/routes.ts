import type { Express } from "express";
import { createServer, type Server } from "http";
import { promises as fs } from "fs";
import path from "path";
import { createProjectZip } from "./zip";
import { fileURLToPath } from "url";
import { randomBytes } from "crypto";

interface FileUpdatePayload {
  filePath: string;
  content: string;
  encoding?: "utf8" | "base64";
}

const WORKDIR =
  process.env.WORKDIR ||
  process.env.ROFY_WORKDIR ||
  '/data';

async function ensureDir(p: string) {
  await fs.mkdir(p, { recursive: true });
}

// Prevent path traversal & force paths to live under WORKDIR
function resolveSafe(workRoot: string, rel: string) {
  const normalized = path.normalize(rel);
  if (normalized.includes("..") || path.isAbsolute(normalized)) {
    throw new Error("Invalid file path (cannot contain '..' or be absolute)");
  }
  const abs = path.join(workRoot, normalized);
  const resolvedAbs = path.resolve(abs);
  const resolvedRoot = path.resolve(workRoot);
  if (!resolvedAbs.startsWith(resolvedRoot + path.sep) && resolvedAbs !== resolvedRoot) {
    throw new Error("Access denied: path must be within project directory");
  }
  return resolvedAbs;
}


  // atomic write (write tmp → rename)
async function writeAtomic(filePath: string, data: Buffer | string) {
  const dir = path.dirname(filePath);
  await ensureDir(dir);
  const tmp = path.join(
    dir,
    `.${path.basename(filePath)}.${randomBytes(6).toString("hex")}.tmp`
  );
  await fs.writeFile(tmp, data);
  await fs.rename(tmp, filePath);
}

export async function registerRoutes(app: Express): Promise<Server> {

  app.post("/api/rofyUpdateFiles", async (req, res) => {
  const files: FileUpdatePayload[] = req.body;

  if (!Array.isArray(files)) {
    return res.status(400).json({
      error: "Invalid input",
      message: "Request body must be an array of file objects",
    });
  }

  // Make sure volume root exists
  await ensureDir(WORKDIR);

  const results: any[] = [];

  for (const file of files) {
    const { filePath: rel, content, encoding = "utf8" } = file;

    try {
      if (!rel || typeof rel !== "string") {
        throw new Error("Missing or invalid file path");
      }
      if (content === undefined || content === null) {
        throw new Error("Missing content");
      }

      const abs = resolveSafe(WORKDIR, rel);

      // Choose encoding
      let data: Buffer | string;
      if (encoding === "base64") {
        data = Buffer.from(content, "base64");
      } else if (encoding === "utf8") {
        data = content;
      } else {
        throw new Error(`Unsupported encoding: ${encoding}`);
      }

      await writeAtomic(abs, data);

      results.push({
        filePath: rel,
        status: "success",
        absolutePath: abs,
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      results.push({
        filePath: file.filePath,
        status: "error",
        message: err?.message ?? "Unknown error",
      });
    }
  }

  // Restart backend once after batch write (same-machine call)
  try {
    await fetch("http://localhost:5001/api/restart-backend", { method: "POST" });
  } catch (e) {
    // Non-fatal for the write operation, but report it
    results.push({
      filePath: null,
      status: "warn",
      message: "Wrote files but failed to call /api/restart-backend",
    });
  }

  res.json({ root: WORKDIR, results });
});

  app.post("/api/rofyDownloadFiles", async (req, res) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const { projectName } = req.body;
    const sanitized = projectName.replace(/[^a-zA-Z0-9-_]/g, "_");
    const zipPath = await createProjectZip({ projectName: sanitized });

    const zipExists = await fs.access(zipPath).then(() => true).catch(() => false);
    if (!zipExists) {
      return res.status(500).json({ success: false, error: "Zip creation failed" });
    }

    const fileName = path.basename(zipPath);
    const publicPath = `/downloads/${fileName}`;
    const publicDir = path.join(__dirname, "../public/downloads");
    const dirExists = await fs.access(publicDir).then(() => true).catch(() => false);
    if (!dirExists) {
      await fs.mkdir(publicDir, { recursive: true });
    }

    const publicFilePath = path.join(publicDir, fileName);

    // Move file to public folder
    await fs.rename(zipPath, publicFilePath);

    await fetch("http://localhost:5001/api/restart-backend", {
      method: "POST",
    });

    return res.json({
      success: true,
      downloadUrl: publicPath, // relative browser-accessible path
    });

  } catch (err) {
    console.error("Error in rofyDownloadFiles:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
});


  const httpServer = createServer(app);
  return httpServer;
}
