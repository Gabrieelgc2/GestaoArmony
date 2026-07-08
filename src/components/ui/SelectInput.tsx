import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  placeholder: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  icon?: LucideIcon;
  error?: string
}

export default function Select({
  placeholder,
  options,
  value,
  onChange,
  icon: Icon,
  error
}: SelectProps) {
  return (
    <div className="relative">
      {Icon && (
        <Icon
          size={24}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#737685]"
        />
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          h-16 w-full appearance-none rounded-3xl border border-[#DFE1E6]
          bg-white pr-14 text-base text-[#191C1E]
          focus:border-[#0052CC] focus:outline-none
             ${error
            ? "border-red-500 focus:border-red-500"
            : "border-[#DFE1E6] focus:border-[#0052CC]"
          }
            ${Icon ? "pl-16" : "pl-6"}
          `}

      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={28}
        className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#737685]"
      />

      {error && (
        <p className="mt-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}