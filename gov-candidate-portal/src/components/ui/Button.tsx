import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 
      'inline-flex items-center justify-center font-medium transition-all duration-200 ' +
      'ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus:ring-2 focus:ring-[#5E6AD2]/50 ' +
      'focus:ring-offset-2 focus:ring-offset-[#050506] disabled:opacity-40 disabled:pointer-events-none ' +
      'cursor-pointer select-none active:scale-[0.98] relative overflow-hidden';

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
      md: 'text-sm px-4 py-2 rounded-lg gap-2',
      lg: 'text-base px-5 py-2.5 rounded-xl gap-2.5 font-semibold',
      icon: 'h-9 w-9 rounded-lg p-0',
    };

    const variantStyles = {
      primary:
        'bg-[#5E6AD2] hover:bg-[#6872D9] text-white linear-accent-shadow border-t border-white/20',
      secondary:
        'bg-white/[0.05] hover:bg-white/[0.09] text-[#EDEDEF] border border-white/[0.08] hover:border-white/[0.16] shadow-sm',
      ghost:
        'bg-transparent hover:bg-white/[0.06] text-[#8A8F98] hover:text-[#EDEDEF]',
      outline:
        'bg-transparent border border-white/[0.12] hover:border-[#5E6AD2]/60 text-[#EDEDEF] hover:bg-[#5E6AD2]/10',
      success:
        'bg-emerald-600/90 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-emerald-400/30',
      danger:
        'bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {/* Subtle shine highlight */}
        {variant === 'primary' && (
          <span className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        )}
        {isLoading ? (
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
