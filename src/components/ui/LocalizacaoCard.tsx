import Card from "../../components/ui/Card/Card";
import CardHeader from "../../components/ui/Card/CardHeader";
import InfoField from "../../components/ui/InfoField/InfoField";
import { MapPin } from "lucide-react";

interface LocalizacaoProps {
  localizacao?: string | null;
  onLocationChange?: (value: string) => void;
}

export default function LocalizacaoCard({
  localizacao,
  onLocationChange,
}: LocalizacaoProps) {
  return (
    <Card>
      <div className="space-y-3">
        <CardHeader
          icon={<MapPin className="text-[#003D9B]" size={22} />}
          title="Localização"
        />

        <InfoField
          label="Endereço de Correspondência"
          value="Av. Paulista, 1200 - 4º Andar Bela Vista, São Paulo - SP CEP: 01310-100"
        />

        <div className="border-t pt-6">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
              Local de Instalação
            </label>

            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#003D9B] shrink-0" />
              <input
                type="text"
                placeholder="Informe o local de instalação"
                value={localizacao || ""}
                onChange={(e) => onLocationChange?.(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-[#003D9B] focus:ring-1 focus:ring-[#003D9B]"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}