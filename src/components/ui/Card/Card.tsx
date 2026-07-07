import clsx from "clsx";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className,
}: CardProps) {
  return (
    <div
      className={clsx(
        "w-full rounded-2xl border border-[#DFE1E6] bg-white p-6 shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}