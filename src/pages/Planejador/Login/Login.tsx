import Card from "../../../components/ui/Card/Card";
import Footer from "../../../components/forms/layout/Footer";
import LoginForm from "../../../components/forms/LoginForm";

export default function Login() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
         <div className="text-center">
          {/* <img
            src="/logo.svg"
            alt="Gestão Armony"
            className="mx-auto h-16"
          />  */}

          <h1 className="mt-6 text-3xl font-bold text-slate-900">
            Gestão Armony
          </h1>

          <p className="mt-2 text-slate-500">
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