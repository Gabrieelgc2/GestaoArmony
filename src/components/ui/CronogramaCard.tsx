import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import { Clock3 } from "lucide-react";
import { CalendarDays } from "lucide-react";
import calculateEstimatedDate from "@/utils/calculateEstimatedDate";

interface CronogramaCardProps {
  measurementDate: Date | null;
  productionDeadline?: number | null;
  onProductDeadlineChange?: (value: number) => void;
}

export default function CronogramaCard({
  measurementDate,
  productionDeadline,
  onProductDeadlineChange
}: CronogramaCardProps) {
  const estimatedDate = calculateEstimatedDate(measurementDate, productionDeadline);
  return (
    <Card>
      <div className="space-y-10">
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

          <div className="space-y-0">
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl text-[#191C1E]">Prazo de produção</h1>
              {productionDeadline !== null ? (
                <h2 className="text-md">{productionDeadline} dias</h2>
              ) : (
                <input
                  type="number"
                  min={1}
                  onChange={(e) =>
                    onProductDeadlineChange?.(Number(e.target.value))
                  }
                  placeholder="Informe o prazo"
                  className="border rounded px-2 py-1"
                />
              )}
            </div>
          </div>
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
    </Card >
  );
}
