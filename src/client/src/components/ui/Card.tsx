import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
  subtitle,
  headerClassName = "",
  contentClassName = "",
}) => (
  <div className={`card rounded-lg shadow bg-white p-4 ${className}`}>
    {(title || subtitle) && (
      <div className={`card-header mb-4 ${headerClassName}`}>
        {title && (
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        )}
        {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
      </div>
    )}
    <div className={contentClassName}>{children}</div>
  </div>
);

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = "",
}) => <div className={`card-header mb-4 ${className}`}>{children}</div>;

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = "",
}) => <div className={`card-content ${className}`}>{children}</div>;
