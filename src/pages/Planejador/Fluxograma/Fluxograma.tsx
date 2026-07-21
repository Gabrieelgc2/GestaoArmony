import Card from "@/components/ui/Card/Card";
import Header from "@/components/ui/Header";
import ProjectCard from "@/components/ui/ProjectCard";
import Flowmain from "@/pages/Planejador/Fluxograma/Flowstep/index"
import { ChartNoAxesColumn } from "lucide-react";
import CardHeader from "@/components/ui/Card/CardHeader";
export default function Fluxograma() {
  return (
    <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-23 pb-28">
      <main className="space-y-6">
        <Header>
          Em andamento
        </Header>
        <Card>

          <ProjectCard
            company="Alpha Construction Ltd."
            projectId="#ORD-2024-0892"
            status="Aguardando Agenda"
          />
        </Card>
        <Card>
          
          <div className="space-y-8">

            <CardHeader
              icon={<ChartNoAxesColumn className="text-[#003D9B]" size={22} />}
              title="Status do fluxo"
            />


          <Flowmain />
        </div>
      </Card>
    </main>
    </div >
  );
}