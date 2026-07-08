import type { ReactNode } from "react";

interface ButtonConfirmProps {
  children: ReactNode;
  type?: "button" | "submit";
  icon?: ReactNode;
  onClick?: () => void;
}

export default function ButtonConfirm({
  children,
  type = "button",
  onClick,
}: ButtonConfirmProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        cursor-pointer
        w-full
        rounded-xl
        bg-blue-800
        py-4
        text-white
        font-semibold
        transition
        hover:bg-blue-900
      "
    >
      {children}
    </button>
  );
}