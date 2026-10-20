export type PresetOption = 'Hoje' | 'Ontem' | '7 dias atrás' | 'Mês passado';

export interface DateRange {
    from: string;
    to: string;
    label: PresetOption;
}

export const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

export const getPresetDateRange = (preset: PresetOption, referenceDate: Date = new Date()): DateRange => {
    const dataReferencia = new Date(referenceDate);

    switch (preset) {
        case 'Hoje': {
            const dateStr = formatDate(dataReferencia);
            return { from: dateStr, to: dateStr, label: 'Hoje' };
        }

        case 'Ontem': {
            const yesterday = new Date(dataReferencia);
            yesterday.setDate(dataReferencia.getDate() - 1);
            const yesterdayStr = formatDate(yesterday);
            return { from: yesterdayStr, to: yesterdayStr, label: 'Ontem' };
        }
        case '7 dias atrás': {
            const pastSeven = new Date(dataReferencia);
            pastSeven.setDate(dataReferencia.getDate() - 6);
            return {
                from: formatDate(pastSeven),
                to: formatDate(dataReferencia),
                label: '7 dias atrás',
            };
        }
        case 'Mês passado': {
            const primeiroDiaMesPassado = new Date(
                dataReferencia.getFullYear(),
                dataReferencia.getMonth() - 1,
                1
            );
            const ultimoDiaMesPassado = new Date(
                dataReferencia.getFullYear(),
                dataReferencia.getMonth(),
                0
            );
            return {
                from: formatDate(primeiroDiaMesPassado),
                to: formatDate(ultimoDiaMesPassado),
                label: 'Mês passado',
            };
        }

        default:
            throw new Error(`Atalho não suportado: ${preset}`)
    }
};