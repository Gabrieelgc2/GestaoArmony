import AtribuirResponsavel from "../../../components/ui/AtribuirResponsavel";
import ButtonCancel from "../../../components/ui/Button/ButtonCancel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import ProjectCard from "../../../components/ui/ProjectCard";

export default function EntregaObra() {
    return (

        <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-23 pb-28">
            <main className="space-y-6">
                <Header>
                    Agendamento
                </Header>
                <Card>
                    <ProjectCard
                        company="Alpha Construction Ltd."
                        projectId="#ORD-2024-0892"
                        status="Aguardando Agenda"
                    />
                </Card>
                <Fase
                    title="Fase: Entrega de Obra"
                    instructionLabel="Entrega de obra"
                    instructionDescription="Escolha a data prevista para a entrega da obra ao cliente."
                    alertText="Após a confirmação da entrega da obra, esta etapa será registrada e o cronograma será atualizado."
                >
                </Fase>
                <AtribuirResponsavel />
                <ButtonConfirm>
                    Confirmar agendamento
                </ButtonConfirm>
                <ButtonCancel>
                    Cancelar e voltar
                </ButtonCancel>

            </main>
        </div>
    )
}