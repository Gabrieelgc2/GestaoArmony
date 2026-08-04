import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import { Clock3 } from "lucide-react";
import { type FieldErrors, type UseFormRegister } from "react-hook-form";

interface CronogramaCardProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function CronogramaCard({
  register,
  errors
}: CronogramaCardProps) {
  return (
    <Card>
      {/* <div className="space-y-10"> */}
        <CardHeader
          icon={<Clock3 className="text-[#003D9B]" size={22} />}
          title="Cronograma de Atividades"
        />
        <div className="space-y-5">
{/* 
          <div className="flex justify-between">
            <div>
              <h1 className="text-xl text-[#191C1E]">Data da medição</h1>
              <input
                type="text"
                placeholder="Informe o local de instalação"
                {...register("measurement_date")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#003D9B] focus:ring-1 focus:ring-[#003D9B]"
              />
              {errors.measurement_date && (
                <p className="text-xs text-red-500 mt-1">{errors.measurement_date.message as string}</p>
              )}
            </div>
            Colocar essa lógica em um componente separado para medição, e chamar o register por lá, depois apenas chamar a função
           

            <CalendarDays size={24} />
          </div> */}

          <div className="space-y-0">
            <div className="flex justify-between">
              <div>
                <h1 className="text-xl text-[#191C1E]">Prazo de produção</h1>
                <input
                  type="number"
                  min="1"
                  placeholder="Informe o prazo"
                  {...register("production_deadline", { valueAsNumber: true })}
                  className="border rounded px-2 py-1"
                />
                {errors.production_deadline && (
                  <p className="text-xs text-red-500 mt-1">{errors.production_deadline.message as string}</p>
                )}
              </div>
            </div>
          </div>

        </div>
        {/* <hr /> */}
        <div>
          {/* <h1 className="text-xl text-[#191C1E] font-semibold">Data final estimada:</h1>
          <h2 className="text-md font-medium">
          
          </h2> */}
        </div>
    </Card >
  );
}
