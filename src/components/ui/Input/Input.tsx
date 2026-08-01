import type { ReactNode } from "react";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean
}

export default function Input({
  label,
  type = "text",
  placeholder,
  leftIcon,
  rightIcon,
  value,
  onChange,
  required = false
}: InputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-3">
        {leftIcon && (
          <span className="mr-2 text-gray-500">
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className="flex-1 bg-transparent py-3 outline-none"
        />

        {rightIcon && (
          <span className="ml-2 cursor-pointer text-gray-500">
            {rightIcon}
          </span>
        )}
      </div>
    </div>
  );
}