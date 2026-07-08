import Card from "./Card/Card"
import CardHeader from "./Card/CardHeader"
import { IdCard, UserPlus } from "lucide-react"
import SelectInput from "./SelectInput";

interface AtribuirResponsavelProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function AtribuirResponsavel({ value, onChange, error }: AtribuirResponsavelProps) {
    return (
        <Card>
            <main className="space-y-6">
                <CardHeader
                    variant="outlined"
                    icon={<UserPlus />}
                    title="Atribuição de responsável"
                />
                <span className="text-base text-[#191C1E]">
                    Selecionar profissional
                    <span className="text-[#FF5630]">*</span>
                </span>
                <SelectInput
                    icon={IdCard}
                    placeholder="Selecione um profissional..."
                    value={value}
                    onChange={onChange}
                    error={error}
                    options={[
                        { value: "joao", label: "João Silva" },
                        { value: "maria", label: "Maria Oliveira" },
                        { value: "pedro", label: "Pedro Santos" },
                    ]}
                />
            </main>
        </Card>
    )
}