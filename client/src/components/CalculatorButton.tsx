import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CalculatorButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: 'number' | 'operator' | 'equals' | 'clear';
  className?: string;
}

export const CalculatorButton = ({
  children,
  onClick,
  variant = 'number',
  className,
}: CalculatorButtonProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'operator':
        return 'btn-operator';
      case 'equals':
        return 'btn-equals';
      case 'clear':
        return 'btn-clear';
      default:
        return 'btn-number';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'glass-button',
        'h-16 text-xl font-medium',
        'flex items-center justify-center',
        'animate-press',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        'select-none touch-manipulation',
        getVariantClasses(),
        className
      )}
    >
      {children}
    </button>
  );
};