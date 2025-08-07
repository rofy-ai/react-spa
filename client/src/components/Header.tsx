import { ThemeToggle } from './ThemeToggle';
import { FiUser, FiUserPlus } from 'react-icons/fi';

export function Header() {
  return (
    <header className="bg-white/10 backdrop-blur-xl shadow-2xl border-b border-white/20 transition-all duration-300 relative z-10 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/5 before:via-white/10 before:to-white/5 before:backdrop-blur-3xl before:rounded-lg">    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-600/15 to-indigo-500/10 backdrop-blur-sm"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white drop-shadow-lg bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              ✨ Todo App
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white/90 hover:text-white dark:text-gray-200 dark:hover:text-white bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/60 rounded-lg border border-white/20 hover:border-white/30 dark:border-gray-600/50 dark:hover:border-gray-500/60 transition-all duration-200 backdrop-blur-sm">
              <FiUser className="w-4 h-4" />
              <span>Login</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 bg-white hover:bg-white/90 dark:bg-gray-100 dark:hover:bg-white rounded-lg border border-white/20 hover:border-white/30 dark:border-gray-300 dark:hover:border-gray-200 transition-all duration-200 backdrop-blur-sm">
              <FiUserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
