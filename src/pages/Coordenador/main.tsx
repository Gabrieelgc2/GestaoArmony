import React, { useState } from 'react';
import { DateRangeTrigger } from './DateRangeTrigger';
import { DateRangePopover } from './DateRangePopover';
import { type DateRange, getPresetDateRange } from './DateLogic';

export const DateRangePicker: React.FC<{ onFilterChange?: (range: DateRange) => void }> = ({
    onFilterChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeRange, setActiveRange] = useState<DateRange>(getPresetDateRange('Hoje'));

    const handleApply = (newRange: DateRange) => {
        setActiveRange(newRange);
        setIsOpen(false);
        if(onFilterChange) {
            onFilterChange(newRange);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
    }

    const periodoTextoFormatted = `${activeRange.from} - ${activeRange.to} (${activeRange.label})`;

    return (
        <div className="relative inline-block">
            <DateRangeTrigger
            periodoTexto={periodoTextoFormatted}
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
                <DateRangePopover
                onApply={handleApply}
                onCancel={handleCancel}
                />
            )}
        </div>
    );
};