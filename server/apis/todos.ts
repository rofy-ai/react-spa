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

/** GET /api/todo  – return all todos */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const todos = await readTodos();
    res.json(todos);
  } catch (err) {
    console.error("Todo GET error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** POST /api/todo  – create a new todo */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text is required" });
    }

    const newTodo: Todo = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 11),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const todos = await readTodos();
    todos.unshift(newTodo);
    await writeTodos(todos);

    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Todo POST error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** PUT /api/todo/:id  – update an existing todo */
router.put("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body as Partial<Todo>;

    if (!id) {
      return res.status(400).json({ error: "Todo ID is required" });
    }

    const todos = await readTodos();
    const idx = todos.findIndex((t) => t.id === id);

    if (idx === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todos[idx] = {
      ...todos[idx],
      ...(typeof text === "string" ? { text: text.trim() } : {}),
      ...(typeof completed === "boolean" ? { completed } : {}),
      updatedAt: new Date().toISOString(),
    };

    await writeTodos(todos);
    res.json(todos[idx]);
  } catch (err) {
    console.error("Todo PUT error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** DELETE /api/todo/:id  – remove a todo */
router.delete("/:id", async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Todo ID is required" });
    }

    const todos = await readTodos();
    const initialLen = todos.length;
    const remaining = todos.filter((t) => t.id !== id);

    if (remaining.length === initialLen) {
      return res.status(404).json({ error: "Todo not found" });
    }

    await writeTodos(remaining);
    res.status(204).end(); // No Content
  } catch (err) {
    console.error("Todo DELETE error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/** Fallback for unsupported verbs on /api/todo */
router.all("*", (_req, res) =>
  res.status(405).json({ error: "Method not allowed" })
);

export default router;
