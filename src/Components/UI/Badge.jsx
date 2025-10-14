import React from "react";

export function Badge({ children, className = "", variant = "default", ...props }) {
  const variants = {
    default: "bg-blue-100 text-blue-700 border border-blue-200",
    success: "bg-green-100 text-green-700 border border-green-200",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-200",
    danger: "bg-red-100 text-red-700 border border-red-200",
    outline: "bg-transparent border border-gray-300 text-gray-700",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-sm font-medium rounded-full ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
