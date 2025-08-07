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
    <div className="mb-6 p-4 backdrop-blur-md bg-white/10 dark:bg-black/10 rounded-xl border border-white/20 dark:border-white/10 transition-all duration-300">
      <div className="flex items-center justify-between gap-6 min-w-0">
        <div className="flex gap-2 flex-shrink-0">
          {filters.map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                filter === key
                  ? 'backdrop-blur-md bg-white/30 dark:bg-white/20 text-white shadow-lg border border-white/40 dark:border-white/30'
                  : 'backdrop-blur-md bg-white/10 dark:bg-black/10 text-white/90 hover:bg-white/20 dark:hover:bg-white/15 border border-white/20 dark:border-white/10'
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-white/80 flex-shrink-0">
          <span className="whitespace-nowrap">
            {activeCount} active, {completedCount} completed
          </span>
          
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="flex items-center gap-2 px-3 py-2 text-red-300 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-all duration-300 whitespace-nowrap backdrop-blur-sm border border-red-400/30 hover:border-red-300/50"
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