import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  colorClass?: string;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  colorClass = "text-blue-500",
}) => (
  <svg
    className={`animate-spin ${sizeClasses[size]} ${colorClass} ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Loading"
    role="status"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  spinnerClassName?: string;
  spinnerColorClass?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  size = "md",
  spinnerClassName = "",
  spinnerColorClass = "text-blue-500",
}) => (
  <div className="flex flex-col items-center justify-center py-12">
    <LoadingSpinner
      size={size}
      className={spinnerClassName}
      colorClass={spinnerColorClass}
    />
    <p className="mt-4 text-gray-600">{message}</p>
  </div>
);
