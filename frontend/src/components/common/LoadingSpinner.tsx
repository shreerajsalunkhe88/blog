'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', fullScreen = false, message }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div className="flex flex-col items-center gap-4">
      <div className={`${sizeClasses[size]} border-4 border-neutral-200 border-t-primary-600 rounded-full animate-spin`} />
      {message && <p className="text-neutral-600 text-sm font-medium">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-neutral-950/50 backdrop-blur-sm flex items-center justify-center z-40">
        {spinner}
      </div>
    );
  }

  return <div className="flex justify-center items-center py-8">{spinner}</div>;
};
