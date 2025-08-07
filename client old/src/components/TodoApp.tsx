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

  if (isLoading) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-8 py-6">
              <h1 className="text-3xl font-bold text-white text-center">
                Loading...
              </h1>
            </div>
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 dark:text-gray-400 mt-4">Loading todos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-8 py-6">
              <h1 className="text-3xl font-bold text-white text-center">
                Loading...
              </h1>
            </div>
            <div className="p-8 text-center">
              <div className="text-red-500 text-6xl mb-4">⚠️</div>
              <p className="text-red-600 dark:text-red-400 text-lg">
                Error loading todos. Please try again.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-colors">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-8 py-6">
            <h1 className="text-3xl font-bold text-white text-center">
              Stay organized and get things done
            </h1>
          </div>
          
          <div className="p-8">
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
  );
}