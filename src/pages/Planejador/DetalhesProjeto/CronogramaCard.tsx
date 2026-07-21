import Card from "../../../components/ui/Card/Card";
import CardHeader from "../../../components/ui/Card/CardHeader";
import { Clock3 } from "lucide-react";
import { CalendarDays } from "lucide-react";
import calculateEstimatedDate from "@/utils/calculateEstimatedDate";

interface CronogramaCardProps {
  measurementDate: Date | null;
  productionDeadline: number | null;
}

export default function CronogramaCard({
  measurementDate,
  productionDeadline,
}: CronogramaCardProps) {
  const estimatedDate = calculateEstimatedDate(measurementDate, productionDeadline);
  return (
    <Card>
      <div className="space-y-5">
        <CardHeader
          icon={<Clock3 className="text-[#003D9B]" size={22} />}
          title="Cronograma de Atividades"
        />
        <div className="space-y-5">

          <div className="flex justify-between">
            <div>
              <h1 className="text-xl text-[#191C1E]">Data da medição</h1>
              <h2 className="text-md">
                {measurementDate
                  ? measurementDate.toLocaleDateString("pt-BR")
                  : "Não definida"}
              </h2>
            </div>

            <CalendarDays size={24} />
          </div>

          <div className="flex justify-between">
            <div>
              <h1 className="text-xl text-[#191C1E]">Prazo de produção</h1>
              <h2 className="text-md">
                {productionDeadline
                  ? `${productionDeadline} dias`
                  : "Não definido"}
              </h2>
            </div>

            <Clock3 size={24} />
          </div>

        </div>
        <hr />
        <div>
          <h1 className="text-xl text-[#191C1E] font-semibold">Data final estimada:</h1>
          <h2 className="text-md font-medium">
            {estimatedDate
              ? estimatedDate.toLocaleDateString("pt-BR")
              : "Não definido"}
          </h2>
        </div>
      </div>
    </Card>
  );
}
