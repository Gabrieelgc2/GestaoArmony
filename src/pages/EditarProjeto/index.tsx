import Header from "../../components/ui/Header";
import Input from "../../components/ui/Input/Input";
import LocalizacaoCard from "../../components/ui/LocalizacaoCard";
import PedidoCard from "../../components/ui/PedidoCard";
import Card from "../../components/ui/Card/Card";
import CardHeader from "../../components/ui/Card/CardHeader";
import { CalendarDays } from 'lucide-react';
import Button from "../../components/ui/Button/ButtonConfirm";

export default function EditarProjeto() {
    return (
        <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-23 pb-28">
            <main className="space-y-6">

                <Header>
                    Editar projeto
                </Header>

                <PedidoCard />
                <LocalizacaoCard />

                <Card>
                    <div className="space-y-5">
                        <Input
                            label="CEP"
                            placeholder="00000-000"
                        />

                        <Input
                            label="Logradouro"
                            placeholder="Av. Paulista"
                        />

                        <Input
                            label="Cidade"
                            placeholder="São Paulo"
                        />

                        <Input
                            label="Estado"
                            placeholder="SP"
                        />
                    </div>
                </Card>

                <Card>
                    <div className="space-y-3">
                        <CardHeader
                            icon={<CalendarDays className="text-[#003D9B]" size={22} />}
                            title="Cronograma de Atividades"
                        />
                        <div className="text-sm text-black font-bold">
                            Prazo Total (Dias)
                            <span className="text-[#FF5630]">
                                *
                            </span>
                        </div>
                        <Input
                            placeholder="ex: 5 Dias"
                        />
                    </div>
                </Card>

                <Button>
                    Liberar para trabalho
                </Button>
                <button className="
        cursor-pointer
        w-full
        rounded-xl
        bg-[#C3C6D6]
        py-4
        text-[#434654]
        font-semibold
        transition
        hover:bg-[#BFC3D1]
      ">
                    Cancelar e voltar
                </button>
            </main>
        </div>
    )
}