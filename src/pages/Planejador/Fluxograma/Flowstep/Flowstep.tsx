import { Check, Lock } from "lucide-react";

interface FlowStepProps {
  title: string;
  subtitle: string;
  completed?: boolean;
  success?: boolean;
  isLast?: boolean;
}

export default function FlowStep({
  title,
  subtitle,
  completed = false,
  success = false,
  isLast = false,
}: FlowStepProps) {
  return (
    <div className="flex gap-4">
      {/* Ícone + Linha */}
      <div className="flex flex-col items-center">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full
          ${
            completed
              ? "bg-emerald-500 text-white"
              : "bg-gray-100 text-gray-400"
          }`}
        >
          {completed ? (
            <Check size={20} strokeWidth={3} />
          ) : (
            <Lock size={18} />
          )}
        </div>

        {!isLast && (
          <div
            className={`mt-1 w-0.5 flex-1 ${
              completed ? "bg-emerald-500" : "bg-gray-200"
            }`}
          />
        )}
      </div>

      {/* Título */}
      <div className="pb-10">
        <h3
          className={`text-2xl font-semibold ${
            completed ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {title}
        </h3>

        {/* Subtítulo */}
        <p
          className={`text-base font-medium tracking-wide ${
            success
              ? "text-emerald-500"
              : completed
              ? "text-gray-900"
              : "text-gray-300"
          }`}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}