import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

interface TodoFormProps {
  onAddTodo: (text: string) => void;
}

export function TodoForm({ onAddTodo }: TodoFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (trimmedText) {
      onAddTodo(trimmedText);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-6 py-4 text-lg backdrop-blur-md bg-white/20 dark:bg-black/20 border-2 border-white/30 dark:border-white/10 text-white placeholder-white/70 rounded-xl focus:border-white/50 dark:focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-300 pr-16"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 backdrop-blur-md bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 disabled:bg-white/10 disabled:cursor-not-allowed text-white p-3 rounded-lg border border-white/30 dark:border-white/10 transition-all duration-300 hover:scale-105"
        >
          <FiPlus className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}