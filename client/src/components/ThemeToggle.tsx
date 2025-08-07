import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <MdDarkMode className="h-5 w-5" />
      ) : (
        <MdLightMode className="h-5 w-5" />
      )}
    </Button>
  );
}
