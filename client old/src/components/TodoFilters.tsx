import { FiList, FiCheckCircle, FiCircle, FiTrash2 } from 'react-icons/fi';
import { TodoFilter } from '../types/todo';

interface TodoFiltersProps {
  filter: TodoFilter;
  onFilterChange: (filter: TodoFilter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
}

export function TodoFilters({ 
  filter, 
  onFilterChange, 
  activeCount, 
  completedCount, 
  onClearCompleted 
}: TodoFiltersProps) {
  const filters: { key: TodoFilter; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All', icon: <FiList className="w-4 h-4" /> },
    { key: 'active', label: 'Active', icon: <FiCircle className="w-4 h-4" /> },
    { key: 'completed', label: 'Completed', icon: <FiCheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors">
      <div className="flex items-center justify-between gap-6 min-w-0">
        <div className="flex gap-2 flex-shrink-0">
          {filters.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                filter === key
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white dark:bg-gray-600 text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-500 border border-gray-200 dark:border-gray-500'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 flex-shrink-0">
          <span className="whitespace-nowrap">
            {activeCount} active, {completedCount} completed
          </span>
          
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors whitespace-nowrap"
            >
              <FiTrash2 className="w-4 h-4" />
              Clear completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}