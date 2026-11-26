import Card from "../ui/Card/Card";
import Footer from "./layout/Footer";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-5">
          <img
            src="../../../pwa-192.png"
            alt="Gestão Armony"
            className="mx-auto h-16"
            />
        <div className="text-center">
          <h1 className="typewriter text-3xl font-bold text-slate-600">
            <span>Gestão Armony</span>
          </h1>
          <p className="mt-2 text-black">
            Obras, medição e instalação
          </p>
        </div>

        {/* Card */}
        <Card>
          <LoginForm />
        </Card>

        {/* Rodapé */}
        <Footer />
      </div>
    </main>
  );
}