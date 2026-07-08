import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DateInputProps {
  placeholder?: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  error?: string;
}

export default function DateInput({
  placeholder = "Selecione uma data",
  value,
  onChange,
  error
}: DateInputProps) {
  return (
    <div className="space-y-2">

      <Popover>
        <PopoverTrigger>
          <button
            className={cn(
              "flex w-full items-center rounded-lg border px-3 py-3 text-left",
              error ? "border-red-500" : "border-gray-300"
            )}
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
          className="w-full bg-gray-200"
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

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}