import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../lib/queryClient';
import { TodoList } from './TodoList';
import { TodoForm } from './TodoForm';
import { TodoFilters } from './TodoFilters';
import { ThemeToggle } from './ThemeToggle';
import { Todo, TodoFilter } from '../types/todo';

export function TodoApp() {
  const [filter, setFilter] = useState<TodoFilter>('all');
  const queryClient = useQueryClient();

  // Fetch todos
  const { data: todos = [], isLoading, error } = useQuery<Todo[]>({
    queryKey: ['/api/todos'],
    select: (data) => data.map(todo => ({
      ...todo,
      createdAt: new Date(todo.createdAt)
    }))
  });

  // Add todo mutation
  const addTodoMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await apiRequest('POST', '/api/todos', { text });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    }
  });

  // Toggle todo mutation
  const toggleTodoMutation = useMutation({
    mutationFn: async ({ id, completed }: { id: string; completed: boolean }) => {
      const response = await apiRequest('PUT', `/api/todos/${id}`, { completed });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    }
  });

  // Delete todo mutation
  const deleteTodoMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/todos/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    }
  });

  // Edit todo mutation
  const editTodoMutation = useMutation({
    mutationFn: async ({ id, text }: { id: string; text: string }) => {
      const response = await apiRequest('PUT', `/api/todos/${id}`, { text });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    }
  });

  // Clear completed mutation
  const clearCompletedMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest('DELETE', '/api/todos-bulk');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/todos'] });
    }
  });

  const addTodo = (text: string) => {
    addTodoMutation.mutate(text);
  };

  const toggleTodo = (id: string) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      toggleTodoMutation.mutate({ id, completed: !todo.completed });
    }
  };

  const deleteTodo = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  const editTodo = (id: string, newText: string) => {
    editTodoMutation.mutate({ id, text: newText });
  };

  const clearCompleted = () => {
    clearCompletedMutation.mutate();
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.length - completedCount;

    
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="backdrop-blur-2xl bg-gradient-to-br from-white/25 via-white/15 to-white/10 dark:from-black/25 dark:via-black/15 dark:to-black/10 rounded-3xl shadow-2xl border border-white/30 dark:border-white/10 overflow-hidden transition-all duration-500 hover:shadow-3xl hover:border-white/40 dark:hover:border-white/20 relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          <div className="bg-gradient-to-r from-white/30 via-white/20 to-white/10 dark:from-black/30 dark:via-black/20 dark:to-black/10 backdrop-blur-xl px-8 py-6 border-b border-white/30 dark:border-white/15 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/5 to-indigo-500/10 dark:from-violet-400/5 dark:via-purple-400/3 dark:to-indigo-400/5 -z-10"></div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg text-center relative z-10">
              Stay organized and get things done
            </h1>
          </div>
          
          <div className="p-8 relative z-10">
            <TodoForm onAddTodo={addTodo} />
            
            {todos.length > 0 && (
              <>
                <TodoFilters 
                  filter={filter} 
                  onFilterChange={setFilter}
                  activeCount={activeCount}
                  completedCount={completedCount}
                  onClearCompleted={clearCompleted}
                />
                
                <TodoList 
                  todos={filteredTodos}
                  onToggleTodo={toggleTodo}
                  onDeleteTodo={deleteTodo}
                  onEditTodo={editTodo}
                />
              </>
            )}
            
            {todos.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">📝</div>
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No todos yet. Add one above to get started!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

}