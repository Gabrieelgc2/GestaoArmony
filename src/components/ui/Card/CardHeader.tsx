import type { ReactNode } from "react";
interface CardHeaderProps{
   icon: ReactNode;
   title: string;
   variant?: "default" | "outlined";
}

export default function CardHeader({
  icon,
  title,
  variant = "default",
}: CardHeaderProps) {
  return (
    <div
      className={`
        flex items-center gap-3
        ${variant === "outlined"
          ? "rounded-3xl bg-[#DFE1E6] p-6"
          : ""}
      `}
    >
      {icon}

      <h2 className="text-2xl font-semibold">
        {title}
      </h2>
    </div>
  );
}