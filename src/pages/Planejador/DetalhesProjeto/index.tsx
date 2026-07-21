import {
    X,
} from "lucide-react";
import PedidoCard from "../../../components/ui/PedidoCard";
import LocalizacaoCard from "../../../components/ui/LocalizacaoCard";
import Header from "../../../components/ui/Header";
import CronogramaCard from "./CronogramaCard";

export default function DetalhesDoProjeto() {
    return (
        <div className="relative min-h-screen bg-[#F8F9FB] px-10 pt-20 pb-28">

            {/* Header */}
            <Header backTo="/painel">
                Detalhes do projeto
            </Header>

            <main className="space-y-6">

                <PedidoCard />

                <CronogramaCard />

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