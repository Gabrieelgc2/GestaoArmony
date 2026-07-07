import type { ReactNode } from "react";

interface InfoFieldProps{
    label:string;
    value?: ReactNode;
    icon?: ReactNode;
}

export default function InfoField({
    label,
    value,
}:InfoFieldProps){

    return(
        <div className="space-y-1">
            <p className="text-xs font-semibold tracking-wide text-[#737685] uppercase">
                {label}
            </p>

            <div className="text-base text-[#191C1E]">
                {value}
            </div>
        </div>
    )
}