interface StatusButtonProps {
    category: string;
    activeStatus: string;
    onClick: (category: string) => void;
    label?: string;
}

export default function StatusButton({ category, activeStatus, onClick, label }: StatusButtonProps) {
    const isActive = category === activeStatus;

    return (
        <button
        onClick={() => onClick(category)}
        className={`shrink-0 rounded-xl px-4 py-2 text-base font-semibold transition ${
            isActive? "bg-[#003D9B] text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
        }`}
        >
        {label || category}
        </button>
    );
}