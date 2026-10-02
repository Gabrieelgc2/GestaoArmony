import { useState } from "react";

interface BuscaItemIndexProps {
    totalItens: number;
    onBuscar?: (numItem: number) => void;
}

export function BuscaItemIndex({ totalItens, onBuscar }: BuscaItemIndexProps) {
    const [buscaIndex, setBuscaIndex] = useState(""); 
    const [erroBusca, setErroBusca] = useState("");

    const executarBusca = () => {
        setErroBusca("");
        const num = parseInt(buscaIndex, 10);

        if (isNaN(num)) {
            setErroBusca("Digite um número válido.");
            return;
        }

        if(onBuscar){
            onBuscar(num);
        }
}

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            executarBusca();
        }
    };
    return (
        <div className="flex items-center gap-2">
            <input
                type="number"
                min={1}
                max={totalItens}
                placeholder="Nº do item..."
                value={buscaIndex}
                onChange={(e) => setBuscaIndex(e.target.value)}
                onKeyDown={handleKeyDown}
                className={`w-28 border rounded-lg p-1.5 text-xs font-semibold outline-none focus:ring-2 ${erroBusca ? "border-rose-500 focus:ring-rose-500" : "border-gray-200 focus:ring-blue-500"
                    }`}
            />
            <button
                type="button"
                onClick={executarBusca}
                className="bg-blue-600 text-white px-3 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition"
            >
                Ir para Item
            </button>
            {erroBusca && (
                <span className="text-[10px] font-bold text-rose-600 animate-fade-in">
                    {erroBusca}
                </span>
            )}
        </div>
    );
}