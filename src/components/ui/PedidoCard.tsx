import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import InfoField from "./InfoField/InfoField";
import {ClipboardList, CalendarDays} from "lucide-react";

export default function PedidoCard() {
return (

        <Card>
          <div className="space-y-3">
          <CardHeader
            icon={<ClipboardList className="text-[#003D9B]" size={22} />}
            title="Dados do Pedido"
          />

          <div className="space-y-8">

            <InfoField
              label="Nome do Cliente"
              value="Alpha Construction Ltd."
            />

            <InfoField
              label="Número do Pedido"
              value="#ORD-2024-0892"
            />

            <div className="space-y-2">

              <p className="text-xs font-semibold uppercase tracking-wide text-[#737685]">
                Peças Compradas
              </p>

              <div className="flex flex-wrap gap-2">

                <span className="rounded-lg border bg-gray-100 px-3 py-1 text-sm font-semibold">
                  15x Painéis Acústicos
                </span>

                <span className="rounded-lg border bg-gray-100 px-3 py-1 text-sm font-semibold">
                  4x Suportes Industriais
                </span>

              </div>

            </div>

            <InfoField
              label="Prazo do Cliente"
              icon={<CalendarDays size={16} className="text-amber-500" />}
              value="1 de janeiro de 2027"
            />

            <div className="space-y-2">

              <p className="text-xs font-semibold uppercase tracking-wide text-[#737685]">
                Status da Aprovação
              </p>

              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1">

                <div className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-xs font-medium text-green-600">
                  Revisão Concluída
                </span>

              </div>

            </div>

          </div>
        </div>
        </Card>
);
}