export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date | string;
  updatedAt?: string;
}

export type TodoFilter = 'all' | 'active' | 'completed';
