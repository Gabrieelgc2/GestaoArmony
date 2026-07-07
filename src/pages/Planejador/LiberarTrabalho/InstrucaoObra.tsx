import Checkbox from "../../../components/Checkbox/Checkbox";
import AtribuirResponsavel from "../../../components/ui/AtribuirResponsavel";
import ButtonCancel from "../../../components/ui/Button/ButtonCancel";
import ButtonConfirm from "../../../components/ui/Button/ButtonConfirm";
import Card from "../../../components/ui/Card/Card";
import Fase from "../../../components/ui/Fase";
import Header from "../../../components/ui/Header";
import Input from "../../../components/ui/Input/Input";
import ProjectCard from "../../../components/ui/ProjectCard";

export default function InstrucaoObra() {
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
          title="Fase: Instrução de Obra"
          instructionLabel="Instrução de obra"
          instructionDescription="Data obrigatória para visita técnica e orientações iniciais."
          alertText="A realização da Instrução de Obra é mandatória para o avanço do cronograma na plataforma."
        >
          <hr className="my-6 border-gray-600" />

          <p className="text-sm text-black/80 font-semibold">
            Medição campo (opcional)
          </p>

          <Checkbox label="Realizar medição nesta visita?" />

          <Input
            label="Data da medição"
            type="date"
          />
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