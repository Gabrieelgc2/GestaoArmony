import { ModalConfirmacao } from "@/pages/Inspetor/Medicao/FormsMedicao/ModalConfirmar";
import { ArrowRight, Trash2 } from "lucide-react";
import { useState } from "react";

interface BuscaItemIndexProps {
    totalItens: number;
    onBuscar?: (numItem: number) => void;
    onRemover?: (numItem: number) => void;
}

export function BuscaItemIndex({ totalItens, onBuscar, onRemover }: BuscaItemIndexProps) {
    const [inputVal, setInputVal] = useState("");
    const [erro, setErro] = useState("");
    const [itemParaRemover, setItemParaRemover] = useState<number | null>(null);

    const validarNumero = (): number | null => {
        setErro("");
        const num = parseInt(inputVal, 10);

        if (isNaN(num) || num < 1 || num > totalItens) {
            setErro(`Número inválido`);
            return null;
        }
        return num;
    };

    const handleSolicitarRemocao = () => {
        const num = validarNumero();
        if(num !== null){
            setItemParaRemover(num);
        }
    }

    const handleConfirmarRemocao = () => {
        if(itemParaRemover !== null && onRemover){
            onRemover(itemParaRemover - 1);
            setInputVal("");
            setItemParaRemover(null);
        }
    };

    const handleBuscar = () => {
        const num = validarNumero();
        if (num !== null && onBuscar) {
            onBuscar(num);
            setInputVal("");   
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBuscar();
    }
  };

    return (
        <>
        <div className="flex flex-col items-end gap-1">
            <div className="flex items-center gap-1.5">
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder={`Nº do item...`}
                    value={inputVal}
                    onChange={(e) => {
                        setInputVal(e.target.value.replace(/\D/g, ""));
                        if (erro) setErro("");
                    }}
                    onKeyDown={handleKeyDown}
                    className={`w-24 border rounded-xl px-2.5 py-1.5 text-xs text-center bg-white outline-none focus:ring-2 ${erro ? "border-rose-500 focus:ring-rose-500" : "border-gray-200 focus:ring-blue-500"
                    }`}
                />

                <button
                    type="button"
                    onClick={handleBuscar}
                    title="Ir para o item"
                    className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer shadow-sm active:scale-95"
                >
                    <span>Ir</span>
                    <ArrowRight size={14} />
                </button>

                {onRemover && (
                    <button
                        type="button"
                        onClick={handleSolicitarRemocao}
                        title="Remover este item pelo número"
                        className="flex items-center justify-center p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs rounded-xl transition cursor-pointer border border-rose-200/60 active:scale-95 shrink-0"
                    >
                        <Trash2 size={14} />
                    </button>
                )}
            </div>
            {erro && <span className="text-[10px] text-rose-600">{erro}</span>}
            </div>
            <ModalConfirmacao
            isOpen={itemParaRemover !== null}
            titulo={`Remover Item #${itemParaRemover}?`}
            mensagem={`Tem certeza que deseja remover o item #${itemParaRemover} do relatório? Esta ação não poderá ser desfeita e a lista será reordenada.`}
            textoConfirmar="Sim, remover item"
            textoCancelar="Cancelar"
            aoConfirmar={handleConfirmarRemocao}
            aoCancelar={() => setItemParaRemover(null)}
            />
        </>
    );
}