import { HardHat } from "lucide-react";
import Card from "./Card/Card";
import CardHeader from "./Card/CardHeader";
import InfoAlert from "./InfoAlert";
import Input from "./Input/Input";
import { CalendarDays } from "lucide-react";

interface FaseProps {
  title: string;
  instructionLabel: string;
  instructionDescription: string;
  alertText: string;
  children?: React.ReactNode;
}

export default function Fase({ title, instructionLabel, instructionDescription, alertText, children }: FaseProps) {
  return (
    <Card>
      <main className="space-y-3">
        <CardHeader
          variant="outlined"
          icon={<HardHat />}
          title={title}
        />

        <div className="text-sm font-bold">
          {instructionLabel}
          <span className="text-[#FF5630]">*</span>
        </div>

        <Input
          type="date"
          placeholder="mm/dd/yyyy"
          leftIcon={<CalendarDays size={18} />}
        />

        <div className="text-sm text-black/80 font-semibold">
          {instructionDescription}
        </div>

        <InfoAlert>
          {alertText}
        </InfoAlert>

        {children}

      </main>
    </Card>
  )
}