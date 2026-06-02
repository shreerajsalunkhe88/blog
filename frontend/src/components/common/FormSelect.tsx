'use client';

import React from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  children?: React.ReactNode;
}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, error, helperText, required, options, placeholder, children, ...props }, ref) => {
    return (
      <div className="mb-4">
        {label && (
          <label className="label-base">
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}
        <select
          ref={ref}
          {...props}
          className={`input-base ${error ? 'input-error' : ''}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.name}-error` : helperText ? `${props.name}-help` : undefined}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options && options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {children}
        </select>
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

FormSelect.displayName = 'FormSelect';

FormSelect.displayName = 'FormSelect';
