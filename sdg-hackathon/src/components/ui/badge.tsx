import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'accent';
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 dark:from-gray-700 dark:to-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-600',
      primary: 'bg-gradient-to-r from-primary-100 to-primary-50 text-primary-800 dark:from-primary-900 dark:to-primary-800 dark:text-primary-300 border border-primary-200 dark:border-primary-800',
      secondary: 'bg-gradient-to-r from-secondary-100 to-secondary-50 text-secondary-800 dark:from-secondary-900 dark:to-secondary-800 dark:text-secondary-300 border border-secondary-200 dark:border-secondary-800',
      outline: 'bg-transparent border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 transition-colors',
      accent: 'bg-gradient-to-r from-accent-100 to-accent-50 text-accent-800 dark:from-accent-900 dark:to-accent-800 dark:text-accent-300 border border-accent-200 dark:border-accent-800',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-200 shadow-sm hover:shadow',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
