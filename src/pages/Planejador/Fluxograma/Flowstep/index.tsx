import FlowStep from "@/pages/Planejador/Fluxograma/Flowstep/Flowstep";

export default function Flowmain() {
    return (
        <>
            <FlowStep
                title="Instrução de obra"
                subtitle="RESPONSÁVEL: NELMA"
                completed
            />

            <FlowStep
                title="Medição"
                subtitle="RESPONSÁVEL: JOSÉ"
                completed
            />

            <FlowStep
                title="Produção"
                subtitle="CONCLUÍDO"
                completed
                success
            />

            <FlowStep
                title="Entrega"
                subtitle="BLOQUEADO"
            />

            <FlowStep
                title="Pré-instalação"
                subtitle="BLOQUEADO"
            />

            <FlowStep
                title="Instalação"
                subtitle="BLOQUEADO"
            />
            <FlowStep
                title="Entrega de obra"
                subtitle="BLOQUEADO"
                isLast
            />
        </>
    );
}