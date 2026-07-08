import {
    Clock3,
    X,
} from "lucide-react";
import Card from "../../../components/ui/Card/Card";
import CardHeader from "../../../components/ui/Card/CardHeader";
import PedidoCard from "../../../components/ui/PedidoCard";
import LocalizacaoCard from "../../../components/ui/LocalizacaoCard";
import Header from "../../../components/ui/Header";

export default function DetalhesDoProjeto() {
    return (
        <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-20 pb-28">

            {/* Header */}
            <Header backTo="/painel">
            Detalhes do projeto
            </Header>

            <main className="space-y-6">

                {/* Dados do Pedido */}
                <PedidoCard />

                {/* Cronograma */}

                <Card>

                
                    <div className="space-y-3">

                    <CardHeader
                        icon={<Clock3 className="text-[#003D9B]" size={22} />}
                        title="Cronograma de Atividades"
                    />
                    

                    <p className="font-semibold">
                        Prazo de entrega e produção: 90 dias
                    </p>
                    
                    </div>

                </Card>

                {/* Localização */}

                <LocalizacaoCard />

            </main>

            {/* Footer */}

            <footer className="absolute bottom-0 left-0 flex w-full justify-center border-t bg-white/80 p-4 backdrop-blur">

                <button className="flex items-center gap-2 rounded-full bg-gray-200 px-8 py-3">

                    <X size={18} />

                    <span>Fechar Detalhes</span>

                </button>

            </footer>

        </div>
    );
}