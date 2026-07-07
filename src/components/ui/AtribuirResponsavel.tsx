import Card from "./Card/Card"
import CardHeader from "./Card/CardHeader"
import { IdCard, UserPlus } from "lucide-react"
import { useState } from "react";
import SelectInput from "./SelectInput";


export default function AtribuirResponsavel() {
    const [professional, setProfessional] = useState("");
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
                </span>
                <SelectInput
                    icon={IdCard}
                    placeholder="Selecione um profissional..."
                    value={professional}
                    onChange={setProfessional}
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