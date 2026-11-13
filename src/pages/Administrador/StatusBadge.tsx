import React from "react";
export const StatusBadge: React.FC<{ status: boolean | string }> = ({ status }) => {
    const isPositive = status === true || status === 'Ativo'
    const label = typeof status === 'boolean' ? (status ? 'Ativa' : 'Inativa') : status
    return (
        <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
                }`}
        >
            <span className={`w-1.5 h-1.5 rounded-full ${isPositive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            {label}
        </span>
    );
};