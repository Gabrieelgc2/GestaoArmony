import React, {useState} from "react";
import {type PresetOption, type DateRange, getPresetDateRange} from "./DateLogic";

interface DateRangePopoverProps {
    onApply: (range: DateRange) => void;
    onCancel?: () => void;
}

const PRESETS: PresetOption[] = ['Hoje', 'Ontem', '7 dias atrás', 'Mês passado'];

export const DateRangePopover: React.FC<DateRangePopoverProps> = ({
    onApply,
    onCancel
}) => {
    const [selectedPreset, setSelectedPreset] = useState<PresetOption>('Hoje');
    const [tempRange, setTempRange] = useState<DateRange>(getPresetDateRange('Hoje'));

    const handlePresetSelect = (preset: PresetOption) => {
        setSelectedPreset(preset);
        setTempRange(getPresetDateRange(preset));
    };

    return (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl p-4 z-50">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Atalhos de Período
            </h4>
        <div className="flex flex-col gap-1 mb-4">
            {PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset;
            return (
                <button
                key={preset}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                isSelected ? 'bg-blue-500 text-blue-600 font-semibold': 'text-slate-700 hover:bg-slate-50'
                }`}
                >
                • {preset}
                </button>
            );
            })}
        </div>
        <hr className="border-slate-100 my-3" />
        <div className="flex items-center justify-end gap-2">
        <button
        type="button"
        onClick={onCancel}
        className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
        Cancelar
        </button>
        <button
        type="button"
        onClick={() => onApply(tempRange)}
        className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
        Aplicar filtro
        </button>
        </div>
        </div>
    );
};