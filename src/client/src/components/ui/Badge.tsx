import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "verified"
    | "pending"
    | "environmental"
    | "social"
    | "governance"
    | "default";
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  verified:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",
  pending:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
  environmental:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800",
  social:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800",
  governance:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
  default:
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  className = "",
}) => (
  <span className={`${VARIANT_CLASSES[variant]} ${className}`.trim()}>
    {children}
  </span>
);
