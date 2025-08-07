import { useState } from 'react';
import { FiCheck, FiTrash2, FiEdit3, FiSave, FiX } from 'react-icons/fi';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: (newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      onEdit(trimmedText);
    }
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(todo.text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`group flex items-center gap-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border-2 transition-all duration-300 hover:bg-white/90 dark:hover:bg-gray-700/90 hover:shadow-xl hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20 hover:scale-[1.02] hover:-translate-y-1 cursor-pointer relative z-20 ${
      todo.completed ? 'border-green-200 dark:border-green-700 bg-green-50/80 dark:bg-green-900/40 hover:bg-green-100/90 dark:hover:bg-green-900/50 hover:border-green-300 dark:hover:border-green-600' : 'border-gray-200/60 dark:border-gray-600/60 hover:border-blue-400/80 dark:hover:border-blue-500/80'
    }`}>
      <button
        onClick={onToggle}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 ${
          todo.completed
            ? 'bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600'
            : 'border-gray-300 dark:border-gray-500 hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
        }`}
      >
        {todo.completed && <FiCheck className="w-4 h-4" />}
      </button>

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-500 dark:bg-gray-600 dark:text-white rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors"
          >
            <FiSave className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <div
            onClick={onToggle}
            className={`flex-1 text-lg cursor-pointer select-none py-2 px-3 rounded-lg transition-all duration-200 hover:bg-gray-100/80 dark:hover:bg-gray-600/50 hover:scale-[1.01] ${
              todo.completed
                ? 'text-gray-500 dark:text-gray-400 line-through hover:text-gray-600 dark:hover:text-gray-300'
                : 'text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {todo.text}
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-md"
            >
              <FiTrash2 className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}