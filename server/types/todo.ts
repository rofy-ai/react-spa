export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';

export interface CreateTodoRequest {
  text: string;
}

export interface UpdateTodoRequest {
  text?: string;
  completed?: boolean;
}

export interface TodoResponse {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface TodoListResponse {
  todos: TodoResponse[];
  total: number;
}

export interface DeleteTodoResponse {
  message: string;
  todo: TodoResponse;
}
