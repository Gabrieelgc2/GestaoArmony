import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";

interface DateInputProps {
  label?: string;
  placeholder?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
}

export default function DateInput({
  label,
  placeholder = "Selecione uma data",
  value,
  onChange,
}: DateInputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Popover>
        <PopoverTrigger>
          <button
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              border
              border-gray-300
              bg-gray-100
              px-3
              py-3
              text-left
            "
          >
            <CalendarDays
              size={18}
              className="text-gray-500"
            />

            <span
              className={
                value
                  ? "text-black"
                  : "text-gray-400"
              }
            >
              {value
                ? format(value, "dd/MM/yyyy", {
                    locale: ptBR,
                  })
                : placeholder}
            </span>
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}