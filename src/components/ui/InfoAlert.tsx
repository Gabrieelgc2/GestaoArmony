import type { LucideIcon } from "lucide-react";
import { Info } from "lucide-react";

interface InfoAlertProps {
  children: React.ReactNode;
  icon?: LucideIcon;
}

export default function InfoAlert({
  children,
  icon: Icon = Info,
}: InfoAlertProps) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-[#0052CC] bg-[#EAF2FF] p-5">
      <Icon
        className="mt-0.5 shrink-0 text-[#003D9B]"
        size={22}
        strokeWidth={2.2}
      />

      <p className="text-base leading-8 text-[#0040A2]">
        {children}
      </p>
    </div>
  );
}