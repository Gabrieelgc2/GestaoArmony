import Card from "../../../components/ui/Card/Card";
import CardHeader from "../../../components/ui/Card/CardHeader";
import {Clock3} from "lucide-react";

export default function CronogramaCard() {
  return ( 

        <Card>

          <CardHeader
            icon={<Clock3 className="text-[#003D9B]" size={22} />}
            title="Cronograma de Atividades"
          />

          <p className="font-semibold">
            Prazo de entrega e produção: 90 dias
          </p>

        </Card>
  );
}
