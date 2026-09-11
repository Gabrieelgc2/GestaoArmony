import type { ReactNode } from "react";

interface InputProps {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
  rightIconLabel?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean
}

export default function Input({
  id,
  label,
  type = "text",
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconClick,
  rightIconLabel = "Ação do campo",
  value,
  onChange,
  required = false
}: InputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex items-center rounded-lg border border-gray-300 bg-gray-100 px-3">
        {leftIcon && (
          <span className="mr-2 text-gray-500">
            {leftIcon}
          </span>
        )}

        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
          className="flex-1 bg-transparent py-3 outline-none"
        />

        {rightIcon && (
          <button
            type="button"
            onClick={onRightIconClick}
            aria-label={rightIconLabel}
            className="ml-2 text-gray-500 cursor-pointer"
          >
            {rightIcon}
          </button>
        )}
      </div>
    </div>
  );
}