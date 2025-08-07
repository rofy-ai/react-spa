import { Router, Request, Response } from "express";
import fs from "fs/promises";
import path from "path";

/* ------------------------------------------------------------------ */
/* Types & constants                                                  */
/* ------------------------------------------------------------------ */

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

const TODOS_FILE = path.join(process.cwd(), "data", "todos.json");

/* ------------------------------------------------------------------ */
/* Utility helpers                                                    */
/* ------------------------------------------------------------------ */

/** Ensure that the data/ folder exists before we read or write files. */
async function ensureDataDir(): Promise<void> {
  const dir = path.dirname(TODOS_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

/** Read all todos from disk, returning an empty list if the file is missing. */
async function readTodos(): Promise<Todo[]> {
  await ensureDataDir();
  try {
    const raw = await fs.readFile(TODOS_FILE, "utf-8");
    return JSON.parse(raw) as Todo[];
  } catch {
    return [];
  }
}

/** Persist the entire todos array back to disk. */
async function writeTodos(todos: Todo[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(TODOS_FILE, JSON.stringify(todos, null, 2));
}

/* ------------------------------------------------------------------ */
/* Router & endpoints                                                 */
/* ------------------------------------------------------------------ */

const router = Router();

/** DELETE /api/todos-bulk  – remove all completed todos */
router.delete("/", async (_req: Request, res: Response) => {
  try {
    const todos = await readTodos();
    const activeTodos = todos.filter((t) => !t.completed);
    const removedCount = todos.length - activeTodos.length;

    await writeTodos(activeTodos);
    res.json({ 
      message: `Removed ${removedCount} completed todo(s)`,
      removedCount,
      remainingCount: activeTodos.length
    });
  } catch (err) {
    console.error("Todo bulk DELETE error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** Fallback for unsupported verbs on /api/todos-bulk */
router.all("*", (_req, res) =>
  res.status(405).json({ error: "Method not allowed" })
);

export default router;
