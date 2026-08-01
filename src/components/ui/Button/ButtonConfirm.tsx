import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonConfirmProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
}

export default function ButtonConfirm({
  children,
  type = "submit",
  icon,
  disabled,
  className = "",
  ...props 
}: ButtonConfirmProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      {...props}
      className={`
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-blue-800
        py-4
        font-semibold
        text-white
        transition
        hover:bg-blue-900
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {children}
      {icon && <span>{icon}</span>}
    </button>
  );
}