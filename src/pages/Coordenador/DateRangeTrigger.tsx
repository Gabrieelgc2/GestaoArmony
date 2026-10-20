import React from "react";
import { Calendar, ChevronDown } from "lucide-react";

interface DateRangeTriggerProps {
    periodoTexto: string;
    isOpen: boolean;
    onToggle: () => void;
}

export const DateRangeTrigger: React.FC<DateRangeTriggerProps> =
    ({
        periodoTexto,
        isOpen,
        onToggle
    }) => {
        return (
            <div className="inline-flex items-center gap-3 p-2.5 border border-slate-200 rounded-lg bg-white shadow-sm">
                <Calendar className="w-5 h-5 text-slate-600" />
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900">Período</span>
                    <span className="text-xs text-slate-500">{periodoTexto}</span>
                </div>
                <button
                    type="button"
                    aria-label="Abrir seletor de período"
                    data-testid="btn-toggle-date-picker"
                    onClick={onToggle}
                    className={`p-1.5 text-slate-500 hover:bg-slate-100 rounded transition-all focus:outline-none ${isOpen ? 'bg-slate-100 rotate-180' : ''}`}
                >
                    <ChevronDown className="w-4 h-4 transition-transform" />
                </button>
            </div>
        );
    };