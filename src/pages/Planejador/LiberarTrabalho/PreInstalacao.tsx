import AtribuirResponsavel from "../../../components/ui/AtribuirResponsavel";
import ButtonCancel from "../../../components/ui/Button/ButtonCancel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import ProjectCard from "../../../components/ui/ProjectCard";

export default function PreInstalacao() {
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
                    title="Fase: Pré-instalação"
                    instructionLabel="Pré-instalação"
                    instructionDescription="Escolha a data prevista para o início da preparação da instalação."
                    alertText="A etapa de pré-instalação garante que o local esteja preparado para receber a equipe de instalação."
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