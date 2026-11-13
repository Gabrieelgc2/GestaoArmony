import { PAGE_SIZE } from "@/types/admin.types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    onPageChange: (page: number) => void;
    currentCount: number;
    totalCount: number;
    itemLabel?: string;
}

export const Pagination:
    React.FC<PaginationProps> = ({ currentCount, totalCount, itemLabel, onPageChange, currentPage }) => {
        const total_paginas = Math.ceil(totalCount / PAGE_SIZE)
        const PaginaAnterior = () => {
            if (currentPage > 1) {
                onPageChange(currentPage - 1)
            }
        }

        const ProximaPagina = () => {
            if (currentPage < total_paginas) {
                onPageChange(currentPage + 1)
            }
        }

        return (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
                <span>
                    Exibindo {currentCount} de {totalCount} {itemLabel}
                </span>
                <div className="flex items-center gap-3">
                    <button
                        onClick={PaginaAnterior}
                        className="p-1 rounded-lg text-black hover:text-slate-500 ">
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-slate-700 font-semibold">
                        Página {currentPage} de {total_paginas}
                    </span>
                    <button
                        onClick={ProximaPagina}
                        className="p-1 rounded-lg text-black hover:text-slate-500">
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    };