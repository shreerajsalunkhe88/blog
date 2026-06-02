'use client';

import React from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  rows?: number;
}

export const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, required, rows = 4, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="label-base">
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          rows={rows}
          {...props}
          className={`input-base resize-none ${error ? 'input-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.name}-error` : helperText ? `${props.name}-help` : undefined}
        />
        {error && (
          <p id={`${props.name}-error`} className="text-error mt-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${props.name}-help`} className="text-sm text-neutral-500 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
