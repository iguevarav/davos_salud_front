import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}


export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  className = "",
}: ButtonProps) {
    
  const baseClasses =
    "rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-derma-pink-300";

  const variants = {
    primary:
      "bg-derma-pink-300 text-white hover:bg-derma-pink-400 shadow-sm hover:shadow-md",
    secondary: "bg-derma-pink-100 text-derma-pink-500 hover:bg-derma-pink-200",
    outline:
      "border border-derma-pink-300 text-derma-pink-500 hover:bg-derma-pink-50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick} type={type}
    >
      {children}
    </button>
  );
}
