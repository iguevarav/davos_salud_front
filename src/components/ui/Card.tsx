import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = false,
}: CardProps) {
  const baseClasses =
    "bg-white rounded-xl shadow-derma-soft border border-derma-pink-200 transition-all duration-300";
  const hoverClasses = hover
    ? "hover:shadow-md hover:border-derma-pink-300 hover:translate-y-[-2px]"
    : "";

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
