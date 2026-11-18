import Card from "../ui/Card/Card";
import Footer from "./layout/Footer";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
         <div className="text-center">
          {/* <img
            src="/logo.svg"
            alt="Gestão Armony"
            className="mx-auto h-16"
          />  */}

          <h1 className="mt-6 text-3xl font-bold text-[rgb(0, 0, 120)]">
            Gestão Armony
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