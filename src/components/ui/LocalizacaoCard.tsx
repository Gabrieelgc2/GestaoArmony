import Card from "../../components/ui/Card/Card";
import CardHeader from "../../components/ui/Card/CardHeader";
import InfoField from "../../components/ui/InfoField/InfoField";
import {MapPin} from "lucide-react";    
export default function LocalizacaoCard() {
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

              <InfoField
                label="Local de Instalação"
                icon={<MapPin size={16} className="text-[#003D9B]" />}
                value="Av. Paulista, 51901-2059"
              />

            </div>

          </div>

        </Card>
                
    );   
}