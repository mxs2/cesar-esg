import React from "react";

type CommonProps = {
  label?: string;
  error?: string;
  helper?: string;
  className?: string;
  id?: string;
};

function useUniqueId(prefix: string, id?: string) {
  return React.useMemo(
    () => id || `${prefix}-${Math.random().toString(36).slice(2, 9)}`,
    [id, prefix],
  );
}

const baseInputClass = "input-field";
const errorClass = "border-red-500 focus:border-red-500 focus:ring-red-500";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    CommonProps {}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  className = "",
  id,
  ...props
}) => {
  const inputId = useUniqueId("input", id);

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="input-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseInputClass} ${error ? errorClass : ""} ${className}`}
        aria-invalid={!!error}
        aria-describedby={
          error ? `${inputId}-error` : helper ? `${inputId}-helper` : undefined
        }
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      ) : helper ? (
        <p id={`${inputId}-helper`} className="text-sm text-gray-500">
          {helper}
        </p>
      ) : null}
    </div>
  );
};

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement>,
    CommonProps {
  options: { value: string; label: string }[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  helper,
  options,
  className = "",
  id,
  ...props
}) => {
  const selectId = useUniqueId("select", id);

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={selectId} className="input-label">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`${baseInputClass} ${error ? errorClass : ""} ${className}`}
        aria-invalid={!!error}
        aria-describedby={
          error
            ? `${selectId}-error`
            : helper
              ? `${selectId}-helper`
              : undefined
        }
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={`${selectId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      ) : helper ? (
        <p id={`${selectId}-helper`} className="text-sm text-gray-500">
          {helper}
        </p>
      ) : null}
    </div>
  );
};

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    CommonProps {}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helper,
  className = "",
  id,
  rows = 3,
  ...props
}) => {
  const textareaId = useUniqueId("textarea", id);

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={textareaId} className="input-label">
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`${baseInputClass} resize-none ${error ? errorClass : ""} ${className}`}
        aria-invalid={!!error}
        aria-describedby={
          error
            ? `${textareaId}-error`
            : helper
              ? `${textareaId}-helper`
              : undefined
        }
        rows={rows}
        {...props}
      />
      {error ? (
        <p id={`${textareaId}-error`} className="text-sm text-red-600">
          {error}
        </p>
      ) : helper ? (
        <p id={`${textareaId}-helper`} className="text-sm text-gray-500">
          {helper}
        </p>
      ) : null}
    </div>
  );
};
