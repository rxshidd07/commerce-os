import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-gradient-to-br from-slate-800/50 to-slate-900/30 border border-slate-700/50 rounded-xl',
        'backdrop-blur-sm hover:border-slate-600/50 transition-all duration-300',
        'shadow-lg shadow-black/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
