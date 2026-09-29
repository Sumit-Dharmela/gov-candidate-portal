import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'purple' | 'outline';
  dot?: boolean;
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  dot = false,
  pulse = false,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white/[0.06] text-[#EDEDEF] border border-white/[0.08]',
    accent: 'bg-[#5E6AD2]/15 text-[#8b95ec] border border-[#5E6AD2]/35 shadow-[0_0_12px_rgba(94,106,210,0.15)]',
    success: 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25 shadow-[0_0_12px_rgba(16,185,129,0.15)]',
    warning: 'bg-amber-500/10 text-amber-300 border border-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.15)]',
    purple: 'bg-purple-500/10 text-purple-300 border border-purple-500/25',
    outline: 'bg-transparent text-[#8A8F98] border border-white/[0.12]',
  };

  const dotColors = {
    default: 'bg-gray-400',
    accent: 'bg-[#5E6AD2]',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    purple: 'bg-purple-400',
    outline: 'bg-white/40',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium tracking-wide transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {pulse && (
            <span
              className={cn(
                'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
                dotColors[variant]
              )}
            />
          )}
          <span className={cn('relative inline-flex rounded-full h-2 w-2', dotColors[variant])} />
        </span>
      )}
      {children}
    </span>
  );
};
